import Link from 'next/link';
import { FaBackspace, FaHome } from 'react-icons/fa';
import './posts.css';

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Link href="/posts">
        <FaBackspace />
        Back to posts
      </Link>
      <Link href="/">
        <FaHome />
        Go to the home screen
      </Link>
      <main className="container line-numbers">
        {children}
      </main>;
    </>
  );
}
