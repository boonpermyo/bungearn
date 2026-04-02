import { Button as AntdButton, type ButtonProps as AntdButtonProps } from 'antd';

export type ButtonGradientConfig = {
  from?: string;
  to?: string;
  deg?: number;
};

export type ButtonGradientPreset = 'gray';

export type ButtonProps = Omit<AntdButtonProps, 'type'> & {
  type?: AntdButtonProps['type'] | 'gradient';
  gradient?: ButtonGradientConfig | ButtonGradientPreset;
};

const gradientPresets: Record<ButtonGradientPreset, ButtonGradientConfig> = {
  gray: {
    from: '#64748b', // slate-500
    to: '#94a3b8' // slate-400
  }
};

// Use CSS vars as defaults so consumers can override via Tailwind or global tokens.
const FALLBACK_PRIMARY = 'var(--whispa-btn-gradient-from, #1677ff)'; // Antd default primary
const FALLBACK_INFO = 'var(--whispa-btn-gradient-to, #69b1ff)'; // Antd default info

export default function Button({ type, style, gradient, ...props }: ButtonProps) {
  const isGradient = type === 'gradient';

  const preset = typeof gradient === 'string' ? gradientPresets[gradient] : undefined;
  const gradientConfig = typeof gradient === 'string' ? preset : gradient;

  const gradientStyle = isGradient
    ? {
        border: 'none',
        backgroundImage: `linear-gradient(${gradientConfig?.deg ?? 90}deg, ${gradientConfig?.from ?? FALLBACK_PRIMARY}, ${gradientConfig?.to ?? FALLBACK_INFO})`,
        color: '#ffffff'
      }
    : {};

  return (
    <AntdButton type={isGradient ? 'default' : type} style={{ ...gradientStyle, ...style }} {...props} />
  );
}
