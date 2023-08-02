import {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
  useMemo,
} from "react";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { klaytn } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

/** @dev Initiize context. */
export const WalletKitContext = createContext<any>(null);

/** @dev Expose wallet provider for usage. */
export const EvmWalletKitProvider: FC<{ children: ReactNode }> = (props) => {
  const [wagmiChains, setWagmiChains] = useState<any[]>([]);

  /**
   * @dev Create config for wallet kit.
   * @dev Update config here.
   * @returns {void}
   */
  const clientConfig = useMemo(() => {
    /**
     * @dev Configure chains.
     * @notice Get chains from wagmi.
     * @notice Get providers from wagmi.
     */
    const { chains, publicClient } = configureChains(
      [klaytn],
      [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
    );

    /**
     * @dev Get default wallets.
     * @notice Get default wallets from wagmi.
     * @notice Update config here.
     */
    const { connectors } = getDefaultWallets({
      appName: "CabbageSwap",
      projectId: process.env.WALLET_CONNECT_PROJECT_ID,
      chains,
    });

    /** @dev Update config here */
    setWagmiChains(chains);
    return createConfig({
      autoConnect: true,
      connectors,
      publicClient,
    });
  }, []);

  return (
    <WalletKitContext.Provider value={{}}>
      <WagmiConfig config={clientConfig}>
        <RainbowKitProvider
          chains={wagmiChains}
          coolMode={true}
          theme={lightTheme({
            accentColor: "#735CF7",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {props.children}
        </RainbowKitProvider>
      </WagmiConfig>
    </WalletKitContext.Provider>
  );
};

/** @dev Use context hook. */
export const useEvmWalletKit = () => {
  const context = useContext(WalletKitContext);
  if (!context) {
    throw new Error("Must be in provider");
  }
  return context;
};
