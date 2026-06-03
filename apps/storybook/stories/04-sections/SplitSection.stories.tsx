import type { Meta, StoryObj } from '@storybook/react-vite';
import { SplitSection, EyebrowLabel, Button, TextButton } from '@boltz/ui';
import { Code } from 'iconoir-react';

const meta = {
  title: '04-Sections/SplitSection',
  component: SplitSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The flexible text-and-media split band that most content sections build on. Configure where the media sits (left, right, above, below), whether the band is contained or fluid, and its background surface. Stacks on mobile and splits at the laptop breakpoint.',
      },
    },
  },
  argTypes: {
    mediaPosition: { control: 'select', options: ['left', 'right', 'above', 'below'] },
    width: { control: 'select', options: ['contained', 'fluid'] },
    background: { control: 'select', options: ['none', 'secondary', 'sage-pale', 'blue-pale', 'tierra-100', 'dark'] },
    align: { control: 'select', options: ['start', 'center'] },
  },
} satisfies Meta<typeof SplitSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const Media = () => (
  <div className="w-full max-w-[460px] aspect-square rounded-lg bg-sage-pale border border-sage-medium flex items-center justify-center">
    <span className="text-body-sm text-text-muted">Media slot</span>
  </div>
);

const Content = () => (
  <>
    <EyebrowLabel icon={<Code {...sz} />}>Platform</EyebrowLabel>
    <h2 className="text-heading-md text-text-primary">A foundation, not a paper.</h2>
    <p className="text-body-lg text-text-secondary max-w-body">
      High-performance infrastructure built for biomolecular design teams.
    </p>
    <div className="flex gap-md mt-md">
      <Button variant="black">Get early access</Button>
      <TextButton arrow>Read the docs</TextButton>
    </div>
  </>
);

export const MediaRight: Story = {
  args: { mediaPosition: 'right', width: 'contained', background: 'none', content: <Content />, media: <Media /> },
};

export const MediaLeft: Story = {
  args: { mediaPosition: 'left', width: 'contained', background: 'sage-pale', content: <Content />, media: <Media /> },
};

export const MediaAbove: Story = {
  args: { mediaPosition: 'above', width: 'contained', background: 'none', content: <Content />, media: <Media /> },
};

export const TextOnly: Story = {
  args: { width: 'contained', background: 'secondary', content: <Content /> },
};
