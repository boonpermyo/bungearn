'use client';

import '@ant-design/v5-patch-for-react-19';

import {
  App as AntdFeedback,
  ConfigProvider as AntdConfigProvider,
  theme as AntdTheme,
  type AppProps as AntdAppProps,
  type ThemeConfig as AntdThemeConfig
} from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ThemeProvider, { useTheme, type ThemeProviderProps } from './theme-provider';

export type UIComponentThemeConfig = AntdThemeConfig['components'];
export type UIComponentGlobalConfig = AntdThemeConfig['token'];
export type FeedbackConfig = AntdAppProps;

type UIProviderBaseProps = React.PropsWithChildren<{
  framework?: 'nextjs';
  globalTokenConfig?: UIComponentGlobalConfig;
  componentThemeConfig?: UIComponentThemeConfig;
  feedbakcConfig?: FeedbackConfig;
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
  feedbakcConfig
}: UIProviderBaseProps) {
  const { theme, resolvedTheme } = useTheme();
  const activeTheme = (theme === 'system' ? resolvedTheme : theme) ?? 'light';
  const content = (
    <AntdConfigProvider
      wave={{ disabled: false }}
      theme={{
        token: { ...globalTokenConfig },
        components: { ...componentThemeConfig },
        algorithm: activeTheme === 'dark' ? AntdTheme.darkAlgorithm : AntdTheme.defaultAlgorithm
      }}
    >
      <AntdFeedback {...feedbakcConfig}>{children}</AntdFeedback>
    </AntdConfigProvider>
  );

  return framework === 'nextjs' ? <AntdRegistry>{content}</AntdRegistry> : content;
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

export const useFeeback = AntdFeedback.useApp;

export default function UIProvider(props: UIProviderProps) {
  return <UIProviderCompose {...props} />;
}
