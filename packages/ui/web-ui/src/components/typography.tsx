'use client';

import type React from 'react';
import { Typography as AntdTypography } from 'antd';

export type TypographyProps = React.ComponentProps<typeof AntdTypography>;
export type TitleProps = React.ComponentProps<typeof Title>;
export type ParagraphProps = React.ComponentProps<typeof Paragraph>;
export type TextProps = React.ComponentProps<typeof Text>;
export type LinkProps = React.ComponentProps<typeof Link>;

const { Title, Paragraph, Text, Link } = AntdTypography;
export { Title, Paragraph, Text, Link };
