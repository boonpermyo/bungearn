import type { UIProviderProps } from '@whispa/web-ui/components';

const uiConfig: Readonly<UIProviderProps> = {
  globalTokenConfig: {
    borderRadius: 8,
    fontSize: 14,

    // Brand Colors (Matching Tailwind tokens)
    colorPrimary: '#9333ea', // Purple 600
    colorInfo: '#3b82f6', // Blue 500
    colorSuccess: '#22c55e', // Green 500
    colorWarning: '#eab308', // Yellow 500
    colorError: '#ef4444', // Red 500

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
    wireframe: false,

    // Transitions
    motionUnit: 0.1
  },
  componentThemeConfig: {}
};

export default uiConfig;
