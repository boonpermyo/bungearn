'use client';

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps as NextThemesProviderProps,
  useTheme as nextThemesUseTheme,
  UseThemeProps as NextThemesUseThemeProps
} from 'next-themes';

export type ThemeProviderProps = NextThemesProviderProps;
export type UseThemeResult = NextThemesUseThemeProps;

export const useTheme = (): UseThemeResult => nextThemesUseTheme();

export default function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props} />;
}
