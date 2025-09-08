import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://astrova-backend-t1zo.onrender.com')],
  },
};

export default nextConfig;
