import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../button';
import Box from '../box';
import useTheme from '../../hooks/use-theme';

const meta = {
  title: 'Examples/DarkMode'
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  render: () => {
    const { setTheme } = useTheme();
    return (
      <Box variant="page-content">
        <h1>HELLO</h1>
        <Button color="danger" variant="text" onClick={() => setTheme('system')}>
          System
        </Button>
        <Button onClick={() => setTheme('light')}>Light</Button>
        <Button onClick={() => setTheme('dark')}>Dark</Button>
      </Box>
    );
  }
};
