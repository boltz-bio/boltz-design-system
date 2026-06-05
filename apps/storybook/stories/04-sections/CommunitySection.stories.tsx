import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommunitySection } from '@boltz/ui';
import * as AllIcons from 'iconoir-react';

const meta = {
  title: '04-Sections/CommunitySection',
  component: CommunitySection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'sage-pale section with eyebrow + heading, a case study card, stats strip, and two CTA rows for partnerships and careers.',
      },
    },
  },
} satisfies Meta<typeof CommunitySection>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const PfizerLogo = () => (
  <svg height="32" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Pfizer">
    <text y="24" fontFamily="sans-serif" fontSize="22" fontWeight="700" fill="white">Pfizer</text>
  </svg>
);

export const Default: Story = {
  render: () => (
    <CommunitySection
      eyebrowIcon={<AllIcons.Community {...sz} />}
      eyebrow="Community"
      heading="Boltz models are used by over 1M scientists across pharma, biotech, agriculture, and academia"
      caseStudies={[
        {
          logo: <PfizerLogo />,
          heading: "How Pfizer scientists are using Boltz's platform across large and small molecule discovery",
          cta: 'Read more',
          image: (
            <img
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80"
              alt="Lab scientist"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          ),
        },
      ]}
      stats={[
        { value: '1M+',    label: 'scientists worldwide' },
        { value: '6,000+', label: 'GitHub stars' },
        { value: 'Top 20', label: 'pharma companies' },
        { value: '200+',   label: 'active integrations' },
      ]}
      ctas={[
        {
          title: 'Partner with us',
          body: 'We partner with pioneering teams to tackle the most challenging problems in drug discovery. Reach out to explore how we can accelerate your research.',
          cta: 'Get in touch',
        },
        {
          title: 'Join our team',
          body: "We're building a world-class team to push the boundaries of AI-driven drug discovery. See our open positions and help us shape the future of medicine.",
          cta: 'View open roles',
        },
      ]}
    />
  ),
};
