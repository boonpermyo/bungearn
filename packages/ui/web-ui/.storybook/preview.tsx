import type { Preview } from '@storybook/react-vite';
import 'antd/dist/reset.css';
import '../src/styles/index.css';
import { UIProvider } from '../src';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  decorators: [
    (Story) => {
      return (
        <UIProvider
          globalTokenConfig={{
            borderRadius: 8,
            fontSize: 14,
            colorSuccess: '#00b164',
            colorWarning: '#c7942d',
            colorError: '#db4b4b',
            colorPrimary: '#00b164',
            colorInfo: '#00b164'
          }}
        >
          <Story />
        </UIProvider>
      );
    }
  ]
};

export default preview;
