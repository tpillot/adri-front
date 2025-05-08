import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '51.91.249.254'],
  },
};

export default nextConfig;

