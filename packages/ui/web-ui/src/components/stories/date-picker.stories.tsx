import type { Meta, StoryObj } from '@storybook/react-vite';
import DatePickerInput from '../form/inputs/date-picker';
import RangeDatePickerInput from '../form/inputs/range-date-picker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePickerInput
} satisfies Meta<typeof DatePickerInput>;

export default meta;
type Story = StoryObj<typeof DatePickerInput>;

export const Basic: Story = {
  args: {
    style: { width: 280 }
  }
};

export const RangePicker: Story = {
  render: () => <RangeDatePickerInput style={{ width: 360 }} />
};
