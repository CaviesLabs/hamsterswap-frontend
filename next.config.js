require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const million = require("million/compiler");

/** @dev Define NODE_ENV to next config. */
const NODE_ENV = process.env.NODE_ENV;

/** @dev Config PWA for next app. */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "dev",
});

/** @type {import('next').NextConfig} */
const config = withPWA({
  source: "/",
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
    transpilePackages: [
      "antd",
      "@hamsterbox/ui-kit",
      "@solana/wallet-adapter-base",
    ],
  },
  env: {
    ENV: NODE_ENV,
    HOST_URL: process.env.HOST_URL,
    API_URL: process.env.API_URL,
    HOST_NAME: process.env.HOST_NAME,
    SWAP_PROGRAM_ADDRESS: process.env.SWAP_PROGRAM_ADDRESS,
    SOLANA_CLUSTER: process.env.SOLANA_CLUSTER,
    SOLANA_RPC_URL: process.env.SOLANA_RPC_URL,
    ALCHEMY_ID: process.env.ALCHEMY_ID,
    WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
  },
  serverRuntimeConfig: {
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET,
  },
  publicRuntimeConfig: {},
  devIndicators: {
    buildActivity: false,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/api/:path*`,
      },
    ];
  },
});

module.exports = million.next(config);
