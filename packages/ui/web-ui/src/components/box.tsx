'use client';

import React from 'react';
import { cn } from '../utils/cn';
import { useToken } from '../hooks';

export type BoxVariant = 'page-content' | 'plain';
export type BoxProps = React.ComponentProps<'div'> & {
  variant?: BoxVariant;
  disabledThemeSync?: boolean;
};

const mapVariantBox: Record<BoxVariant, string> = {
  'page-content': 'p-4 h-full',
  plain: ''
};

export default function Box({
  children,
  className,
  style,
  variant = 'plain',
  disabledThemeSync = false,
  ...props
}: BoxProps) {
  const { token } = useToken();
  return (
    <div
      className={cn(mapVariantBox[variant ?? 'page-content'], className)}
      style={{
        backgroundColor: disabledThemeSync ? undefined : token.colorBgContainer,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
