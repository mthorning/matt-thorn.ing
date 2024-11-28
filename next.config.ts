import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
    mdxRs: true,
  },
};

export default nextConfig;
