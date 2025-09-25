import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'astrova-backend-t1zo.onrender.com',
      },
    ],
  },
};

export default nextConfig;