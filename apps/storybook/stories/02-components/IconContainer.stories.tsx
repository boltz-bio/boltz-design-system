import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconContainer } from '@boltz/ui';

const meta = {
  title: '02-Components/IconContainer',
  component: IconContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fixed-size rounded container that frames a single icon with consistent padding. Use it to give icons a uniform shape across light and dark surfaces.',
      },
    },
  },
  argTypes: { variant: { control: 'select', options: ['light', 'dark'] } },
} satisfies Meta<typeof IconContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const Hexagon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
  </svg>
);

export const Light: Story = {
  args: { variant: 'light', children: <Hexagon /> },
};

export const Dark: Story = {
  args: { variant: 'dark', children: <Hexagon /> },
  parameters: { backgrounds: { default: 'surface-card-dark' } },
};
