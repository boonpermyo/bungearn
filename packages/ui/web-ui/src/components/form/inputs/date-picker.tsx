'use client';

import type { Dayjs } from 'dayjs';
import React from 'react';
import { type ControllerRenderProps } from 'react-hook-form';
import useFormField from '../fields/use-form-field';
import { dayjs } from '../../../utils/dayjs';
import DatePickerTH from '../../date-picker-th';

export type DatePickerInputProps<ValueType = Dayjs> = React.ComponentPropsWithRef<
  typeof DatePickerTH<ValueType>
> & {
  controlField?: ControllerRenderProps<any, any>;
};

export type DatePickerValue = DatePickerInputProps['defaultValue'];

export const validateDatePickerValue = (date?: DatePickerValue): DatePickerValue => {
  if (!date) {
    return undefined;
  }

  const validDayjs = dayjs(date);
  return validDayjs.isValid() ? validDayjs : undefined;
};

export default function DatePickerInput({
  id,
  status,
  ref,
  onChange,
  onBlur,
  disabled,
  defaultValue,
  value,
  controlField,
  ...props
}: DatePickerInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  const validDefaultValue = validateDatePickerValue(defaultValue);
  const validValue = validateDatePickerValue(value ?? controlField?.value);

  return (
    <DatePickerTH
      id={id ?? formItemId}
      status={(status ?? invalid) ? 'error' : undefined}
      ref={ref ?? controlField?.ref}
      onChange={onChange ?? controlField?.onChange}
      onBlur={onBlur ?? controlField?.onBlur}
      disabled={disabled ?? controlField?.disabled}
      defaultValue={validDefaultValue}
      value={validValue}
      aria-invalid={invalid}
      {...props}
    />
  );
}
