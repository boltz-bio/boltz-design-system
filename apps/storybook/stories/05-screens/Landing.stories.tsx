import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, Button, TextButton, SectionHeader,
  PrimaryHero, Footer,
  Accordion, AccordionItem, AccordionActions, Badge,
  BlogThumbnail, AboutNews, PlatformFeatureSection, CommunitySection,
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
  <div className="absolute right-0 top-1/2 w-[820px] max-w-[64vw] -translate-y-1/2 laptop:translate-x-[8%]">
    <img src="/hero-protein.png" alt="Boltz protein render" className="w-full h-auto" />
  </div>
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

// Feature-card icons render in CardSmall's 56px slot. Match the canonical spec
// used by the PlatformFeatureSection story (48×48, strokeWidth 1) so the feature
// cells look identical wherever the section is used.
const iconLg = { width: 48, height: 48, strokeWidth: 1 } as const;
const platformFeatures = [
  { icon: <Code {...iconLg} />, title: 'Powerful APIs' },
  { icon: <Flash {...iconLg} />, title: 'Blazing fast inference' },
  { icon: <Lock {...iconLg} />, title: 'Secure deployment' },
  { icon: <Settings {...iconLg} />, title: 'Fine-tuning' },
];

const communityStats = [
  { value: '1M+', label: 'scientists worldwide' },
  { value: '6,000+', label: 'GitHub stars' },
  { value: 'Top 20', label: 'pharma companies' },
  { value: '200+', label: 'active integrations' },
];

const communityCaseStudies = [
  {
    logo: <span className="text-body-lg text-text-on-dark italic font-semibold">Pfizer</span>,
    heading: 'How Pfizer scientists are using Boltz’s platform across large and small molecule discovery.',
    cta: 'Read more',
    image: <img src="/brand/people-2.jpg" alt="Boltz scientist" className="w-full h-full object-cover" />,
  },
];

const communityCtas = [
  { title: 'Partner with us', body: 'We partner with pioneering teams to tackle the most challenging problems in drug discovery. Reach out to explore how we can accelerate your research.', cta: 'Get in touch' },
  { title: 'Join our team', body: 'We’re building a world-class team to push the boundaries of AI-driven drug discovery. See our open positions and help shape the future of medicine.', cta: 'View open roles' },
];

const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

export const Landing: Story = {
  render: () => (
    <div className="bg-white">
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

        {/* About + blog-post list (Figma Frame 3466207) — the purpose-built
            AboutNews section: left copy, right landscape news list with dividers
            between posts, and a CTA. */}
        <AboutNews
          eyebrowIcon={<Leaf {...sz} />}
          heading="Boltz is a frontier research lab building generative models for biology and chemistry."
          body={
            <div className="flex flex-col gap-md">
              <p>
                Our models are used by millions of scientists across biopharma, agriculture, and
                consumer products, and form the foundation of modern R&amp;D.
              </p>
              <p>
                We founded Boltz PBC to advance the open frontier and build powerful new primitives
                for science.
              </p>
            </div>
          }
          items={blogPosts.map((p) => ({
            title: p.title,
            category: 'Product',
            date: 'Feb 10, 2026',
            cover: <BlogThumbnail {...p.cover} />,
          }))}
          cta="View all blog posts"
        />

        {/* Our models — protein render + accordion (Figma 57:2513 accordion variant) */}
        <section className="py-section bg-tierra-100">
          <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-2xl">
            <SectionHeader
              eyebrowIcon={<ViewGrid {...sz} />}
              eyebrow="Our models"
              title="We’re creating top models for all molecule sizes."
              titleClassName="max-w-[18ch]"
              action={<Button variant="black">View all models</Button>}
            />

            <div className="grid grid-cols-1 gap-2xl laptop:grid-cols-2 items-center">
              {/* Full, uncropped molecule render (breathing room on all sides) —
                  render-a.png is edge-cropped, so use the binder render here. */}
              <img src="/Small Molecule - Binder 01 - V2 1.png" alt="Boltz protein render" className="w-full max-w-[460px] mx-auto" />
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

        {/* Platform — dark feature card + feature cells (04-Sections/PlatformFeatureSection) */}
        <PlatformFeatureSection
          eyebrowIcon={<Code {...sz} />}
          heading="A flexible platform for end-to-end molecular design, powered by frontier models, pipelines and compute — shaped for every organization."
          body="The Boltz Platform brings together frontier AI models and intelligent agents to accelerate drug discovery — from hit identification to lead optimization."
          media={<img src="/platform laptop.png" alt="Boltz Platform dashboard" className="absolute inset-0 w-full h-full object-cover object-left" />}
          features={platformFeatures}
        />

        {/* Community — case study + stats + CTA rows, all on sage-pale
            (04-Sections/CommunitySection). Replaces the old hand-rolled case card,
            StatBand and the closing CTAs that sat on the wrong (white) background. */}
        <CommunitySection
          eyebrowIcon={<Community {...sz} />}
          heading="Boltz models are used by over 1M scientists across pharma, biotech, agriculture, and academia."
          caseStudies={communityCaseStudies}
          stats={communityStats}
          ctas={communityCtas}
        />
      </main>

      <Footer columns={footerColumns} />
    </div>
  ),
};
