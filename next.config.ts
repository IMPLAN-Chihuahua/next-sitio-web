import type { NextConfig } from "next";
import legacyUrlMap from "./src/app/legacy-url-map.json";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
    minimumCacheTTL: 86400,
    dangerouslyAllowLocalIP: true,
    maximumRedirects: 0,
    remotePatterns: [
      {
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'editorial.implanchihuahua.org',
        port: '',
        pathname: '/api/uploads/**',
        search: ''
      },
      {
        protocol: 'https',
        hostname: 'editorial.implanchihuahua.org',
        port: '',
        pathname: '/uploads/**',
        search: ''
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
