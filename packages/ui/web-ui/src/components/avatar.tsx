import Badge, { type BadgeProps } from './badge';
import { Avatar as AntdAvatar, type AvatarProps as AntdAvatarProps } from 'antd';
import { cn } from '../utils/cn';

export type BadgePlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type AvatarBadgeConfig = BadgeProps & {
  show?: boolean;
  placement?: BadgePlacement;
};

export type AvatarProps = AntdAvatarProps & {
  badge?: AvatarBadgeConfig;
};

export default function Avatar({ badge, ...props }: AvatarProps) {
  const shouldShowBadge = badge && badge.show !== false;
  const avatarNode = <AntdAvatar {...props} />;

  if (!shouldShowBadge) {
    return avatarNode;
  }

  const { show, placement = 'topRight', className, ...badgeProps } = badge;
  const placementClassName = `whispa-badge-${placement}`;
  return (
    <Badge {...badgeProps} className={cn(className, placementClassName)}>
      {avatarNode}
    </Badge>
  );
}
