import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
    experimental: {

    },
    devIndicators: {
      position: "bottom-right",
    },
};

export default nextConfig;
