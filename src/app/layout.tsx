import type { Metadata } from 'next';
import localFont from 'next/font/local';
import TokyoColours from './tokyo-colours';
import './global.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TokyoColours />
        {children}
      </body>
    </html>
  );
}
