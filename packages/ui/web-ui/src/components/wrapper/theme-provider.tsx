'use client';

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps as NextThemesProviderProps
} from 'next-themes';

export type ThemeProviderProps = NextThemesProviderProps;

export default function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props} />;
}
