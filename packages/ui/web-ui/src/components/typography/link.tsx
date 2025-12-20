import { Typography as AntdTypography } from 'antd';
import type React from 'react';

const { Link: AntdLink } = AntdTypography;

export type LinkProps = React.ComponentProps<typeof AntdLink>;

export default function Link(props: LinkProps) {
  return <AntdLink {...props} />;
}
