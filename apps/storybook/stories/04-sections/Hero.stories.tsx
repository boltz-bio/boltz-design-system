import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero, Button, TextButton } from '@boltz/ui';
import { Leaf } from 'iconoir-react';

const meta = {
  title: '04-Sections/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The page hero: eyebrow, headline, lead copy, action row, and an optional media slot. Built on SplitSection, so it stacks on mobile and splits on laptop. Use once near the top of a page.',
      },
    },
  },
  argTypes: {
    mediaPosition: { control: 'select', options: ['left', 'right', 'above', 'below'] },
    background: { control: 'select', options: ['none', 'secondary', 'sage-pale', 'blue-pale', 'tierra-100', 'dark'] },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const ProteinPlaceholder = () => (
  <div className="h-[280px] w-[280px] tablet:h-[460px] tablet:w-[460px] rounded-full bg-sage-pale border border-sage-medium flex items-center justify-center">
    <span className="text-body-sm text-text-muted">Protein render</span>
  </div>
);

export const Default: Story = {
  args: {
    eyebrow: 'Build on Boltz',
    eyebrowIcon: <Leaf {...sz} />,
    heading: 'Frontier models for biomolecular design.',
    body: 'State-of-the-art structure prediction, served as production-ready infrastructure. Built to integrate.',
    actions: (
      <>
        <Button variant="black">Try Boltz Lab</Button>
        <TextButton arrow>Read the paper</TextButton>
      </>
    ),
    media: <ProteinPlaceholder />,
  },
};

export const TextOnly: Story = {
  args: {
    eyebrow: 'Build on Boltz',
    eyebrowIcon: <Leaf {...sz} />,
    heading: 'Frontier models for biomolecular design.',
    body: 'State-of-the-art structure prediction, served as production-ready infrastructure.',
    actions: <Button variant="black">Try Boltz Lab</Button>,
  },
};
