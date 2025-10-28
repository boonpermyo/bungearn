"use client";

import { Input as AntdInput } from "antd";
import type { ControllerRenderProps } from "react-hook-form";
import useFormField from "../fields/use-form-field";

export type TextInputProps = React.ComponentPropsWithRef<typeof AntdInput> & {
  controlField?: ControllerRenderProps<any, any>;
};

export default function TextInput({
  id,
  name,
  status,
  ref,
  onChange,
  onBlur,
  disabled,
  controlField,
  value,
  ...props
}: TextInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  return (
    <AntdInput
      id={id ?? formItemId}
      name={name ?? controlField?.name}
      status={status ?? invalid ? "error" : undefined}
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
