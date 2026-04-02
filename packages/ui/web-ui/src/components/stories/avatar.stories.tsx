import type { Meta, StoryObj } from '@storybook/react-vite';
import Avatar from '../avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    size: 64
  }
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {
  args: {
    children: 'AB'
  }
};

export const Image: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/1?v=4',
    alt: 'GitHub user'
  }
};

export const Icon: Story = {
  args: {
    icon: (
      <span role="img" aria-label="user">
        👤
      </span>
    ),
    shape: 'square'
  }
};

export const WithBadge: Story = {
  args: {
    badge: { count: 3 }
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
          <small>Top Right (default)</small>
          <Avatar {...args}>AB</Avatar>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
          <small>Bottom Left (dot)</small>
          <Avatar badge={{ dot: true, color: 'green', placement: 'bottomLeft' }}>CD</Avatar>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
          <small>Bottom Right</small>
          <Avatar badge={{ count: 12, placement: 'bottomRight' }}>EF</Avatar>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
          <small>Top Left</small>
          <Avatar badge={{ count: 1, placement: 'topLeft' }}>GH</Avatar>
        </div>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
          <small>Small + Top Right</small>
          <Avatar size="small" badge={{ count: 2, placement: 'topRight' }}>
            SM
          </Avatar>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
          <small>Large + Top Left</small>
          <Avatar size="large" badge={{ dot: true, placement: 'topLeft' }}>
            LG
          </Avatar>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
          <small>Custom size + Bottom Right</small>
          <Avatar
            style={{ width: 72, height: 72, fontSize: 28 }}
            badge={{ count: 9, placement: 'bottomRight' }}
          >
            XL
          </Avatar>
        </div>
      </div>
    </div>
  )
};
