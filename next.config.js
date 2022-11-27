require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const withTM = require("next-transpile-modules")(["@hamsterbox/ui-kit"]);

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
module.exports = withTM(
  withPWA({
    source: "/",
    reactStrictMode: true,
    experimental: { esmExternals: true },
    env: {
      HOST_URL: process.env.HOST_URL,
      API_URL: process.env.API_URL,
      ENV: NODE_ENV,
      API_KEY: process.env.API_KEY,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      PROJECT_ID: process.env.PROJECT_ID,
      STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      APP_ID: process.env.APP_ID,
      MEASUREMENT_ID: process.env.MEASUREMENT_ID,
      HOST_NAME: process.env.HOST_NAME,
    },
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: `${process.env.API_URL}/api/:path*`,
        },
      ];
    },
  })
);
