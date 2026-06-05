import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, EyebrowLabel, Button, TextButton,
  PrimaryHero, StatBand, Footer, Blob, BLOB_COUNT,
  Accordion, AccordionItem, AccordionActions, Badge,
  NewsItem, BlogThumbnail, IconContainer, Thumbnail,
} from '@boltz/ui';
import { Leaf, Community, ViewGrid, Code, Flash, Lock, Settings } from 'iconoir-react';
import { navItems } from '../_data/boltz';

// Example landing page — mirrors Figma "Landing page 1" (57:2079): a sage hero,
// an intro + blog-post list, the models accordion beside a protein render, a dark
// platform card with feature cells, a community band (case card + StatBand), and
// two closing CTA rows. Assembled entirely from @boltz/ui sections.

const meta = {
  title: '05-Screens/Landing',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'A full landing page mirroring Figma 57:2079, assembled from Hero, the blog-post list, the models accordion, a dark platform feature card, the community StatBand, and CTA rows.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;
const PROTEIN = '/render-a.png';

// Primary-hero media: a large solid library blob spanning the band + the protein
// render bleeding off the right (see 04-Sections/Hero → Primary hero — Landing).
const HeroProteinBleed = () => (
  <>
    <Blob shape={BLOB_COUNT - 1} aria-hidden className="absolute -top-[28%] right-0 h-auto w-[92%] translate-x-[16%] opacity-40 text-sage-medium" />
    <div className="absolute right-0 top-1/2 w-[820px] max-w-[64vw] -translate-y-1/2 laptop:translate-x-[8%]">
      <img src="/hero-protein.png" alt="Boltz protein render" className="w-full h-auto" />
    </div>
  </>
);

// Blog list (intro section, right column).
const blogPosts = [
  { id: 'b1', title: 'Announcing Boltz', cover: { tone: 'sage', category: 'product-launch', title: 'Boltz-prot-1', renderSrc: PROTEIN, blobShape: 8 } as const },
  { id: 'b2', title: 'Announcing Boltz Lab and our first agents', cover: { tone: 'blue', category: 'product-launch', title: 'Boltz Lab', renderSrc: PROTEIN, blobShape: 11 } as const },
  { id: 'b3', title: 'The future we are building at Boltz', cover: { tone: 'tierra', align: 'center', titlePosition: 'center', title: 'The future we are building at Boltz', blobShape: 5 } as const },
];

const models = [
  { id: 'm1', name: 'BoltzMol 1.1', badge: 'Beta', body: 'A step change in small-molecule screening and hit discovery — 10× faster than the previous SOTA at 100× lower cost.', primary: true },
  { id: 'm2', name: 'BoltzProt 1.1', badge: 'Beta', body: 'State-of-the-art protein structure prediction, exceeding AlphaFold2 GDT_TS on novel folds.' },
  { id: 'm3', name: 'Boltz-2', badge: 'MIT', body: 'Open foundation model for biomolecular structure, weights and benchmarks shared with the community.' },
];

const platformFeatures = [
  { icon: <Code {...sz} />, label: 'Powerful APIs' },
  { icon: <Flash {...sz} />, label: 'Blazing fast inference' },
  { icon: <Lock {...sz} />, label: 'Secure deployment' },
  { icon: <Settings {...sz} />, label: 'Fine-tuning' },
];

const communityStats = [
  { value: '1M+', label: 'scientists worldwide' },
  { value: '6,000+', label: 'GitHub stars' },
  { value: 'Top 20', label: 'pharma companies' },
  { value: '200+', label: 'active integrations' },
];

const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

export const Landing: Story = {
  render: () => (
    <div className="bg-surface-primary">
      <NavBar>
        {navItems.map((n) => <NavLink key={n} href="#">{n}</NavLink>)}
      </NavBar>

      <main className="-mt-60">
        <PrimaryHero
          tone="sage"
          heading="Foundational AI for Biology and Chemistry"
          body="Frontier models and high-performance compute for designing all of life's molecules."
          actions={<Button variant="black">Start building with Boltz</Button>}
          media={<HeroProteinBleed />}
        />

        {/* Intro + blog-post list (Figma Frame 3466207) */}
        <section className="py-section">
          <div className="max-w-container mx-auto px-md tablet:px-40 grid grid-cols-1 gap-2xl laptop:grid-cols-2">
            <div className="flex flex-col gap-lg">
              <EyebrowLabel icon={<Leaf {...sz} />}>About us</EyebrowLabel>
              <h2 className="text-heading-md text-text-primary max-w-[20ch]">
                Boltz is a frontier research lab building generative models for biology and chemistry.
              </h2>
              <p className="text-body-md text-text-secondary max-w-body">
                Our models are used by millions of scientists across biopharma, agriculture, and
                consumer products, and form the foundation of modern R&amp;D.
              </p>
              <p className="text-body-md text-text-secondary max-w-body">
                We founded Boltz PBC to advance the open frontier and build powerful new primitives
                for science.
              </p>
            </div>

            <div className="flex flex-col gap-lg">
              {blogPosts.map((p) => (
                <NewsItem
                  key={p.id}
                  variant="landscape"
                  title={p.title}
                  category="Product"
                  date="Feb 10, 2026"
                  cover={<BlogThumbnail {...p.cover} />}
                />
              ))}
              <TextButton arrow>View all blog posts</TextButton>
            </div>
          </div>
        </section>

        {/* Our models — protein render + accordion (Figma 57:2513 accordion variant) */}
        <section className="py-section bg-tierra-100">
          <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-2xl">
            <div className="flex items-end justify-between gap-lg">
              <div className="flex flex-col gap-md">
                <EyebrowLabel icon={<ViewGrid {...sz} />}>Our models</EyebrowLabel>
                <h2 className="text-heading-lg text-text-primary max-w-[18ch]">
                  We&rsquo;re creating top models for all molecule sizes.
                </h2>
              </div>
              <TextButton arrow>View all models</TextButton>
            </div>

            <div className="grid grid-cols-1 gap-2xl laptop:grid-cols-2 items-center">
              <img src={PROTEIN} alt="Boltz protein render" className="w-full max-w-[420px] mx-auto" />
              <Accordion type="single" collapsible defaultValue={models[0].id}>
                {models.map((m) => (
                  <AccordionItem key={m.id} value={m.id} title={m.name} badge={<Badge variant="primary">{m.badge}</Badge>}>
                    <p className="text-body-md text-text-secondary">{m.body}</p>
                    {m.primary && (
                      <AccordionActions>
                        <Button variant="black">Get access</Button>
                        <TextButton arrow>Read technical report</TextButton>
                      </AccordionActions>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Platform — dark feature card + feature cells */}
        <section className="py-section">
          <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-lg">
            <div className="rounded-xl bg-surface-card-dark p-xl tablet:p-2xl flex flex-col gap-xl laptop:flex-row laptop:items-center">
              <div className="flex flex-col gap-md flex-1">
                <EyebrowLabel icon={<Code {...sz} />} className="text-white">Platform</EyebrowLabel>
                <h2 className="text-heading-md text-text-on-dark max-w-[22ch]">
                  A flexible platform for end-to-end molecular design, powered by frontier models,
                  pipelines and compute — shaped for every organization.
                </h2>
                <p className="text-body-md text-white/70 max-w-body">
                  The Boltz Platform brings together frontier AI models and intelligent agents to
                  accelerate drug discovery — from hit identification to lead optimization.
                </p>
              </div>
              <div className="flex-1">
                <Thumbnail tone="blue" radius="lg" aspect="wide" className="w-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-lg laptop:grid-cols-4">
              {platformFeatures.map((f) => (
                <div key={f.label} className="rounded-lg bg-blue-pale p-lg flex flex-col gap-2xl justify-between min-h-[160px]">
                  <IconContainer variant="light">{f.icon}</IconContainer>
                  <span className="text-body-md text-text-primary">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community — case card + photo, then StatBand */}
        <section className="py-section bg-sage-pale">
          <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-2xl">
            <h2 className="text-heading-lg text-text-primary max-w-[24ch]">
              Boltz models are used by over 1M scientists across pharma, biotech, agriculture, and academia.
            </h2>

            <div className="grid grid-cols-1 gap-lg laptop:grid-cols-2">
              <div className="rounded-xl bg-sage-dark p-xl flex flex-col justify-between gap-2xl min-h-[280px]">
                <span className="text-body-lg text-text-on-dark italic font-semibold">Pfizer</span>
                <div className="flex flex-col gap-lg">
                  <p className="text-heading-sm text-text-on-dark max-w-[28ch]">
                    How Pfizer scientists are using Boltz&rsquo;s platform across large and small molecule discovery.
                  </p>
                  <Button variant="white">Read more</Button>
                </div>
              </div>
              <Thumbnail src="/brand/people-2.jpg" alt="Boltz scientist" aspect="wide" radius="lg" className="w-full h-full" />
            </div>

            <StatBand stats={communityStats} className="!py-0" />
          </div>
        </section>

        {/* Closing CTAs */}
        <section className="py-2xl">
          <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col divide-y divide-border-light">
            {[
              { heading: 'Partner with us', body: 'We partner with pioneering teams to tackle the most challenging problems in drug discovery. Reach out to explore how we can accelerate your research.', cta: 'Get in touch' },
              { heading: 'Join our team', body: 'We’re building a world-class team to push the boundaries of AI-driven drug discovery. See our open positions and help shape the future of medicine.', cta: 'View open roles' },
            ].map((row) => (
              <div key={row.heading} className="flex flex-col gap-lg py-xl laptop:flex-row laptop:items-start laptop:justify-between">
                <div className="flex flex-col gap-sm max-w-body">
                  <h3 className="text-heading-sm text-text-primary">{row.heading}</h3>
                  <p className="text-body-md text-text-secondary">{row.body}</p>
                </div>
                <Button variant="black">{row.cta}</Button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer columns={footerColumns} />
    </div>
  ),
};
