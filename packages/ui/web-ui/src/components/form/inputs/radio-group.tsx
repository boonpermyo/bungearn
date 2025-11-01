'use client';

import { Radio as AntdRadio } from 'antd';
import React, { useId } from 'react';
import useFormField from '../fields/use-form-field';
import type { ControllerRenderProps } from 'react-hook-form';

const { Group: AntdRadioGroup } = AntdRadio;

export type RadioGroupOption =
  | (React.ComponentPropsWithRef<typeof AntdRadio> & { label: React.ReactNode; value: any })
  | string
  | number;

export type RadioGroupInputProps = Omit<
  React.ComponentPropsWithRef<typeof AntdRadioGroup>,
  'options'
> & {
  controlField?: ControllerRenderProps<any, any>;
  options?: RadioGroupOption[];
  groupWrapperProps?: React.ComponentPropsWithRef<'div'>;
};

export default function RadioGroupInput({
  id,
  name,
  ref,
  onChange,
  onBlur,
  disabled,
  controlField,
  value,
  options,
  groupWrapperProps,
  ...props
}: RadioGroupInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  const optionKey: string = useId();

  return (
    <AntdRadioGroup
      id={id ?? formItemId}
      name={name ?? controlField?.name}
      ref={ref ?? controlField?.ref}
      onChange={onChange ?? controlField?.onChange}
      onBlur={onBlur ?? controlField?.onBlur}
      disabled={disabled ?? controlField?.disabled}
      value={value ?? controlField?.value}
      aria-invalid={invalid}
      {...props}
    >
      <div {...groupWrapperProps}>
        {options?.map((radioValue, index) => {
          if (typeof radioValue === 'number' || typeof radioValue === 'string') {
            return (
              <AntdRadio key={radioValue} value={radioValue}>
                {radioValue}
              </AntdRadio>
            );
          }

          const defaultKey: string = optionKey.concat(index.toString());
          const { id, label, ...props } = radioValue;
          return (
            <AntdRadio key={id ?? defaultKey} {...props}>
              {label}
            </AntdRadio>
          );
        })}
      </div>
    </AntdRadioGroup>
  );
}
