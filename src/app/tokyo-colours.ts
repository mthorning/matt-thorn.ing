'use client';
import { useEffect } from 'react';

export const colours = {
  night: {
    background: '#1a1b26',
    currentLine: '#282a36',
    selection: '#44475a',
    foreground: '#f8f8f2',
    comment: '#6272a4',
    cyan: '#8be9fd',
    green: '#50fa7b',
    orange: '#ffb86c',
    pink: '#ff79c6',
    purple: '#bd93f9',
    red: '#ff5555',
    yellow: '#f1fa8c',
  },
  day: {
    background: '#f8f8f2',
    currentLine: '#eaeaea',
    selection: '#d4d4d4',
    foreground: '#282a36',
    comment: '#6272a4',
    cyan: '#0184bc',
    green: '#50a14f',
    orange: '#d75f00',
    pink: '#c353e0',
    purple: '#a626a4',
    red: '#e45649',
    yellow: '#986801',
  },
};

export default function TokyoColours() {
  useEffect(() => {
    Object.entries(colours).forEach(([dayNight, cols]) => {
      Object.entries(cols).forEach(([key, value]) => {
        document.documentElement.style.setProperty(
          '--tokyo-' + dayNight + '-' +
            key.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase()),
          value
        );
      });
    });
  }, []);
  return null;
}
