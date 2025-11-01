'use client';

import { Input } from 'antd';
import useFormField from '../fields/use-form-field';
import { type ControllerRenderProps } from 'react-hook-form';

const { Password: AntdPassword } = Input;

export type PasswordInputProps = React.ComponentPropsWithRef<typeof AntdPassword> & {
  controlField?: ControllerRenderProps<any, any>;
};

export default function PasswordInput({
  id,
  name,
  status,
  ref,
  onChange,
  onBlur,
  disabled,
  value,
  controlField,
  ...props
}: PasswordInputProps) {
  const { formItemId, invalid } = useFormField({ skipValidationIfNoContext: true });

  return (
    <AntdPassword
      id={id ?? formItemId}
      name={name ?? controlField?.name}
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
