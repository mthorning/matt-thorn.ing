import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const POSTS_DIR = join(process.cwd(), 'src', 'app', 'posts', '(posts)');

type Data = {
  title: string;
  date: string;
  slug: string;
  tags: string[];
  published: boolean;
};

type Post = {
  content: string;
  data: Data;
};

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(POSTS_DIR, `${realSlug}/page.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, ...rest } = matter(fileContents) as unknown as Post;
  return {
    data: {
      ...data,
      slug,
    },
    ...rest,
  };
}

export function getAllPosts(): Post[] {
  const slugs = fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return slugs
    .map(getPostBySlug)
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));
}

export type PostsMeta = Record<string, Omit<Data, 'slug'>>;
export function getPostsMetadata(): PostsMeta {
  return Object.fromEntries(
    getAllPosts().map(({ data: { slug, ...data } }) => [slug, data])
  );
}
