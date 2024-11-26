import type { NextConfig } from 'next';
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig)
