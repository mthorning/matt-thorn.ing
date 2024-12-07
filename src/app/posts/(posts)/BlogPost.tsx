'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import type { PostsMeta } from './utils';

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
  return (
    <>
      <h1>{data.title}</h1>
      {children}
    </>
  );
}
