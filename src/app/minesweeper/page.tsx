'use client';

import dynamic from 'next/dynamic'
const NoSSR = dynamic(() => import('./Minesweeper'), { ssr: false })

export default function MinesweeperPage() {
  return <NoSSR />
}
