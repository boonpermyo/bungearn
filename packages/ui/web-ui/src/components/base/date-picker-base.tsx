import { DatePicker as AntdDatePicker } from 'antd';
import type {
  DatePickerProps as AntdDatePickerProps,
  RangePickerProps as AntdRangePickerProps
} from 'antd/es/date-picker';
export type DatePickerBaseProps = AntdDatePickerProps;
export type RangePickerBaseProps = AntdRangePickerProps;

const DatePickerBase = AntdDatePicker;
export const RangePickerBase = AntdDatePicker.RangePicker;

export default DatePickerBase;
