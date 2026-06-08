import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, Button, EyebrowLabel, ListItem,
  PrimaryHero, AboutNews, BlogThumbnail, SplitSection,
  CardMedium, PricingSection, CommunitySection, Footer,
  Blob, BLOB_COUNT,
} from '@boltz/ui';
import {
  Leaf, Code, Community, ShieldCheck, Lock, ServerConnection,
  CodeBrackets, DashboardSpeed, Settings, Cpu, Packages,
} from 'iconoir-react';
import { navItems } from '../_data/boltz';

// Platform marketing page — Figma "Platform - v2", node 57:3935.
// Assembled exclusively from existing @boltz/ui section components.

const meta = {
  title: '05-Screens/Platform',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'The Boltz Platform landing page (Figma 57:3935): dark hero, AboutNews, PlatformFeatureSection, security FeatureGrid, PricingSection, CommunitySection, and Footer.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz     = { width: 14, height: 14, strokeWidth: 1.5 } as const;
const iconSz = { width: 28, height: 28, strokeWidth: 1.5 } as const;
const pricingIco = { width: 48, height: 48, strokeWidth: 1 } as const;

const PROTEIN = '/render-a.png';

// ── Hero media — dashboard screenshot bleeding off bottom-right ───────────────
const DashboardBleed = () => (
  <>
    <Blob shape={BLOB_COUNT - 1} aria-hidden className="absolute -top-[25%] right-0 h-auto w-[88%] translate-x-[16%] opacity-[0.14] text-white" />
    {/* Sized to stay clear of the max-w-[600px] text column at every width:
        small on phone/tablet, larger from laptop. (Was 72vw → overlapped the heading.) */}
    <div className="absolute bottom-0 right-0 w-[1000px] max-w-[38vw] laptop:max-w-[50vw] translate-x-[8%]">
      <img src="/platform laptop.png" alt="Boltz Platform dashboard" className="w-full h-auto select-none" />
    </div>
  </>
);

// ── AboutNews data — recent product announcements ────────────────────────────
const newsItems = [
  {
    title: 'Announcing Boltz',
    category: 'Product',
    date: 'Feb 10, 2026',
    cover: <BlogThumbnail tone="sage" category="product-launch" title="Boltz-prot-1" renderSrc={PROTEIN} blobShape={8} className="h-[174px]" />,
  },
  {
    title: 'Announcing Boltz Lab and our first agents',
    category: 'Product',
    date: 'Feb 10, 2026',
    cover: <BlogThumbnail tone="blue" category="product-launch" title="Boltz Lab" renderSrc={PROTEIN} blobShape={11} className="h-[174px]" />,
  },
  {
    title: 'The future we are building at Boltz',
    category: 'Product',
    date: 'Feb 10, 2026',
    cover: <BlogThumbnail tone="tierra" align="center" titlePosition="center" title="The future we are building at Boltz" blobShape={5} className="h-[174px]" />,
  },
];

// ── PricingSection tabs ───────────────────────────────────────────────────────
const pricingTabs = [
  {
    icon: <Leaf {...pricingIco} />,
    title: 'Single prediction',
    body: 'On-demand inference, billed per call.',
    header: { label: 'Per call', value: '$0.04' },
    items: [
      { label: 'Boltz API',       cost: { display: '$0.04',  value: 0.04  } },
      { label: 'Self-hosted GPU', cost: { display: '$0.21',  value: 0.21  } },
      { label: 'Legacy pipeline', cost: { display: '$0.38',  value: 0.38  } },
    ],
  },
  {
    icon: <Code {...pricingIco} />,
    title: 'Batch screening',
    body: 'High-throughput jobs across a compound library.',
    header: { label: 'Per 10k', value: '$320' },
    items: [
      { label: 'Boltz API',       cost: { display: '$320',   value: 320   } },
      { label: 'Self-hosted GPU', cost: { display: '$1,450', value: 1450  } },
      { label: 'Legacy pipeline', cost: { display: '$2,700', value: 2700  } },
    ],
  },
];

// ── CommunitySection data ─────────────────────────────────────────────────────
const communityStats = [
  { value: '8M+',    label: 'scientists worldwide' },
  { value: '6,000+', label: 'GitHub stars' },
  { value: 'Top 20', label: 'pharma companies' },
  { value: '200+',   label: 'active integrations' },
];

const PfizerLogo = () => (
  <svg height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Pfizer">
    <text y="24" fontFamily="sans-serif" fontSize="22" fontWeight="700" fill="white">Pfizer</text>
  </svg>
);

const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

export const Platform: Story = {
  render: () => (
    <div className="bg-white">
      <NavBar tone="dark">
        {navItems.map((n) => (
          <NavLink key={n} href="#" active={n === 'Platform'}>{n}</NavLink>
        ))}
      </NavBar>

      <main className="-mt-60">
        {/* 1 — Hero */}
        <PrimaryHero
          tone="dark"
          heading="Streamlined molecular design platform for all organizations."
          body="A flexible platform for end-to-end molecular design, powered by frontier models, pipelines and compute — shaped for every organization."
          actions={<Button variant="white">Get early access</Button>}
          media={<DashboardBleed />}
        />

        {/* 2 — About + recent news */}
        <AboutNews
          eyebrow="About us"
          eyebrowIcon={<Community {...sz} />}
          heading="Boltz is a frontier research lab building generative models for biology and chemistry"
          body={
            <>
              <p>Our models are used by millions of scientists across biopharma, agriculture and consumer products and form the foundation of modern R&D.</p>
              <p className="mt-md">We founded Boltz PBC to advance the open frontier and build powerful new primitives for science.</p>
            </>
          }
          items={newsItems}
          cta="View all blog posts"
        />

        {/* 3 — Products section */}
        <SplitSection
          background="none"
          className="bg-tierra-50"
          mediaPosition="right"
          align="start"
          content={
            <>
              <EyebrowLabel icon={<Packages {...sz} />}>Products</EyebrowLabel>
              <h2 className="text-heading-md text-text-primary">
                One Powerful Platform for End-to-End Molecular Design &amp; Discovery
              </h2>
              <div className="flex flex-col gap-lg mt-sm">
                <ListItem icon={<CodeBrackets {...iconSz} />} heading="Frontier Models" description="Get early access to our latest models and pipelines for molecular design" />
                <ListItem icon={<DashboardSpeed {...iconSz} />} heading="Blazing Fast Inference" description="Run jobs on our massively parallel cluster or deploy securely on your VPC" />
                <ListItem icon={<Settings {...iconSz} />} heading="Deep Integration" description="Customize models on your data and integrate pipelines deep into your experimental workflows so they work for you." />
              </div>
            </>
          }
          media={
            <img
              src="/boltz-protein.png"
              alt="Boltz protein render"
              className="w-full h-auto select-none"
            />
          }
        />

        {/* 4 — Security */}
        <section className="w-full py-2xl bg-sage-pale">
          <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-xl">
            <div className="flex flex-col gap-md">
              <EyebrowLabel icon={<ShieldCheck {...sz} />}>Security</EyebrowLabel>
              <h2 className="text-heading-md text-text-primary max-w-[720px]">
                Built for the biggest enterprise and the most sensitive applications
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-sm tablet:grid-cols-3">
              <CardMedium
                color="sage-dark"
                heading="Data Security"
                body="A set of enterprise-grade REST APIs with built-in security and data privacy for integrating Boltz models into your products."
              />
              <CardMedium
                color="sage-medium"
                heading="IP & Ownership"
                body="You own everything you create. We never claim rights to your research outputs or molecular designs."
              />
              <CardMedium
                color="sage-light"
                heading="Privacy"
                body="Deploy in your VPC or fully on-premise. Complete data residency control for regulated workloads."
              />
            </div>
          </div>
        </section>

        {/* 5 — Pricing */}
        <PricingSection
          eyebrow="Pricing"
          eyebrowIcon={<Code {...sz} />}
          heading="Our API is the best place to run Boltz models at drug development scale"
          tabs={pricingTabs}
        />

        {/* 6 — Community */}
        <CommunitySection
          eyebrowIcon={<Community {...sz} />}
          eyebrow="Community"
          heading="Boltz models are used by over 8M scientists spanning biotech, biopharma, agriculture, and academia"
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
          stats={communityStats}
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
      </main>

      <Footer columns={footerColumns} />
    </div>
  ),
};
