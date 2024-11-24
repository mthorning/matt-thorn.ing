export const matchesColorScheme = (scheme: 'light' | 'dark'): boolean =>
  window.matchMedia(`(prefers-color-scheme: ${scheme})`).matches;
