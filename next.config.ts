import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // Dev only: the project sits on an external drive whose macOS "._" junk files corrupt the image cache and break images.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
