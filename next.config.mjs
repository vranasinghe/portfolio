/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep production builds from overwriting a running dev server's chunks.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  // Transpile ESM-only packages that Next.js needs to process
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
