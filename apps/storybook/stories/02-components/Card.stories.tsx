import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardSmall, CardMedium, CardWide, CardCaseStudy, CardGroup } from '@boltz/ui';
import type { CardColor } from '@boltz/ui';
import * as AllIcons from 'iconoir-react';
import React from 'react';

const sz = { width: 32, height: 32, strokeWidth: 1.5 } as const;

const meta = {
  title: '02-Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A family of content containers (small, medium, wide, and case study) for presenting models, capabilities, and case studies. Group them with CardGroup using connected spacing for a shared visual block or standalone spacing for independent items.',
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Colour palette ────────────────────────────────────────────────────────────

const SAGE:    CardColor[] = ['sage-dark',  'sage-medium',  'sage-light',  'sage-pale'];
const BLUE:    CardColor[] = ['blue-dark',  'blue-medium',  'blue-light',  'blue-pale'];
const TIERRA:  CardColor[] = ['tierra-500', 'tierra-200',   'tierra-100',  'tierra-50'];

export const ColourPalette: Story = {
  name: 'Colour palette — all variants',
  render: () => (
    <div className="flex flex-col gap-lg max-w-[900px]">

      {/* Black & White */}
      <div>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-sm">Black &amp; White</p>
        <div className="flex gap-md">
          <CardSmall color="black" heading="Black" body="#232323" className="flex-1" />
          <CardSmall color="white" heading="White" body="#FFFFFF" className="flex-1" />
        </div>
      </div>

      {/* Sage */}
      <div>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-sm">Sage family</p>
        <div className="grid grid-cols-4 gap-md">
          {SAGE.map(c => (
            <CardSmall key={c} color={c} heading={c.replace('sage-', 'Sage ')} body={c === 'sage-dark' ? '#003014' : c === 'sage-medium' ? '#C6E5C6' : c === 'sage-light' ? '#D9EED9' : '#EDF7ED'} />
          ))}
        </div>
      </div>

      {/* Blue */}
      <div>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-sm">Blue family</p>
        <div className="grid grid-cols-4 gap-md">
          {BLUE.map(c => (
            <CardSmall key={c} color={c} heading={c.replace('blue-', 'Blue ')} body={c === 'blue-dark' ? '#142D36' : c === 'blue-medium' ? '#C7E3EE' : c === 'blue-light' ? '#E5F2F7' : '#EEF6FA'} />
          ))}
        </div>
      </div>

      {/* Tierra */}
      <div>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-sm">Tierra family</p>
        <div className="grid grid-cols-4 gap-md">
          {TIERRA.map(c => (
            <CardSmall key={c} color={c} heading={c.replace('tierra-', 'Tierra ')} body={c === 'tierra-500' ? '#DACAB0' : c === 'tierra-200' ? '#EEE7DB' : c === 'tierra-100' ? '#F7F2E9' : '#FBFAF7'} />
          ))}
        </div>
      </div>

    </div>
  ),
};

// ── Card stacking gaps ────────────────────────────────────────────────────────

export const StackingGaps: Story = {
  name: 'Stacking gaps — connected vs standalone',
  render: () => (
    <div className="flex flex-col gap-2xl max-w-[900px]">

      <div>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-sm">Connected cards — 8px gap (shared visual group)</p>
        <CardGroup spacing="connected">
          <div className="flex-[2] bg-sage-dark text-text-on-dark rounded-lg p-xl flex flex-col justify-between" style={{minHeight: 220}}>
            <div>
              <h3 className="font-sans font-regular text-heading-md text-text-on-dark mb-md">Data Security</h3>
              <p className="font-sans font-regular text-body-md text-white/55">
                Enterprise-grade REST APIs with built-in security and data privacy for integrating Boltz models into your products.
              </p>
            </div>
          </div>
          <div className="flex-1 bg-sage-medium rounded-lg p-xl flex items-center justify-center">
            <span className="font-sans font-regular text-heading-sm text-text-primary">Privacy</span>
          </div>
          <div className="flex-1 bg-sage-light rounded-lg p-xl flex items-center justify-center">
            <span className="font-sans font-regular text-heading-sm text-text-primary">IP &amp; Ownership</span>
          </div>
        </CardGroup>
      </div>

      <div>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-sm">Standalone cards — 24px gap (independent elements)</p>
        <CardGroup spacing="standalone">
          <div className="flex-1 bg-sage-pale border border-border-light rounded-lg p-xl flex flex-col justify-between" style={{minHeight: 220}}>
            <div>
              <p className="text-body-sm text-text-secondary mb-xl">🅿 Pfizer</p>
              <p className="font-sans font-regular text-body-md text-text-primary" style={{lineHeight:1.4}}>
                How Pfizer scientists are using Boltz's platform across large and small molecule discovery.
              </p>
            </div>
          </div>
          <div className="flex-1 bg-sage-dark rounded-lg p-xl flex flex-col justify-between" style={{minHeight: 220}}>
            <div>
              <p className="text-body-sm text-white/50 mb-xl">dsm-firmenich</p>
              <p className="font-sans font-regular text-body-md text-white/80" style={{lineHeight:1.4}}>
                How DSM Firmenich uses Boltz to discover new olfactory molecules for the world's most luxurious fragrances.
              </p>
            </div>
          </div>
        </CardGroup>
      </div>

    </div>
  ),
};

// ── CardSmall ─────────────────────────────────────────────────────────────────

export const Small: Story = {
  name: 'CardSmall',
  render: () => (
    <div className="flex flex-col gap-lg max-w-[900px]">
      <div>
        <p className="text-body-sm text-text-muted mb-sm">On white → pale variants</p>
        <CardGroup spacing="standalone" className="grid grid-cols-3">
          <CardSmall color="blue-pale" heading="BoltzMol 1.1" body="Small molecule screening and hit discovery." />
          <CardSmall color="sage-pale" heading="BoltzProt 1.1" body="Protein structure prediction at scale." />
          <CardSmall color="tierra-50" heading="BoltzRNA 1.0" body="RNA design and structure prediction." />
        </CardGroup>
      </div>
      <div>
        <p className="text-body-sm text-text-muted mb-sm">With icons</p>
        <CardGroup spacing="standalone" className="grid grid-cols-3">
          <CardSmall color="blue-pale" icon={<AllIcons.Cpu {...sz} />} heading="BoltzMol 1.1" />
          <CardSmall color="sage-pale" icon={<AllIcons.Dna {...sz} />} heading="BoltzProt 1.1" />
          <CardSmall color="tierra-100" icon={<AllIcons.Microscope {...sz} />} heading="BoltzRNA 1.0" />
        </CardGroup>
      </div>
      <div>
        <p className="text-body-sm text-text-muted mb-sm">4+ cards → same colour (connected)</p>
        <CardGroup spacing="connected">
          {(['blue-dark','blue-dark','blue-dark','blue-dark'] as CardColor[]).map((c, i) => (
            <CardSmall key={i} color={c} heading={['BoltzMol','BoltzProt','BoltzRNA','BoltzAb'][i]} body="Frontier model." className="flex-1" />
          ))}
        </CardGroup>
      </div>
    </div>
  ),
};

// ── CardMedium ────────────────────────────────────────────────────────────────

export const Medium: Story = {
  name: 'CardMedium',
  render: () => (
    <div className="flex flex-col gap-lg max-w-[900px]">
      <div>
        <p className="text-body-sm text-text-muted mb-sm">2 per row — different scale, same family (connected)</p>
        <CardGroup spacing="connected">
          <CardMedium color="blue-light" heading="Platform infrastructure" body="Production-ready APIs, model endpoints, and managed infrastructure." cta="Get early access" className="flex-1" />
          <CardMedium color="blue-dark" heading="Research grade models" body="State-of-the-art structure prediction across all molecule classes." cta="Read the paper" className="flex-1" />
        </CardGroup>
      </div>
      <div>
        <p className="text-body-sm text-text-muted mb-sm">3 per row — standalone</p>
        <CardGroup spacing="standalone" className="grid grid-cols-3">
          <CardMedium color="sage-pale" heading="Security" body="Enterprise-grade data privacy for regulated industries." cta="Learn more" />
          <CardMedium color="sage-light" heading="Compliance" body="HIPAA-ready infrastructure, audit trails, role-based access." cta="Learn more" />
          <CardMedium color="sage-dark" heading="Private deployment" body="Deploy on your cloud or on-premise for maximum data control." cta="Learn more" />
        </CardGroup>
      </div>
    </div>
  ),
};

// ── CardWide ──────────────────────────────────────────────────────────────────

const MockVisual = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-sage-dark/80 to-sage-dark flex items-center justify-center">
    <div className="w-4/5 h-4/5 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
      <span className="text-white/30 text-body-sm">Image / visual slot</span>
    </div>
  </div>
);

export const Wide: Story = {
  name: 'CardWide — 1 per row',
  render: () => (
    <div className="flex flex-col gap-lg max-w-container">
      <div>
        <p className="text-body-sm text-text-muted mb-sm">With image</p>
        <CardWide
          eyebrowIcon={<AllIcons.Leaf width={14} height={14} strokeWidth={1.5} />}
          eyebrowLabel="Platform"
          heading="The foundation for production biomolecular AI."
          body="Deploy frontier models with low-latency APIs, autoscaling, and full observability."
          cta="Get early access"
          image={<MockVisual />}
        />
      </div>
      <div>
        <p className="text-body-sm text-text-muted mb-sm">Without image</p>
        <CardWide
          eyebrowIcon={<AllIcons.Code width={14} height={14} strokeWidth={1.5} />}
          eyebrowLabel="API"
          heading="Build directly on our models."
          body="REST and Python SDK. Predict structures, generate molecules, run screens."
          cta="View API docs"
        />
      </div>
    </div>
  ),
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};

// ── CardCaseStudy ─────────────────────────────────────────────────────────────

// In production: pass a real SVG/PNG with brightness-0 invert to make it white.
// e.g. <img src={pfizerLogo} alt="Pfizer" className="h-[32px] w-auto brightness-0 invert" />
const PfizerLogo = () => (
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 24'%3E%3Ctext y='20' font-family='sans-serif' font-size='20' fill='white'%3EPfizer%3C/text%3E%3C/svg%3E"
    alt="Pfizer"
    className="h-[32px] w-auto"
  />
);
const CaseImage = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-surface-secondary to-surface-tertiary flex items-center justify-center">
    <span className="text-text-muted text-body-sm">Image slot</span>
  </div>
);

export const CaseStudy: Story = {
  name: 'CardCaseStudy',
  render: () => (
    <div className="max-w-container">
      <CardCaseStudy
        logo={<PfizerLogo />}
        heading="How Pfizer scientists are using Boltz's platform across large and small molecule discovery"
        cta="Read more"
        image={<CaseImage />}
      />
    </div>
  ),
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};

// ── Overview ──────────────────────────────────────────────────────────────────

export const Overview: Story = {
  name: 'All variants — overview',
  render: () => (
    <div className="flex flex-col gap-2xl max-w-container mx-auto p-xl">
      <section>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-md">Card Wide — 1 per row</p>
        <CardWide eyebrowIcon={<AllIcons.Leaf width={14} height={14} strokeWidth={1.5} />} eyebrowLabel="Platform" heading="The foundation for production biomolecular AI." body="Deploy frontier models with low-latency APIs, autoscaling, and full observability." cta="Get early access" image={<MockVisual />} />
      </section>
      <section>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-md">Card Case Study</p>
        <CardCaseStudy logo={<PfizerLogo />} heading="How Pfizer scientists are using Boltz's platform across large and small molecule discovery" cta="Read more" image={<CaseImage />} />
      </section>
      <section>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-md">Card Medium — connected (8px gap)</p>
        <CardGroup spacing="connected">
          <CardMedium color="blue-light" heading="Platform infrastructure" body="Production-ready APIs and managed infrastructure." cta="Get early access" className="flex-1" />
          <CardMedium color="blue-dark" heading="Research grade models" body="State-of-the-art structure prediction." cta="Read the paper" className="flex-1" />
        </CardGroup>
      </section>
      <section>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-md">Card Small — standalone (24px gap)</p>
        <CardGroup spacing="standalone" className="grid grid-cols-3">
          <CardSmall color="blue-pale" icon={<AllIcons.Cpu {...sz} />} heading="BoltzMol 1.1" />
          <CardSmall color="sage-pale" icon={<AllIcons.Dna {...sz} />} heading="BoltzProt 1.1" />
          <CardSmall color="tierra-100" icon={<AllIcons.Microscope {...sz} />} heading="BoltzRNA 1.0" />
        </CardGroup>
      </section>
    </div>
  ),
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};
