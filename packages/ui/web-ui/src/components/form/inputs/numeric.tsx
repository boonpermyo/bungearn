'use client';

import { Input, type InputProps } from 'antd';
import { type ControllerRenderProps } from 'react-hook-form';
import { NumericFormat, type NumberFormatValues, type NumericFormatProps } from 'react-number-format';
import useFormField from '../fields/use-form-field';

export type NumericInputProps = NumericFormatProps & {
  customInputProps?: Pick<InputProps, 'addonAfter' | 'addonBefore' | 'allowClear' | 'size' | 'status'>;
  controlField?: ControllerRenderProps<any, any>;
  valueChangeFieldKeyForControl?: keyof NumberFormatValues;
};

export default function NumericInput({
  id,
  getInputRef,
  controlField,
  customInput,
  customInputProps,
  valueChangeFieldKeyForControl = 'floatValue',
  disabled,
  value,
  onBlur,
  onValueChange,
  ...props
}: NumericInputProps) {
  const InputComponent: React.ComponentType<any> = customInput ?? Input;
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  const _onValueChange: NumericInputProps['onValueChange'] = (values, sourceInfo) => {
    if (typeof onValueChange === 'function') {
      return onValueChange(values, sourceInfo);
    }

    if (typeof controlField?.onChange === 'function') {
      controlField?.onChange(values[valueChangeFieldKeyForControl]);
    }
  };

  return (
    <NumericFormat
      customInput={InputComponent}
      id={id ?? formItemId}
      status={(customInputProps?.status ?? invalid) ? 'error' : undefined}
      getInputRef={getInputRef ?? controlField?.ref}
      onValueChange={_onValueChange}
      onBlur={onBlur ?? controlField?.onBlur}
      disabled={disabled ?? controlField?.disabled}
      value={value ?? controlField?.value}
      aria-invalid={invalid}
      {...props}
      {...customInputProps}
    />
  );
}
