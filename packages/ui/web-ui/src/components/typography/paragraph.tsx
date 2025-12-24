import { Typography as AntdTypography } from 'antd';
import type React from 'react';

const { Paragraph: AntdParagraph } = AntdTypography;

export type ParagraphProps = React.ComponentProps<typeof AntdParagraph>;

export default function Paragraph(props: ParagraphProps) {
  return <AntdParagraph {...props} />;
}
