import { Drawer as AntdDrawer, type DrawerProps as AntdDrawerProps } from 'antd';

export type DrawerProps = AntdDrawerProps;

export default function Drawer(props: DrawerProps) {
  return <AntdDrawer rootClassName="whispa-drawer" {...props} />;
}
