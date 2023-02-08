import "../../styles/globals.css";
import "@hamsterbox/ui-kit/dist/cjs/styles/css/main.css";
import Script from "next/script";
import makeStore from "@/src/redux";
import type { AppProps } from "next/app";
import { FC, useMemo } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@hamsterbox/ui-kit";
import { WalletKitProvider } from "@gokiprotocol/walletkit";
import { WalletProvider } from "@/src/hooks/useWallet";
import { MainProvider } from "@/src/hooks/pages/main";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletAdapterProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  BraveWalletAdapter,
  Coin98WalletAdapter,
  LedgerWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { SeoComponent } from "@/src/components/seo";
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from "@ant-design/cssinjs";

/**
 * @dev Import needed third-party styled.
 */
import "flowbite";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const store = makeStore();

const AppComponent: FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  return <Component {...pageProps} />;
};

function MyApp({ Component, pageProps }: AppProps) {
  /** @dev Process to select blockchain network. */
  const network = process.env.SOLANA_CLUSTER as WalletAdapterNetwork;

  /** @dev Initilize needed wallet adapters. */
  const walletAdapters = useMemo(() => {
    return [
      new PhantomWalletAdapter(),
      new BraveWalletAdapter(),
      new Coin98WalletAdapter(),
      new LedgerWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter(),
    ];
  }, [network]);

  return (
    <Provider store={store}>
      <StyleProvider
        ssrInline={true}
        transformers={[legacyLogicalPropertiesTransformer]}
      >
        <SeoComponent />
        <ThemeProvider>
          {/**
           * @dev
           * NextJs recommend do only add stylesheets in SEO component
           */}
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossOrigin="anonymous"
          />
          <ConnectionProvider
            endpoint={
              network === WalletAdapterNetwork.Mainnet
                ? "https://boldest-few-field.solana-mainnet.quiknode.pro/0ffa9f9f5e9141aa33a030081b78fdfe40bfbae6/"
                : clusterApiUrl(network)
            }
          >
            <SolanaWalletAdapterProvider wallets={walletAdapters}>
              {/**
               * @dev
               * Wrap the whole app in Goki Kit provider for use.
               */}
              <WalletKitProvider
                defaultNetwork={network}
                app={{
                  name: "Hamsterswap",
                  icon: (
                    <img
                      className="bg-dark60 rounded-full"
                      src="/assets/icons/favicon-196.png"
                    />
                  ),
                }}
                debugMode={false} // you may want to set this in REACT_APP_DEBUG_MODE
              >
                <WalletProvider>
                  <MainProvider>
                    <AppComponent {...{ Component, pageProps }} />
                  </MainProvider>
                </WalletProvider>
              </WalletKitProvider>
            </SolanaWalletAdapterProvider>
          </ConnectionProvider>
        </ThemeProvider>
      </StyleProvider>
    </Provider>
  );
}

export default MyApp;
