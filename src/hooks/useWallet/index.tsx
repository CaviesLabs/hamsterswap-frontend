import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
  FC,
} from "react";
import { useSolana as useSaberhq } from "@saberhq/use-solana";
import {
  useWallet as useSolana,
  useConnection,
  WalletContextState as SolanaWalletContextState,
  ConnectionContextState,
} from "@solana/wallet-adapter-react";
import web3 from "@solana/web3.js";
import { useConnectedWallet } from "@saberhq/use-solana";
import type { MessageSignerWalletAdapter } from "@solana/wallet-adapter-base";
import { getSwapProgramProvider } from "@/src/providers/swap-program";
import { SwapProgramService } from "@/src/services/swap-program.service";
import { getAuthService } from "@/src/actions/firebase.action";
import { getWalletName } from "./utils";
import { setProfile } from "@/src/redux/actions/hamster-profile/profile.action";
import { useDispatch } from "react-redux";

/** @dev Define state for context. */
export interface WalletContextState {
  /**
   * @dev The function to sign message in Solana network.
   * */
  signMessage(message: string): Promise<Uint8Array>;

  /**
   * @dev The function to disconnect wallet & logout to Hamster server and Firebase.
   */
  disconnect(): Promise<void>;

  getSolBalance(pub: web3.PublicKey): Promise<number>;

  /**
   * @dev Expose context frrom solana-adapter.
   */
  solanaWallet: SolanaWalletContextState;
  walletConnection: ConnectionContextState;

  /**
   * @dev Define Program service.
   */
  programService: SwapProgramService;
}

/** @dev Initiize context. */
export const WalletContext = createContext<WalletContextState>(null);

/** @dev Expose wallet provider for usage. */
export const WalletProvider: FC<{ children: ReactNode }> = (props) => {
  /** @dev Get @var {walletProviderInfo} from @var {GokkiKit}. */
  const { walletProviderInfo } = useSaberhq();

  /** @dev Import providers to use from solana. */
  const solanaWallet = useSolana();
  const walletConnection = useConnection();
  const dispatch = useDispatch();

  /** @dev Import wallet from Gokki library. */
  const wallet = useConnectedWallet();

  /** @dev Program service */
  const [programService, initProgram] = useState<SwapProgramService>(null);

  /** @dev Import auth service. */
  const authService = getAuthService();

  /**
   * @dev The function to sign message in Solana network.
   * */
  const signMessage = useCallback(
    async (message: string) => {
      /**
       * @dev Force to connect first.
       */
      await solanaWallet?.wallet?.adapter?.connect();

      /**
       * @dev Encode message to @var {Uint8Array}.
       */
      const data = new TextEncoder().encode(message);

      /**
       * @dev Call function to sign message from solana adapter.
       */
      return await (
        solanaWallet.wallet.adapter as MessageSignerWalletAdapter
      ).signMessage(data);
    },
    [walletProviderInfo, solanaWallet.wallet]
  );

  /**
   * @dev Encode message to @var {Uint8Array}.
   *      Step 1. Disconnect wallet.
   *      Step 2. Logout user.
   */
  const disconnect = useCallback(async () => {
    if (!wallet) return;
    await wallet.disconnect();
    await solanaWallet.disconnect();
    await authService.logout();
    dispatch(setProfile(null));
  }, [solanaWallet, wallet]);

  /**
   * @dev Get sol balance of a wallet.
   * @param address
   * @returns
   */
  const getSolBalance = async (address: web3.PublicKey) => {
    return await walletConnection.connection.getBalance(address);
  };

  /**
   * @dev Watch changes in wallet adpater and update.
   * */
  useEffect(() => {
    if (!walletProviderInfo) return;
    solanaWallet.select(getWalletName(walletProviderInfo.name));
  }, [walletProviderInfo, wallet, solanaWallet]);

  useEffect(() => {
    if (!wallet) return;
    /**
     * @dev Force to connect first.
     */
    solanaWallet?.wallet?.adapter?.connect();
  }, [wallet, solanaWallet]);

  /**
   * @dev Initilize when wallet changed.
   * */
  useEffect(() => {
    if (wallet?.publicKey?.toString()) {
      try {
        /**
         * @dev Initlize program provider.
         */
        const swapProgramProvider = getSwapProgramProvider(solanaWallet, {
          reInit: true,
        });

        console.log("Initlize program service");

        /**
         * @dev Initlize swap program service with initlized programProvider.
         */
        const program = new SwapProgramService(swapProgramProvider);
        initProgram(program);
      } catch (err: any) {
        console.log(err.message);
      }
    }
  }, [wallet, solanaWallet]);

  return (
    <WalletContext.Provider
      value={{
        signMessage,
        disconnect,
        getSolBalance,
        solanaWallet,
        walletConnection,
        programService,
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
