require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const withTM = require("next-transpile-modules")(["@hamsterbox/ui-kit"]);

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
    },
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: `${process.env.API_URL}/api/:path*`,
        },
        // {
        //   source: "/",
        //   destination: "/dashboard",
        // },
      ];
    },
  })
);
