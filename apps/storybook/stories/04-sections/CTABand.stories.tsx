import type { Meta, StoryObj } from '@storybook/react-vite';
import { CTABand } from '@boltz/ui';
import { Code } from 'iconoir-react';

const meta = {
  title: '04-Sections/CTABand',
  component: CTABand,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-width call-to-action band. Wraps a single CardWide in the standard section container and vertical rhythm. Use once per page to drive the primary action.',
      },
    },
  },
} satisfies Meta<typeof CTABand>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

export const Default: Story = {
  args: {
    eyebrowIcon: <Code {...sz} />,
    eyebrowLabel: 'For developers',
    heading: 'A foundation, not a paper.',
    body: 'High-performance infrastructure built for biomolecular design teams.',
    cta: 'Get early access',
  },
};

const ImagePlaceholder = () => (
  <div className="h-full w-full bg-sage-dark flex items-center justify-center">
    <span className="text-body-sm text-white/55">Protein render</span>
  </div>
);

export const WithImage: Story = {
  args: {
    eyebrowIcon: <Code {...sz} />,
    eyebrowLabel: 'For developers',
    heading: 'A foundation, not a paper.',
    body: 'High-performance infrastructure built for biomolecular design teams.',
    cta: 'Get early access',
    image: <ImagePlaceholder />,
  },
};
