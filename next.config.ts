import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@splinetool/runtime"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
