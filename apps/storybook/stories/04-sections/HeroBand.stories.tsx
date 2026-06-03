import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, EyebrowLabel, NavBar, NavLink } from '@boltz/ui';
import * as AllIcons from 'iconoir-react';

const meta = {
  title: '04-Sections/HeroBand',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The full-width hero section at the top of a page, pairing an eyebrow label, headline, supporting text, and actions with a product visual. Use it as the opening band of a landing or marketing page.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const ProteinPlaceholder = () => (
  <div className="flex items-center justify-center h-[460px] w-[460px] rounded-full bg-sage-pale border border-sage-medium">
    <div className="text-body-sm text-text-muted text-center px-md">
      Protein render goes here
      <br />
      (Sage-medium metaball + cyan ligand)
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <section className="bg-surface-primary py-section">
      <div className="max-w-container mx-auto px-40 grid grid-cols-12 gap-20 items-center">
        <div className="col-span-6 flex flex-col gap-lg">
          <EyebrowLabel icon={<AllIcons.Leaf {...sz} />}>Build on Boltz</EyebrowLabel>
          <h1 className="text-heading-lg text-text-primary">
            Frontier models for biomolecular design.
          </h1>
          <p className="text-body-lg text-text-secondary max-w-hero">
            State-of-the-art structure prediction, served as production-ready infrastructure.
            Built to integrate.
          </p>
          <div className="flex gap-md mt-md">
            <Button variant="black">Try Boltz Lab</Button>
            <Button variant="black">Read the paper</Button>
          </div>
        </div>
        <div className="col-span-6 flex justify-end">
          <ProteinPlaceholder />
        </div>
      </div>
    </section>
  ),
};

// Scrolled landing page — shows navbar backdrop blur as content scrolls behind it
export const ScrolledLandingPage: Story = {
  name: 'Scrolled landing page',
  render: () => (
    <div>
      <NavBar>
        <NavLink href="#">Platform</NavLink>
        <NavLink href="#">API</NavLink>
        <NavLink href="#">News</NavLink>
      </NavBar>

      {/* Hero */}
      <section className="bg-surface-primary py-section">
        <div className="max-w-container mx-auto px-40 grid grid-cols-12 gap-20 items-center">
          <div className="col-span-6 flex flex-col gap-lg">
            <EyebrowLabel icon={<AllIcons.Leaf {...sz} />}>Build on Boltz</EyebrowLabel>
            <h1 className="text-heading-lg text-text-primary">
              Frontier models for biomolecular design.
            </h1>
            <p className="text-body-lg text-text-secondary max-w-hero">
              State-of-the-art structure prediction, served as production-ready infrastructure.
              Built to integrate.
            </p>
            <div className="flex gap-md mt-md">
              <Button variant="black">Try Boltz Lab</Button>
              <Button variant="black">Read the paper</Button>
            </div>
          </div>
          <div className="col-span-6 flex justify-end">
            <ProteinPlaceholder />
          </div>
        </div>
      </section>

      {/* Extra content so there's room to scroll */}
      <section className="bg-surface-secondary py-section">
        <div className="max-w-container mx-auto px-40">
          <h2 className="text-heading-md text-text-primary mb-lg">Platform</h2>
          <p className="text-body-lg text-text-secondary max-w-body">
            Scroll up to see the navbar backdrop blur as the hero content passes behind it.
          </p>
        </div>
      </section>
      <section className="bg-surface-primary py-section">
        <div className="max-w-container mx-auto px-40">
          <h2 className="text-heading-md text-text-primary mb-lg">Models</h2>
          <p className="text-body-lg text-text-secondary max-w-body">
            BoltzMol, BoltzProt, BoltzRNA — frontier models for every molecule class.
          </p>
        </div>
      </section>
    </div>
  ),
};
