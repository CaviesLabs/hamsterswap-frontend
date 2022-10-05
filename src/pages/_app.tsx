import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { FC } from "react";
import { Provider } from "react-redux";
import makeStore from "@/src/redux";

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
      <AppComponent {...{ Component, pageProps }} />;
    </Provider>
  );
}

export default MyApp;
