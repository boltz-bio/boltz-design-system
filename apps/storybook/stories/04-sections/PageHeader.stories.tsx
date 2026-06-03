import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageHeader } from '@boltz/ui';
import * as AllIcons from 'iconoir-react';

const meta = {
  title: '04-Sections/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-width band that opens a content page with an eyebrow label, an h1 headline, and optional lead copy. Use it as the title block of a News, Docs, or marketing page.',
      },
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

export const Default: Story = {
  args: {
    eyebrow: 'News',
    eyebrowIcon: <AllIcons.Leaf {...sz} />,
    heading: 'Research, product & community.',
    body:
      'The latest from the Boltz team — model releases, platform updates, and stories from the scientists building on top of our infrastructure.',
  },
};

export const HeadingOnly: Story = {
  name: 'Heading only',
  args: {
    eyebrow: 'News',
    eyebrowIcon: <AllIcons.Leaf {...sz} />,
    heading: 'Research, product & community.',
  },
};
