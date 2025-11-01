'use client';

import { Input } from 'antd';
import { type ControllerRenderProps } from 'react-hook-form';
import useFormField from '../fields/use-form-field';

const { TextArea: AntdTextArea } = Input;

export type TextAreaInputProps = React.ComponentPropsWithRef<typeof AntdTextArea> & {
  controlField?: ControllerRenderProps<any, any>;
};

export default function TextAreaInput({
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
}: TextAreaInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  return (
    <AntdTextArea
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
