import { Html, Head, Main, NextScript } from "next/document";
import { SeoComponent } from "@/src/components/seo";

export default function Document() {
  return (
    <Html>
      <Head>
        <SeoComponent />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
