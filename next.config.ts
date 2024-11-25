import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    ENV: process.env.NODE_ENV,
  },
  experimental: {
    turbo: {},
  },
};

export default nextConfig;
