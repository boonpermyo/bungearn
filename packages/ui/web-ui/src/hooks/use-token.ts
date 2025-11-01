import { theme as AntdTheme } from 'antd';

type AntdTokenResult = ReturnType<typeof AntdTheme.useToken>;

export type UseTokenResult = {
  theme: AntdTokenResult['theme'];
  token: AntdTokenResult['token'];
  hashId: AntdTokenResult['hashId'];
};

export default function useToken(): UseTokenResult {
  const { theme, token, hashId } = AntdTheme.useToken();
  return { theme, token, hashId };
}
