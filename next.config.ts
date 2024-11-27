import type { NextConfig } from 'next';
import withMDX from '@next/mdx'
import prism from 'remark-prism'

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

export default withMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})(nextConfig)
