import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { FC } from "react";
import { Provider } from "react-redux";
import Script from "next/script";
import makeStore from "@/src/redux";
import "@hamsterbox/ui-kit/dist/cjs/styles/css/main.css";
import { ThemeProvider } from "@hamsterbox/ui-kit";

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
        <AppComponent {...{ Component, pageProps }} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
