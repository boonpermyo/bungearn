"use client";

import React from "react";
import { Checkbox } from "antd";
import { type ControllerRenderProps } from "react-hook-form";
import useFormField from "../fields/use-form-field";

const { Group: AntdCheckboxGroup } = Checkbox;

export type CheckboxGroupInputProps = React.ComponentPropsWithRef<typeof AntdCheckboxGroup> & {
  controlField?: ControllerRenderProps<any, any>;
  id?: string;
};

export default function CheckboxGroupInput({
  id,
  name,
  ref,
  onChange,
  disabled,
  value,
  controlField,
  ...props
}: CheckboxGroupInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  return (
    <div
      id={(id ?? formItemId)?.concat("-checkbox-group-container")}
      ref={controlField?.ref}
      onBlur={controlField?.onBlur}
      tabIndex={0}
    >
      <AntdCheckboxGroup
        name={name ?? controlField?.name}
        ref={ref ?? controlField?.ref}
        onChange={onChange ?? controlField?.onChange}
        disabled={disabled ?? controlField?.disabled}
        value={value ?? controlField?.value}
        aria-invalid={invalid}
        {...props}
      />
    </div>
  );
}
