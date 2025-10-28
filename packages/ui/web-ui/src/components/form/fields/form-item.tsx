"use client";

import React, { createContext, useId } from "react";

export type FormItemProps = React.ComponentProps<"div">;

export type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

export default function FormItem({ children, ...props }: FormItemProps) {
  const formItemId = useId();
  return (
    <FormItemContext value={{ id: formItemId }}>
      <div {...props}>{children}</div>
    </FormItemContext>
  );
}
