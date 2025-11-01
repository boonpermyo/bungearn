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
        <ButtonComponent color="primary" variant="solid">
          Solid
        </ButtonComponent>
        <ButtonComponent color="default" variant="outlined">
          Outlined
        </ButtonComponent>
        <ButtonComponent color="default" variant="dashed">
          Dashed
        </ButtonComponent>
        <ButtonComponent color="default" variant="filled">
          Filled
        </ButtonComponent>
        <ButtonComponent color="default" variant="text">
          Text
        </ButtonComponent>
        <ButtonComponent color="default" variant="link">
          Link
        </ButtonComponent>
      </div>
    );
  }
};
