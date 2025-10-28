'use client';

import React from 'react';
import { FieldValues, FormProvider, FormProviderProps, UseFormHandleSubmit } from 'react-hook-form';

export type FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> = React.PropsWithChildren<{
  form: Omit<FormProviderProps<TFieldValues, TContext, TTransformedValues>, 'children'>;
  onValid: Parameters<UseFormHandleSubmit<TFieldValues, TTransformedValues>>[0];
  onInValid?: Parameters<UseFormHandleSubmit<TFieldValues, TTransformedValues>>[1];
  withFormElement?: boolean;
}>;

export default function Form<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>({
  children,
  onValid,
  onInValid,
  withFormElement = true,
  form
}: FormProps<TFieldValues, TContext, TTransformedValues>) {
  return (
    <FormProvider {...form}>
      {withFormElement ? (
        <form onSubmit={form.handleSubmit(onValid, onInValid)}>{children}</form>
      ) : (
        <>{children}</>
      )}
    </FormProvider>
  );
}
