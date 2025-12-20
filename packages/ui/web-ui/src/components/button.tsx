import { Button as AntdButton, type ButtonProps as AntdButtonProps } from 'antd';
import { useToken } from '../hooks';

export type ButtonGradientConfig = {
  from?: string;
  to?: string;
  deg?: number;
};

export type ButtonProps = Omit<AntdButtonProps, 'type'> & {
  type?: AntdButtonProps['type'] | 'gradient';
  gradient?: ButtonGradientConfig;
};

export default function Button({ type, style, gradient, ...props }: ButtonProps) {
  const { token } = useToken();
  const isGradient = type === 'gradient';

  const gradientStyle = isGradient
    ? {
        border: 'none',
        backgroundImage: `linear-gradient(${gradient?.deg ?? 90}deg, ${gradient?.from ?? token.colorPrimary}, ${gradient?.to ?? token.colorInfo ?? token.colorPrimary})`,
        color: token.colorTextLightSolid
      }
    : {};

  return (
    <AntdButton
      type={isGradient ? 'default' : type}
      style={{ ...gradientStyle, ...style }}
      {...props}
    />
  );
}
