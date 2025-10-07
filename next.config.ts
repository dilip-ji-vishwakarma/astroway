import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "testing.nextgendiluents.com",
        pathname: "/backend-images/**",
      },
    ],
  },
};

export default nextConfig;