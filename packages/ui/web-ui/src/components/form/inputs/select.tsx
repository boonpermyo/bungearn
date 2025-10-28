'use client';

import { Select as AntdSelect } from 'antd';
import React from 'react';
import { type ControllerRenderProps } from 'react-hook-form';
import useFormField from '../fields/use-form-field';
import { cn } from '../../../utils/cn';

export type SelectInputProps = React.ComponentPropsWithRef<typeof AntdSelect> & {
  controlField?: ControllerRenderProps<any, any>;
};

export default function SelectInput({
  id,
  status,
  ref,
  onChange,
  onBlur,
  disabled,
  value,
  controlField,
  className,
  ...props
}: SelectInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });
  return (
    <AntdSelect
      className={cn('w-full', className)}
      id={id ?? formItemId}
      status={(status ?? invalid) ? 'error' : undefined}
      ref={ref ?? controlField?.ref}
      onChange={onChange ?? controlField?.onChange}
      onBlur={onBlur ?? controlField?.onBlur}
      disabled={disabled ?? controlField?.disabled}
      value={value ?? controlField?.value}
      aria-invalid={invalid}
      {...props}
    />
  );
}
