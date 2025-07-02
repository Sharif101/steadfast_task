/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "157.230.240.97",
        port: "8888", // ✅ Port must be specified if not 80/443
        pathname: "/storage/media/**", // ✅ Match image path
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
