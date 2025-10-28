import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';

export type ButtonProps = AntdButtonProps;

export default function Button(props: ButtonProps) {
  return <AntdButton {...props} />;
}
