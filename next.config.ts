import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "72.62.170.13",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "portal.tiksly.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
