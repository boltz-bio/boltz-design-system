import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageHeader } from '@boltz/ui';

const meta = {
  title: '04-Sections/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-width band that opens a content page with an h1 headline and optional lead copy. Use it as the title block of a News, Docs, or marketing page.',
      },
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'Research, product & community.',
    body:
      'The latest from the Boltz team — model releases, platform updates, and stories from the scientists building on top of our infrastructure.',
  },
};

export const HeadingOnly: Story = {
  name: 'Heading only',
  args: {
    heading: 'Research, product & community.',
  },
};
