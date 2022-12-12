import { FC } from "react";
import { NextSeo } from "next-seo";

export const SeoComponent: FC = () => {
  const siteName = "p2p.hamsterbox.xyz";
  const url = `https://${siteName}/`;
  const title =
    "Hamsterswap | Trustless P2P Swaps for Digital Collectibles and Assets";
  const description =
    "Hamsterswap provides a trustless peer-to-peer platform for trading digital collectibles and assets, supports both on-chain and off-chain";
  const banner = `${url}main-banner.png`;

  return (
    <>
      {/* Primary meta tags*/}
      <NextSeo
        title={title}
        description={description}
        canonical={`${url}`}
        openGraph={{
          type: "website",
          url,
          title,
          description,
          locale: "en_US",
          images: [
            {
              url: banner,
              width: 1024,
              height: 512,
              alt: `hero image for ${title}`,
            },
          ],
          site_name: siteName,
        }}
        twitter={{
          site: siteName,
          cardType: "summary_large_image",
        }}
      />
      <meta
        httpEquiv="Cache-Control"
        content="no-cache, no-store, must-revalidate"
      />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />
      <meta name="language" content="EN" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="keywords"
        content="cavies,hamsterbox,hamsterswap,p2p,web3,gaming,game,gamer,gamefi,crypto,nft,metaverse,unorthodox,infrastructure,multichain,btc,eth,solana,polygon,unorthodox,infrastructure,blockchain"
      />

      {/* TODO: remove this metatag once we go live */}
      {/* <meta name="robots" content="noindex" /> */}

      {/*  Icon stuffs */}
      <link
        rel="icon"
        type="image/png"
        sizes="196x196"
        href="/assets/icons/favicon-196.png"
      />
      <link rel="apple-touch-icon" href="/assets/icons/apple-icon-180.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2048-2732.png"
        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2732-2048.png"
        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1668-2388.png"
        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2388-1668.png"
        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1536-2048.png"
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2048-1536.png"
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1668-2224.png"
        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2224-1668.png"
        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1620-2160.png"
        media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2160-1620.png"
        media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1290-2796.png"
        media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2796-1290.png"
        media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1179-2556.png"
        media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2556-1179.png"
        media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1284-2778.png"
        media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2778-1284.png"
        media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1170-2532.png"
        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2532-1170.png"
        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1125-2436.png"
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2436-1125.png"
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1242-2688.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2688-1242.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-828-1792.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1792-828.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1242-2208.png"
        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-2208-1242.png"
        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-750-1334.png"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1334-750.png"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-640-1136.png"
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/icons/apple-splash-1136-640.png"
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />

      <meta
        name="msapplication-square70x70logo"
        content="assets/icons/mstile-icon-128.png"
      />
      <meta
        name="msapplication-square150x150logo"
        content="assets/icons/mstile-icon-270.png"
      />
      <meta
        name="msapplication-square310x310logo"
        content="assets/icons/mstile-icon-558.png"
      />
      <meta
        name="msapplication-wide310x150logo"
        content="assets/icons/mstile-icon-558-270.png"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/assets/icons/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/icons/favicon-16x16.png"
      />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
      ></link>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="https://cavies.xyz/assets/icons/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff" />

      {/*  Google Analytics */}
      <script
        async={true}
        src="https://www.googletagmanager.com/gtag/js?id=G-RL35P8RT0R"
      />
      <script src="https://cavies.xyz/assets/js/ga.js" />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-T379FWM"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
    </>
  );
};
