import { Badge as AntdBadge, type BadgeProps as AntdBadgeProps } from 'antd';

export type BadgeProps = AntdBadgeProps;

export default function Badge(props: BadgeProps) {
  return <AntdBadge {...props} />;
}
