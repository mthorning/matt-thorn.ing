import Link from 'next/link'
import { formatDate, getBlogPosts } from '@/utils/blog'

export default function BlogPosts() {
  const allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.date) > new Date(b.metadata.date)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
          >
            <div>
              <p>
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
