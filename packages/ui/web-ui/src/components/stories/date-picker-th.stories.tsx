import type { Meta, StoryObj } from '@storybook/react-vite';
import DatePickerTH from '../date-picker-th';

const meta = {
  title: 'Components/DatePickerTH',
  component: DatePickerTH
} satisfies Meta<typeof DatePickerTH>;

export default meta;
type Story = StoryObj<typeof DatePickerTH>;

export const Basic: Story = {
  args: {
    style: { width: 280 }
  }
};
