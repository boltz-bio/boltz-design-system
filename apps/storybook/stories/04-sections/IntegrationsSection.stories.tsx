import type { Meta, StoryObj } from '@storybook/react-vite';
import { IntegrationsSection } from '@boltz/ui';
import * as AllIcons from 'iconoir-react';

const meta = {
  title: '04-Sections/IntegrationsSection',
  component: IntegrationsSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'White section with eyebrow + heading-sm copy + CTAs on the left, and a 2-column grid of partner integration tiles on the right.',
      },
    },
  },
} satisfies Meta<typeof IntegrationsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const DESC = 'Call Boltz models from your favorite agents';

export const Default: Story = {
  render: () => (
    <IntegrationsSection
      eyebrowIcon={<AllIcons.Puzzle {...sz} />}
      eyebrow="Integrations"
      heading="We've partnered with the leading life science software companies, agentic startups and AI labs so that you can run Boltz models from wherever you work today"
      cta="Get access"
      secondaryCta="See all the Integrations"
      integrations={[
        { iconBg: 'bg-[#d77655]',  name: 'Claude Code',       description: DESC },
        { iconBg: 'bg-surface-secondary', name: 'OpenAI Codex',      description: DESC },
        { iconBg: 'bg-[#000cb5]',  name: 'Benchling',         description: DESC },
        { iconBg: 'bg-[#f2f1e7]',  name: 'Biomni IBE',        description: DESC },
        { iconBg: 'bg-surface-secondary', name: 'Edison Scientific', description: DESC },
        { iconBg: 'bg-[#f2f2f2]',  name: 'Mirror Physics',    description: DESC },
      ]}
    />
  ),
};
