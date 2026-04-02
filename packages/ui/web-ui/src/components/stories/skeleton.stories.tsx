import type { Meta, StoryObj } from '@storybook/react-vite';
import Skeleton from '../skeleton';
import SkeletonAvatar from '../skeleton/skeleton-avatar';
import SkeletonButton from '../skeleton/skeleton-button';
import SkeletonInput from '../skeleton/skeleton-input';
import SkeletonImage from '../skeleton/skeleton-image';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: {
    active: true
  }
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Paragraph: Story = {
  args: {
    paragraph: { rows: 4 },
    title: true
  }
};

export const AvatarAndParagraph: Story = {
  args: {
    avatar: true,
    paragraph: { rows: 3 },
    title: true
  }
};

export const ButtonOnly: Story = {
  render: () => <SkeletonButton active />
};

export const InputOnly: Story = {
  render: () => <SkeletonInput active />
};

export const AvatarOnly: Story = {
  render: () => <SkeletonAvatar active shape="circle" size="large" />
};

export const ImageOnly: Story = {
  render: () => <SkeletonImage active />
};
