require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ];
  },
};

module.exports = nextConfig;
