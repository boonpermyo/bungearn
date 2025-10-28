"use client";

import React from "react";
import { Upload as AntdUpload } from "antd";
import { type ControllerRenderProps } from "react-hook-form";
import useFormField from "../fields/use-form-field";

export type UploadInputProps = React.ComponentPropsWithRef<typeof AntdUpload> & {
  controlField?: ControllerRenderProps<any, any>;
  uploadMode?: "instant" | "manual";
};

export default function UploadInput({
  id,
  uploadMode = "manual",
  controlField,
  beforeUpload,
  disabled,
  fileList,
  name,
  ...props
}: UploadInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  const _beforeUpload: UploadInputProps["beforeUpload"] = (file, fileList) => {
    if (typeof beforeUpload === "function" || uploadMode === "instant") {
      return beforeUpload?.(file, fileList);
    }

    controlField?.onChange?.(fileList);
    return false;
  };

  return (
    <div
      id={(id ?? formItemId)?.concat("-upload-container")}
      ref={controlField?.ref}
      onBlur={controlField?.onBlur}
      tabIndex={0}
    >
      <AntdUpload
        id={id ?? formItemId}
        name={name ?? controlField?.name}
        disabled={disabled ?? controlField?.disabled}
        fileList={fileList ?? controlField?.value}
        aria-invalid={invalid}
        beforeUpload={_beforeUpload}
        {...props}
      />
    </div>
  );
}
