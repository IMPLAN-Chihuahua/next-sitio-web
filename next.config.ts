import type { NextConfig } from "next";
import legacyUrlMap from "./src/app/legacy-url-map.json";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      // TODO: in prod add real hostname of cms
      hostname: 'localhost'
    }]
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
