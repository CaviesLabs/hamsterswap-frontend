import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { useSolana as useSaberhq } from "@saberhq/use-solana";
import { useWallet as useSolana } from "@solana/wallet-adapter-react";
import type { MessageSignerWalletAdapter } from "@solana/wallet-adapter-base";
import { getSwapProgramProvider } from "@/src/providers/swap-program";
import { getWalletName } from "./utils";

/** @dev Define state for context. */
export interface WalletContextState {
  /** @dev The function to sign message in Solana network. */
  signMessage(message: string): Promise<Uint8Array>;
}

/** @dev Initiize context. */
export const WalletContext = createContext<WalletContextState>(null);

/** @dev Expose wallet provider for usage. */
export const WalletProvider: FC<{ children: ReactNode }> = (props) => {
  /** @dev Get @var {walletProviderInfo} from @var {GokkiKit}. */
  const { walletProviderInfo } = useSaberhq();

  /** @dev Import providers to use from solana. */
  const solanaWallet = useSolana();

  /** @dev The function to sign message in Solana network. */
  const signMessage = useCallback(
    async (message: string) => {
      await solanaWallet.wallet.adapter.connect();
      const data = new TextEncoder().encode(message);
      return await (
        solanaWallet.wallet.adapter as MessageSignerWalletAdapter
      ).signMessage(data);
    },
    [walletProviderInfo, solanaWallet.wallet]
  );

  /** @dev Watch changes in wallet adpater and update. */
  useEffect(() => {
    if (!walletProviderInfo) return;
    solanaWallet.select(getWalletName(walletProviderInfo.name));
  }, [walletProviderInfo]);

  /** @dev Initilize when wallet changed. */
  useEffect(() => {
    if (solanaWallet?.publicKey?.toString()) {
      getSwapProgramProvider(solanaWallet, { reInit: true });
    }
  }, [solanaWallet]);

  return (
    <WalletContext.Provider value={{ signMessage }}>
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
