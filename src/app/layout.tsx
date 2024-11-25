import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { CssSetup } from '@/css-vars';
import './global.css';

const geistSans = localFont({
  src: './fonts/Quicksand.ttf',
  variable: '--font-quicksand',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Matt Thorning',
  description: 'Software engineer and occasional photographer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${geistSans.variable}`}>
        <CssSetup />
        {children}
      </body>
    </html>
  );
}
