import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, EyebrowLabel } from '@boltz/ui';

// Section composition — no new component file needed.
// Proof that tokens flow + components compose correctly.

const meta = {
  title: '04-Sections/HeroBand',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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
          <EyebrowLabel>Build on Boltz</EyebrowLabel>
          <h1 className="text-heading-lg text-text-primary">
            Frontier models for biomolecular design.
          </h1>
          <p className="text-body-lg text-text-secondary max-w-hero">
            State-of-the-art structure prediction, served as production-ready infrastructure.
            Built to integrate.
          </p>
          <div className="flex gap-md mt-md">
            <Button intent="primary">Try Boltz Lab</Button>
            <Button intent="secondary">Read the paper</Button>
          </div>
        </div>
        <div className="col-span-6 flex justify-end">
          <ProteinPlaceholder />
        </div>
      </div>
    </section>
  ),
};
