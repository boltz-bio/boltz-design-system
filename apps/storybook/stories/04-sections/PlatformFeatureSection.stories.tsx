import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlatformFeatureSection } from '@boltz/ui';
import * as AllIcons from 'iconoir-react';

const meta = {
  title: '04-Sections/PlatformFeatureSection',
  component: PlatformFeatureSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A black hero card (eyebrow + heading + body + media) stacked above a 4-column row of blue-pale feature cards. 8px gap throughout.',
      },
    },
  },
} satisfies Meta<typeof PlatformFeatureSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;
const iconSz = { width: 48, height: 48, strokeWidth: 1 } as const;

export const Default: StoryObj = {
  render: () => (
    <PlatformFeatureSection
      eyebrowIcon={<AllIcons.Cpu {...sz} />}
      eyebrow="Platform"
      heading="A flexible platform for end-to-end molecular design, powered by frontier models, pipelines and compute — shaped for every organization"
      body="The Boltz Platform brings together frontier AI models and intelligent agents to accelerate drug discovery — from hit identification to lead optimization."
      media={
        <img
          src="/platform laptop.png"
          alt="Boltz platform"
          className="absolute inset-0 w-full h-full object-cover object-left"
        />
      }
      features={[
        { icon: <AllIcons.CodeBrackets {...iconSz} />, title: 'Powerful APIs' },
        { icon: <AllIcons.DashboardSpeed {...iconSz} />, title: 'Blazing Fast Inference' },
        { icon: <AllIcons.Lock {...iconSz} />,         title: 'Secure Deployment' },
        { icon: <AllIcons.Settings {...iconSz} />,     title: 'Fine-Tuning' },
      ]}
    />
  ),
};
