import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: `${basePath}/`,
  images: {
    unoptimized: true,
    domains: ["cdn.dummyjson.com", "image.google.com"],
  },
  trailingSlash: true,
};

export default nextConfig;
