import type { Metadata } from 'next';
import localFont from 'next/font/local';
// import { CssSetup, getVarsForStyleTag } from '@/css-vars';
import { varsForStyleTag } from '@/css-vars';
import { Faro } from '@/faro';
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
      <head>
        <style id="teststyle">
          {varsForStyleTag}
        </style>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>⚡</text></svg>"
        ></link>
      </head>
      <body className={`${geistSans.variable}`}>
        <Faro />
        {children}
      </body>
    </html>
  );
}
