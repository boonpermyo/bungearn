import { Typography as AntdTypography } from 'antd';
import type React from 'react';

const { Title: AntdTitle } = AntdTypography;

export type TitleProps = React.ComponentProps<typeof AntdTitle>;

export default function Title(props: TitleProps) {
  return <AntdTitle {...props} />;
}
