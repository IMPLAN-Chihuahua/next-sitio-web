import type { NextConfig } from "next";
import legacyUrlMap from "./src/app/legacy-url-map.json";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [65, 75],
    minimumCacheTTL: 86400,
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'editorial.implanchihuahua.org',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'editorial.implanchihuahua.org',
        pathname: '/uploads/**'
      }
    ]
  },
  async redirects() {
    return [{
      source: '/planeacion-vertical/:path*',
      destination: '/planeacion/:path*',
      permanent: true,
    }, ...legacyUrlMap.redirects.map((redirect) => ({
      source: redirect.oldPath,
      destination: redirect.newPath,
      permanent: redirect.statusCode === 301,
    }))];
  }
};

export default nextConfig;
