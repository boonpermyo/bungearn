'use client';

import '@ant-design/v5-patch-for-react-19';

import {
  App as AntdFeedback,
  ConfigProvider as AntdConfigProvider,
  type ThemeConfig as AntdThemeConfig,
  type AppProps as AntdAppProps
} from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ThemeProvider, { useTheme, type UseThemeResult } from './theme-provider';

export type UIComponentThemeConfig = AntdThemeConfig['components'];
export type FeedbackConfig = AntdAppProps;
export type UIProviderProps = React.PropsWithChildren<{
  framework?: 'nextjs';
  componentThemeConfig?: UIComponentThemeConfig;
  feedbakcConfig?: FeedbackConfig;
}>;

type UIProviderComposeProps = UIProviderProps & {
  themeContext: UseThemeResult;
};

function UIProviderCompose({
  children,
  framework = 'nextjs',
  componentThemeConfig,
  feedbakcConfig,
  themeContext
}: UIProviderComposeProps) {
  console.log('[LOG] - ui-provider.tsx:31 - UIProviderCompose - themeContext:', themeContext);
  const content = (
    <ThemeProvider>
      <AntdConfigProvider wave={{ disabled: true }} theme={{ components: { ...componentThemeConfig } }}>
        <AntdFeedback {...feedbakcConfig}>{children}</AntdFeedback>
      </AntdConfigProvider>
    </ThemeProvider>
  );

  if (framework === 'nextjs') {
    return <AntdRegistry>{content}</AntdRegistry>;
  }

  return content;
}

export default function UIProvider({ ...props }: UIProviderProps) {
  const themeContext = useTheme();
  return <UIProviderCompose {...props} themeContext={themeContext} />;
}
