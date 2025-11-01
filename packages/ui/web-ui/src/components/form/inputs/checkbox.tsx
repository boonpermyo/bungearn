'use client';

import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import { type ControllerRenderProps } from 'react-hook-form';
import useFormField from '../fields/use-form-field';

export type CheckboxInputProps = React.ComponentPropsWithRef<typeof AntdCheckbox> & {
  controlField?: ControllerRenderProps<any, any>;
};

export default function CheckboxInput({
  id,
  name,
  ref,
  onChange,
  onBlur,
  disabled,
  value,
  controlField,
  ...props
}: CheckboxInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  return (
    <AntdCheckbox
      id={id ?? formItemId}
      name={name ?? controlField?.name}
      ref={ref ?? controlField?.ref}
      onChange={onChange ?? controlField?.onChange}
      onBlur={onBlur ?? controlField?.onBlur}
      disabled={disabled ?? controlField?.disabled}
      checked={value ?? controlField?.value}
      aria-invalid={invalid}
      {...props}
    />
  );
}
