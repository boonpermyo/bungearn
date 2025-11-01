'use client';

import { Input, type InputProps } from 'antd';
import { PatternFormat, type NumberFormatValues, type PatternFormatProps } from 'react-number-format';
import useFormField from '../fields/use-form-field';
import { type ControllerRenderProps } from 'react-hook-form';

export type NumericPatternInputProps = PatternFormatProps & {
  customInputProps?: Pick<InputProps, 'addonAfter' | 'addonBefore' | 'allowClear' | 'size' | 'status'>;
  controlField?: ControllerRenderProps<any, any>;
  valueChangeFieldKeyForControl?: keyof NumberFormatValues;
};

export default function NumericPatternInput({
  id,
  getInputRef,
  controlField,
  customInput,
  customInputProps,
  valueChangeFieldKeyForControl = 'value',
  disabled,
  value,
  onBlur,
  onValueChange,
  ...props
}: NumericPatternInputProps) {
  const InputComponent: React.ComponentType<any> = customInput ?? Input;
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  const _onValueChange: PatternFormatProps['onValueChange'] = (values, sourceInfo) => {
    if (typeof onValueChange === 'function') {
      return onValueChange(values, sourceInfo);
    }

    if (typeof controlField?.onChange === 'function') {
      controlField?.onChange(values[valueChangeFieldKeyForControl]);
    }
  };

  return (
    <PatternFormat
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
