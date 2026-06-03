import type { Preview } from '@storybook/react-vite';
import '@boltz/tokens/tokens.css';
import '../src/global.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'surface-primary',
      values: [
        { name: 'white', value: '#FFFFFF' },
        { name: 'surface-primary', value: '#FBFAF7' },
        { name: 'surface-secondary', value: '#F0EFEC' },
        { name: 'sage-pale', value: '#EDF7ED' },
        { name: 'sage-light', value: '#D9EED9' },
        { name: 'blue-pale', value: '#EEF6FA' },
        { name: 'tierra-100', value: '#F7F2E9' },
        { name: 'surface-card-dark', value: '#232323' },
      ],
    },
    layout: 'centered',
    options: {
      storySort: {
        order: [
          '01-foundations',
          '02-components',
          ['Button', 'EyebrowLabel', 'NavCta', 'IconContainer', 'Card'],
          '04-sections',
        ],
      },
    },
  },
};

export default preview;
