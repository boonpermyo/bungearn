import { dayjs } from '../../../utils/dayjs';
import { type ControllerRenderProps } from 'react-hook-form';
import useFormField from '../fields/use-form-field';
import DatePickerBase from '../../base/date-picker-base';

export type DatePickerInputProps = React.ComponentProps<typeof DatePickerBase> & {
  controlField?: ControllerRenderProps<any, any>;
};

export type DatePickerValue = DatePickerInputProps['defaultValue'];

export const validateDatePickerValue = (date?: DatePickerValue): DatePickerValue => {
  if (!date) {
    return undefined;
  }

  const validDayjs = dayjs(date as Parameters<typeof dayjs>[0]);
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
    <DatePickerBase
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
