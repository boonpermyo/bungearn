'use client';

import { useFormContext } from 'react-hook-form';
import Button, { type ButtonProps } from '../../button';

export type ButtonSubmitProps = Omit<ButtonProps, 'htmlType'>;

export default function ButtonSubmit({ loading, ...props }: ButtonSubmitProps) {
  const formContextValue = useFormContext();
  if (!formContextValue) {
    throw new Error(
      '<ButtonSubmit> component must be use inside <Form>. Ensure <ButtonSubmit> is wraps the component using <Form>.'
    );
  }

  const {
    formState: { isSubmitting }
  } = formContextValue;

  return <Button htmlType="submit" {...props} loading={loading || isSubmitting} />;
}
