import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../button';

const meta = {
  title: 'Components/Button',
  component: Button
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Variants: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button type="primary">Primary</Button>
        <Button type="default">Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
        <Button type="link">Link</Button>
      </div>
    );
  }
};

export const Gradient: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button type="gradient">Gradient (primary → info)</Button>
      <Button
        type="gradient"
        gradient={{ from: '#9333ea', to: '#22c55e', deg: 120 }}
      >
        Custom gradient
      </Button>
    </div>
  )
};
