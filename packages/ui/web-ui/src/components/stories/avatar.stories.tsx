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
    icon: <span role="img" aria-label="user">👤</span>,
    shape: 'square'
  }
};
