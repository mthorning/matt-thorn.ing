'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import type { PostsMeta } from '../utils';
import { FaExclamationCircle } from 'react-icons/fa';
import classes from './blog-post.module.css';

export default function BlogPost({
  metadata,
  children,
}: {
  children: ReactNode;
  metadata: PostsMeta;
}) {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();
  if (slug === 'posts') return children;

  const data = metadata[slug as keyof PostsMeta];
  const age = new Date().getFullYear() - new Date(data.date).getFullYear();

  return (
    <>
      <h1 className={classes.title}>{data.title}</h1>
      <h5>Published: {data.date.replace(/T.*$/, '')}</h5>
      {age > 2 ? (
        <div className={classes.ageWarning}>
          <FaExclamationCircle className={classes.icon} />
          <p className={classes.ageWarningMessage}>
            This article is {age} years old. The information within
            may be out-of-date and some of the examples may no longer work.
          </p>
        </div>
      ) : null}
      {children}
    </>
  );
}
