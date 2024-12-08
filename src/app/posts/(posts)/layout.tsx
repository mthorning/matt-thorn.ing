import Link from 'next/link';
import { getPostsMetadata } from '../utils';
import BlogPost from './BlogPost';

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metadata = getPostsMetadata();
  return (
    <>
      <Link href="/posts">Back to posts</Link>
      <BlogPost metadata={metadata}>{children}</BlogPost>;
    </>
  );
}
