'use client';

import React from 'react';
import { type ControllerRenderProps } from 'react-hook-form';
import useFormField from '../fields/use-form-field';
import { dayjs } from '../../../utils/dayjs';
import DatePickerTH from '../../date-picker-th';

const { RangePicker: AntdRangePicker } = DatePickerTH;

export type RangeDatePickerInputProps = React.ComponentPropsWithRef<typeof AntdRangePicker> & {
  controlField?: ControllerRenderProps<any, any>;
};

export type DateRangeValue = RangeDatePickerInputProps['defaultValue'];

export const validateDateRangeValue = (dates?: DateRangeValue): DateRangeValue => {
  if (!dates) {
    return undefined;
  }

  const [startDate, endDate] = dates;

  const validStartDate = startDate ? dayjs(startDate) : undefined;
  const validEndDate = endDate ? dayjs(endDate) : undefined;

  return validStartDate?.isValid() && validEndDate?.isValid()
    ? [validStartDate, validEndDate]
    : undefined;
};

export default function RangeDatePickerInput({
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
}: RangeDatePickerInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  const validDefaultValue = validateDateRangeValue(defaultValue);
  const validValue = validateDateRangeValue(value ?? controlField?.value);

  return (
    <AntdRangePicker
      id={id ?? formItemId}
      status={(status ?? invalid) ? 'error' : undefined}
      ref={ref ?? controlField?.ref}
      onChange={onChange ?? controlField?.onChange}
      onBlur={onBlur ?? controlField?.onBlur}
      disabled={disabled ?? controlField?.disabled}
      defaultValue={validDefaultValue}
      value={validValue}
      aria-invalid={invalid}
      format={'DD/MM/BBBB'}
      {...props}
    />
  );
}
