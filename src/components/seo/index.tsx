import { FC } from "react";

export const SeoComponent: FC = () => {
  const url = "https://p2p.hamsterbox.xyz/";
  const title =
    "Hamsterswap | Trustless P2P Swaps for Digital Collectibles and Assets";
  const description =
    "Hamsterswap provides a trustless peer-to-peer platform for trading digital collectibles and assets, supports both on-chain and off-chain";
  const banner = "/main-banner.png";

  return (
    <>
      {/* Primary meta tags*/}
      <title>{title}</title>
      <meta property="og:title" content={title} key="title" />
      <meta name="description" content={description} />
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

      {/**  */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={banner} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:image:height" content="1024" />
      <meta property="og:image:width" content="512" />
      {/* <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" /> */}

      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />

      <meta name="twitter:card" content="summary" />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:image" content={banner} />
      <meta name="twitter:image:alt" content={title} />

      {/* TODO: remove this metatag once we go live */}
      {/* <meta name="robots" content="noindex" /> */}

      {/*  Icon stuffs */}
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="https://cavies.xyz/assets/icons/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="https://cavies.xyz/assets/icons/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="https://cavies.xyz/assets/icons/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="https://cavies.xyz/assets/icons/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="https://cavies.xyz/assets/icons/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="https://cavies.xyz/assets/icons/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="https://cavies.xyz/assets/icons/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="https://cavies.xyz/assets/icons/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://cavies.xyz/assets/icons/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="https://cavies.xyz/assets/icons/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://cavies.xyz/assets/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="https://cavies.xyz/assets/icons/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://cavies.xyz/assets/icons/favicon-16x16.png"
      />
      <link
        rel="icon"
        href="https://cavies.xyz/favicon.ico"
        type="image/x-icon"
      />
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
