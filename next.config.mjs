/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Dev only: lets phones and tablets on the same Wi-Fi load styles and scripts from http://<your-LAN-IP>:3000.
  // Without this Next 16 returns 403 for /_next assets from non-localhost hosts, so the page renders unstyled.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // Dev only: the project sits on an external drive whose macOS "._" junk files corrupt the image cache and break images.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
