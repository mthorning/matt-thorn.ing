import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const POSTS_DIR = join(process.cwd(), 'src', 'app', 'posts', '_posts');

type Post = {
  content: string;
  data: {
    title: string;
    date: string;
    slug: string;
    tags: string[];
    published: boolean;
  };
};

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(POSTS_DIR, `${realSlug}/index.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, ...rest } = matter(fileContents) as unknown as Post;
  return {
    data: {
      ...data,
      slug
    },
    ...rest
  }
}

export function getAllPosts(): Post[] {
  const slugs = fs.readdirSync(POSTS_DIR);

  return slugs
    .map(getPostBySlug)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));
}
