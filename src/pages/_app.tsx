import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { FC } from "react";
import { Provider } from "react-redux";
import Script from "next/script";
import makeStore from "@/src/redux";
import "@hamsterbox/ui-kit/dist/cjs/styles/css/main.css";
import { ThemeProvider } from "@hamsterbox/ui-kit";
import { WalletKitProvider } from "@gokiprotocol/walletkit";
import { MainProvider } from "@/src/hooks/pages/main";

const store = makeStore();

const AppComponent: FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  return <Component {...pageProps} />;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainProvider>
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
          {/**
           * @dev
           * Wrap the whole app in Goki Kit provider for use.
           */}
          <WalletKitProvider
            defaultNetwork={
              (process.env.ENV as string) === "prod" ? "mainnet-beta" : "devnet"
            }
            app={{
              name: "Hamsterswap",
              icon: <img src="/assets/icons/apple-icon.png" alt="icon" />,
            }}
            debugMode={true} // you may want to set this in REACT_APP_DEBUG_MODE
          >
            <AppComponent {...{ Component, pageProps }} />
          </WalletKitProvider>
        </ThemeProvider>
      </MainProvider>
    </Provider>
  );
}

export default MyApp;
