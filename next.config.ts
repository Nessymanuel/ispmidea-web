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
        protocol: 'https',
        hostname: '**.loca.lt',
      },
    ],
  },
};

export default nextConfig;
