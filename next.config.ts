import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/milestone-3-yous1705",
  assetPrefix: "/milestone-3-yous1705/",
  images: {
    unoptimized: true,
    domains: ["cdn.dummyjson.com", "image.google.com"],
  },
};

export default nextConfig;
