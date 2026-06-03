import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: '01-Foundations/Typography',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ name, sample, className }: { name: string; sample: string; className: string }) => (
  <div className="flex items-baseline gap-xl py-md border-b border-border-light">
    <div className="w-200">
      <code className="text-body-sm text-text-muted">{name}</code>
    </div>
    <div className={className}>{sample}</div>
  </div>
);

export const Scale: Story = {
  render: () => (
    <div className="p-xl max-w-container mx-auto">
      <h1 className="text-heading-lg text-text-primary mb-xl">Type scale</h1>
      <div className="text-body-md text-text-secondary mb-xl">
        Stabil Grotesk Regular (400) only. Never another weight.
      </div>

      <Row name="heading-lg / 62px" sample="Frontier models, built to integrate" className="text-heading-lg" />
      <Row name="heading-md / 32px" sample="Build with our models" className="text-heading-md" />
      <Row name="heading-sm / 24px" sample="Card heading" className="text-heading-sm" />
      <Row name="body-lg / 20px" sample="Hero body and intro copy lives here." className="text-body-lg text-text-secondary" />
      <Row name="body-md / 18px" sample="Standard body and all button text uses this size." className="text-body-md" />
      <Row name="body-sm / 15px" sample="Captions, metadata, eyebrow labels." className="text-body-sm text-text-muted" />
      <Row name="mono-md / 13px (IBM Plex Mono)" sample={`predict(seq="MVLS...")`} className="text-mono-md font-mono" />
    </div>
  ),
};
