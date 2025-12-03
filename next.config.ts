import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      // TODO: in prod add real hostname of cms
      hostname: 'localhost'
    }]
  }
};

export default nextConfig;
