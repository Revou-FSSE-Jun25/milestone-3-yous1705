import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.dummyjson.com", "image.google.com"],
    remotePatterns: [],
  },
};

export default nextConfig;
