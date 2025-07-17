import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5252',
      },

      {
        protocol: 'http',
        hostname: '172.20.10.3',
        port: '5252',
      },
      {
        protocol: 'https',
        hostname: '**.loca.lt',
      },
    ],
  },
};

export default nextConfig;
