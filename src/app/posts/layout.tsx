import './posts.css';

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="container line-numbers">{children}</main>;
}
