import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader, Button, TextButton } from '@boltz/ui';
import { ViewGrid } from 'iconoir-react';

const meta = {
  title: '04-Sections/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The recurring section header: an optional eyebrow, a heading, an optional subtitle, and an optional right-aligned action (Button / TextButton / arrow group). Stacks on phone and moves the action to the right from the tablet breakpoint. Use it to top page sections instead of re-declaring the eyebrow + heading + action row each time.',
      },
    },
  },
  argTypes: {
    titleSize: { control: 'select', options: ['lg', 'md', 'sm'] },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

export const Default: Story = {
  args: {
    eyebrowIcon: <ViewGrid {...sz} />,
    eyebrow: 'Our models',
    title: 'We’re creating top models for all molecule sizes.',
    titleClassName: 'max-w-[18ch]',
    action: <Button variant="black">View all models</Button>,
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'A flexible platform for end-to-end molecular design.',
  },
};

export const WithSubtitle: Story = {
  args: {
    eyebrowIcon: <ViewGrid {...sz} />,
    eyebrow: 'Platform',
    title: 'Built for production biomolecular AI.',
    subtitle: 'Frontier models, low-latency APIs, and managed infrastructure — shaped for every organization.',
    action: <TextButton arrow>Learn more</TextButton>,
  },
};

export const LargeTitle: Story = {
  args: {
    eyebrow: 'Community',
    title: 'Boltz models are used by over 1M scientists worldwide.',
    titleSize: 'lg',
    titleClassName: 'max-w-[24ch]',
  },
};
