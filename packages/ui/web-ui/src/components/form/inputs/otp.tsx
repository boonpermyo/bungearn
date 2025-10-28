'use client';

import { Input } from 'antd';
import useFormField from '../fields/use-form-field';
import type { ControllerRenderProps } from 'react-hook-form';

const { OTP: AntdOTP } = Input;

export type OTPInputProps = React.ComponentPropsWithRef<typeof AntdOTP> & {
  name?: string;
  controlField?: ControllerRenderProps<any, any>;
};

export default function OTPInput({
  id,
  name,
  status,
  ref,
  onInput,
  onBlur,
  disabled,
  controlField,
  value,
  ...props
}: OTPInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  const _onInput: OTPInputProps['onInput'] = (otpValueArray: string[]) => {
    if (typeof onInput === 'function') {
      return onInput(otpValueArray);
    }

    controlField?.onChange?.(otpValueArray.join(''));
  };

  return (
    <AntdOTP
      id={id ?? formItemId}
      status={(status ?? invalid) ? 'error' : undefined}
      ref={ref ?? controlField?.ref}
      onInput={_onInput}
      onBlur={onBlur ?? controlField?.onBlur}
      disabled={disabled ?? controlField?.disabled}
      value={value ?? controlField?.value}
      aria-invalid={invalid}
      data-name={name ?? controlField?.name}
      {...props}
    />
  );
}
