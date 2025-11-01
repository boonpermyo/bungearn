import { Button as AntdButton, type ButtonProps as AntdButtonProps } from 'antd';

export type ButtonProps = Omit<AntdButtonProps, 'type'>;

export default function Button(props: ButtonProps) {
  return <AntdButton {...props} />;
}
