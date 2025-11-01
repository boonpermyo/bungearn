import type { Meta, StoryObj } from '@storybook/react-vite';
import LoadingComponent from '../loading';

const meta = {
  title: 'Components/Loading',
  component: LoadingComponent,
  args: {}
} satisfies Meta<typeof LoadingComponent>;

export default meta;
type Story = StoryObj<typeof LoadingComponent>;

export const Loading: Story = {};
export const Fullscreen: Story = {
  args: { fullscreen: true },
  render: () => {
    return (
      <div>
        <h1 style={{ color: 'black' }}>COntent</h1>
        <LoadingComponent fullscreen spinning />
      </div>
    );
  }
};
