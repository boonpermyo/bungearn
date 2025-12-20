import { Typography as AntdTypography } from 'antd';
import type React from 'react';

const { Text: AntdText } = AntdTypography;

export type TextProps = React.ComponentProps<typeof AntdText>;

export default function Text(props: TextProps) {
  return <AntdText {...props} />;
}
