'use client';

// import '@ant-design/v5-patch-for-react-19';

import type React from 'react';
import {
  App as AntdFeedback,
  ConfigProvider as AntdConfigProvider,
  theme as AntdTheme,
  type AppProps as AntdAppProps,
  type ThemeConfig as AntdThemeConfig
} from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ThemeProvider, { type ThemeProviderProps } from './theme-provider';
import LoadingFullscreenProvider from './loading-fullscreen-provider';
import { useIsMounted, useTheme } from '../../hooks';

export type UIComponentThemeConfig = AntdThemeConfig['components'];
export type UIComponentGlobalConfig = AntdThemeConfig['token'];
export type FeedbackConfig = AntdAppProps;

type UIProviderBaseProps = React.PropsWithChildren<{
  framework?: 'nextjs';
  globalTokenConfig?: UIComponentGlobalConfig;
  componentThemeConfig?: UIComponentThemeConfig;
  feedbakcConfig?: FeedbackConfig;
  initialContent?: React.ReactNode;
}>;

type ThemeProviderOptions = Omit<ThemeProviderProps, 'children'>;

export type UIProviderProps = UIProviderBaseProps & {
  themeProviderProps?: ThemeProviderOptions;
};

function UIProviderBody({
  children,
  framework = 'nextjs',
  globalTokenConfig,
  componentThemeConfig,
  feedbakcConfig,
  initialContent = null
}: UIProviderBaseProps) {
  const { theme, resolvedTheme } = useTheme();
  const isMounted = useIsMounted();
  const activeTheme = (theme === 'system' ? resolvedTheme : theme) ?? 'light';

  const contentWithProviders = (
    <AntdConfigProvider
      wave={{ disabled: true }}
      theme={{
        token: { fontFamily: 'inherit', ...globalTokenConfig },
        components: {
          ...componentThemeConfig,
          Typography: {
            fontSizeHeading5: 18,
            titleMarginBottom: '0',
            titleMarginTop: '0',
            ...componentThemeConfig?.Typography
          },
          Spin: {
            colorBgMask: '#202121A8',
            ...componentThemeConfig?.Spin
          },
          Divider: {
            marginLG: 12,
            ...componentThemeConfig?.Divider
          }
        },
        algorithm: activeTheme === 'light' ? AntdTheme.defaultAlgorithm : AntdTheme.darkAlgorithm
      }}
    >
      <LoadingFullscreenProvider>
        <AntdFeedback {...feedbakcConfig}>{children}</AntdFeedback>
      </LoadingFullscreenProvider>
    </AntdConfigProvider>
  );

  const renderedContent =
    framework === 'nextjs' ? <AntdRegistry>{contentWithProviders}</AntdRegistry> : contentWithProviders;

  return isMounted ? renderedContent : initialContent;
}

function UIProviderCompose({ themeProviderProps, ...props }: UIProviderProps) {
  const {
    defaultTheme = 'light',
    attribute = 'class',
    disableTransitionOnChange = true,
    ...restThemeProviderProps
  } = themeProviderProps ?? {};
  return (
    <ThemeProvider
      defaultTheme={defaultTheme}
      attribute={attribute}
      disableTransitionOnChange={disableTransitionOnChange}
      {...restThemeProviderProps}
    >
      <UIProviderBody {...props} />
    </ThemeProvider>
  );
}

export default function UIProvider(props: UIProviderProps) {
  return <UIProviderCompose {...props} />;
}
