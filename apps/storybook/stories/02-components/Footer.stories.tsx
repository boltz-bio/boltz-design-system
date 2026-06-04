import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from '@boltz/ui';

const meta = {
  title: '02-Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The page footer (Figma 58:400): the Boltz wordmark beside plain link columns over a subtle organic stroke pattern. Renders default Boltz links, or pass `columns` to compose your own. Use once at the bottom of a page.',
      },
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Footer />,
};

export const CustomLinks: Story = {
  render: () => (
    <Footer
      columns={[
        {
          links: [
            { label: 'Platform', href: '#' },
            { label: 'API', href: '#' },
            { label: 'Pricing', href: '#' },
            { label: 'Legal', href: '#' },
          ],
        },
        {
          links: [
            { label: 'GitHub', href: '#' },
            { label: 'LinkedIn', href: '#' },
            { label: 'Twitter', href: '#' },
            { label: 'Slack', href: '#' },
          ],
        },
      ]}
    />
  ),
};

export const WithHeadings: Story = {
  render: () => (
    <Footer
      columns={[
        {
          heading: 'Company',
          links: [
            { label: 'Career',  href: '#' },
            { label: 'News',    href: '#' },
            { label: 'Pricing', href: '#' },
            { label: 'Legal',   href: '#' },
          ],
        },
        {
          heading: 'Community',
          links: [
            { label: 'GitHub',   href: '#' },
            { label: 'LinkedIn', href: '#' },
            { label: 'Slack',    href: '#' },
          ],
        },
      ]}
    />
  ),
};
