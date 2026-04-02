import type { UIProviderProps } from '@whispa/web-ui/components';

const uiConfig: Readonly<UIProviderProps> = {
  globalTokenConfig: {
    borderRadius: 8,
    fontSize: 14,

    // Brand Colors (fixed values; CSS overrides handle dynamic theming)
    colorPrimary: '#9333ea',
    colorInfo: '#3b82f6',
    colorSuccess: '#22c55e',
    colorWarning: '#eab308',
    colorError: '#ef4444',

    // Neutrals
    // colorTextBase: '#111827', // Gray 900
    // colorBgBase: '#ffffff', // White

    // Typography
    // fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    // fontSize: 16, // Base size to match Rem
    fontSizeHeading1: 36,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,

    // Spacing & Shapes
    borderRadiusLG: 12, // Large radius
    borderRadiusSM: 4, // Small radius
    wireframe: false
  }
};

export default uiConfig;
