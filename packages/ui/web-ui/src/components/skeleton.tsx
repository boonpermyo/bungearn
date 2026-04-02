import { Skeleton as AntdSkeleton, type SkeletonProps as AntdSkeletonProps } from 'antd';

export type SkeletonProps = AntdSkeletonProps;

export default function Skeleton(props: SkeletonProps) {
  return <AntdSkeleton {...props} />;
}
