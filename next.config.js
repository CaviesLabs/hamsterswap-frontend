require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const withTM = require("next-transpile-modules")(["@hamsterbox/ui-kit"]);
const withPlugins = require("next-compose-plugins");

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
module.exports = withPlugins([withPWA, withTM], {
  source: "/",
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
    transpilePackages: ["antd"],
  },
  env: {
    ENV: NODE_ENV,
    HOST_URL: process.env.HOST_URL,
    API_URL: process.env.API_URL,
    HOST_NAME: process.env.HOST_NAME,
    SWAP_PROGRAM_ADDRESS: process.env.SWAP_PROGRAM_ADDRESS,
    SOLANA_CLUSTER: process.env.SOLANA_CLUSTER,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/api/:path*`,
      },
    ];
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {},
  devIndicators: {
    buildActivity: false,
  },
});
