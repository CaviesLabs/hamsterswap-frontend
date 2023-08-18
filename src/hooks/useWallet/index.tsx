import {
  useContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
  FC,
} from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import web3, { Connection } from "@solana/web3.js";
import {
  useSolana as useSaberhq,
  useConnectedWallet,
} from "@saberhq/use-solana";
import { useWallet as useAdapter } from "@solana/wallet-adapter-react";
import type { MessageSignerWalletAdapter } from "@solana/wallet-adapter-base";
import { SwapProgramProviderV0 } from "@/src/providers/program/swap-program-v0.provider";
import { getAuthService } from "@/src/actions/firebase.action";
import { setProfile } from "@/src/redux/actions/hamster-profile/profile.action";
import { SwapProgramServiceV0 } from "@/src/services/swap-program-v0.service";
import { WalletContext } from "./types";

/** @dev Expose wallet provider for usage. */
export const WalletProvider: FC<{ children: ReactNode }> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { walletProviderInfo, provider, providerMut } = useSaberhq();
  const solanaWallet = useConnectedWallet();
  const solanaAdapter = useAdapter();

  /** @dev Program service */
  const [programService, initProgram] = useState<SwapProgramServiceV0>(null);
  const [solBalance, setSolBalance] = useState(0);

  /** @dev Import auth service. */
  const authService = getAuthService();

  /**
   * @dev The function to sign message in Solana network.
   * @notice Step 1. Encode message to @var {Uint8Array}.
   * @notice Step 2. Sign message with @var {MessageSignerWalletAdapter}.
   * @returns {Uint8Array} signature.
   * */
  const signMessage = useCallback(
    async (message: string) => {
      console.log("Sign message solana", message);
      const data = new TextEncoder().encode(message);
      return await (
        solanaAdapter?.wallet?.adapter as MessageSignerWalletAdapter
      ).signMessage(data);
    },
    [walletProviderInfo, solanaAdapter, provider]
  );

  /**
   * @dev The function to disconnect walle & logout to Hamster server and Firebase.
   * @notice Step 1. Disconnect wallet.
   * @notice Step 2. Logout to Firebase.
   * @notice Step 3. Set profile to null.
   */
  const disconnect = useCallback(async () => {
    await solanaWallet?.disconnect();
    await authService?.logout();
    dispatch(setProfile(null));
  }, [solanaWallet]);

  /**
   * @dev Get sol balance of a wallet.
   * @param {PublicKey} address
   * @notice Step 1. Get balance from solana network.
   * @notice Step 2. Set balance to state.
   * @notice Step 3. Return balance.
   * @notice Step 4. If error, return 0.
   * @returns
   */
  const getSolBalance = useCallback(
    async (address?: web3.PublicKey) => {
      if (!address && !solanaWallet?.publicKey) return;
      const balance = await new Connection(
        process.env.SOLANA_RPC_URL,
        "confirmed"
      )
        .getBalance(address || solanaWallet?.publicKey)
        .catch(() => 0);

      setSolBalance(balance || 0);
      return balance;
    },
    [solanaWallet]
  );

  /**
   * @dev Initilize when solana wallet is connected.
   * @notice Step 1. Init program service.
   * @notice Step 2. Get sol balance.
   * @notice Step 3. Get wallet name.
   * */
  useEffect(() => {
    if (solanaWallet?.publicKey?.toString()) {
      try {
        const program = new SwapProgramServiceV0(
          new SwapProgramProviderV0(providerMut)
        );

        initProgram(program);
        getSolBalance();
      } catch (err: any) {
        console.log(err.message);
      }
    }
  }, [solanaWallet, router.asPath, providerMut]);

  return (
    <WalletContext.Provider
      value={{
        signMessage,
        disconnect,
        getSolBalance,
        solanaWallet,
        programService,
        solBalance,
        provider: providerMut,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

/** @dev Use context hook. */
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("Must be in provider");
  }
  return context;
};
