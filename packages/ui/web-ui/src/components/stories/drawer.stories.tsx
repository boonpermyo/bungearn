import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Drawer from '../drawer';
import Button from '../button';

const meta = {
  title: 'Components/Drawer',
  component: Drawer
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Drawer title"
          placement="right"
        >
          <p>Drawer content goes here.</p>
          <p>You can place forms, lists, or other components inside.</p>
        </Drawer>
      </>
    );
  }
};
