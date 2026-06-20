/** @type {import('next').NextConfig} */
const nextConfig = {
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
