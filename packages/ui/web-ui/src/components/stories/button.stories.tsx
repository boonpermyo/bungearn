import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonComponent from '../button';

const meta = {
  title: 'Components/Button',
  component: ButtonComponent
} satisfies Meta<typeof ButtonComponent>;

export default meta;
type Story = StoryObj<typeof ButtonComponent>;

export const Button: Story = {
  render: () => {
    return (
      <div>
        <ButtonComponent>Sample</ButtonComponent>
      </div>
    );
  }
};
