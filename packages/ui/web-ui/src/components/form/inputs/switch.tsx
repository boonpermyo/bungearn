"use client";

import React from "react";
import { Switch as AntdSwitch } from "antd";
import { type ControllerRenderProps } from "react-hook-form";
import useFormField from "../fields/use-form-field";

export type SwitchInputProps = React.ComponentPropsWithRef<typeof AntdSwitch> & {
  controlField?: ControllerRenderProps<any, any>;
};

export default function SwitchInput({
  id,
  ref,
  disabled,
  value,
  onChange,
  controlField,
  ...props
}: SwitchInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  return (
    <AntdSwitch
      id={id ?? formItemId}
      ref={ref ?? controlField?.ref}
      onChange={onChange ?? controlField?.onChange}
      disabled={disabled ?? controlField?.disabled}
      checked={value ?? controlField?.value}
      aria-invalid={invalid}
      {...props}
    />
  );
}
