import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from '../badge';
import Avatar from '../avatar';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    count: 5
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Count: Story = {
  args: {
    count: 7
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Badge {...args}>
        <Avatar shape="square" size={48}>
          U
        </Avatar>
      </Badge>
      <Badge {...args}>
        <a href="#button" style={{ padding: '8px 12px', border: '1px solid #ddd' }}>
          Link
        </a>
      </Badge>
    </div>
  )
};

export const Status: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Badge status="success" text="Success" />
      <Badge status="processing" text="Processing" />
      <Badge status="warning" text="Warning" />
      <Badge status="error" text="Error" />
      <Badge status="default" text="Default" />
    </div>
  )
};
