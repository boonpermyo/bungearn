import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Modal from '../modal';
import Button from '../button';

const meta = {
  title: 'Components/Modal',
  component: Modal
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => setOpen(false)}
          title="Sample modal"
        >
          <p>Modal content goes here.</p>
        </Modal>
      </>
    );
  }
};
