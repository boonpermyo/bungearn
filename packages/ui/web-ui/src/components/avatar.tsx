'use client';

import { Avatar as AntdAvatar, type AvatarProps as AntdAvatarProps } from 'antd';

export type AvatarProps = AntdAvatarProps;

export default function Avatar(props: AvatarProps) {
  return <AntdAvatar {...props} />;
}
