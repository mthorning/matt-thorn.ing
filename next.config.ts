import type { NextConfig } from 'next';
import withMDX from '@next/mdx';
import remarkPrism from 'remark-prism';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withMDX({
  options: {
    jsx: true,
    remarkPlugins: [
      () =>
        remarkPrism({
          plugins: ['command-line', 'diff-highlight', 'line-numbers'],
        }),
      remarkFrontmatter,
      remarkMdxFrontmatter
    ],
    rehypePlugins: [rehypeMdxImportMedia],
  },
})(nextConfig);
