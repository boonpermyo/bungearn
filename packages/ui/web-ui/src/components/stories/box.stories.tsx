import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '../box';

const meta = {
  title: 'Components/Box',
  component: Box
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof Box>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '12px' }}>
      <Box variant="plain" style={{ border: '1px dashed #ccc' }}>
        Plain box content
      </Box>
      <Box variant="page-content" style={{ border: '1px dashed #ccc' }}>
        Page-content box with padding
      </Box>
    </div>
  )
};
