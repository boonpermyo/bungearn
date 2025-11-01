import {
  useTheme as nextThemesUseTheme,
  type UseThemeProps as NextThemesUseThemeProps
} from 'next-themes';

export type UseThemeResult = NextThemesUseThemeProps;

export const useTheme = (): UseThemeResult => nextThemesUseTheme();

export default useTheme;
