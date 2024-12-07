import Link from 'next/link';
import { getAllPosts } from './utils';

export default function BlogPosts() {
  const allPosts = getAllPosts();

  return (
    <div>
      {allPosts
        .sort((a, b) => {
          if (new Date(a.data.date) > new Date(b.data.date)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link key={post.data.slug} href={`/posts/${post.data.slug}`}>
            <div>
              <h3>{post.data.title}</h3>
            </div>
          </Link>
        ))}
    </div>
  );
}
