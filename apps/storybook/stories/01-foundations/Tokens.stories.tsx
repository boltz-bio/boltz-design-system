import type { Meta, StoryObj } from '@storybook/react-vite';
import { spacing, radius, motion } from '@boltz/tokens';

const meta = {
  title: '01-Foundations/Tokens',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spacing: Story = {
  render: () => (
    <div className="p-xl max-w-container mx-auto">
      <h1 className="text-heading-md text-text-primary mb-lg">Spacing</h1>
      <p className="text-body-md text-text-secondary mb-xl">
        Base unit is 4px. Section padding is the brand's "confident but not cramped" rhythm.
      </p>
      <div className="flex flex-col gap-md">
        {Object.entries(spacing).map(([name, value]) => (
          <div key={name} className="flex items-center gap-lg">
            <code className="text-body-sm text-text-muted w-200">{name} / {value}</code>
            <div
              className="h-md bg-sage-medium rounded-sm"
              style={{ width: value }}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="p-xl max-w-container mx-auto">
      <h1 className="text-heading-md text-text-primary mb-lg">Border radius</h1>
      <p className="text-body-md text-text-secondary mb-xl">
        <code className="text-body-md font-mono">rounded-full</code> (9999px) is the canonical Boltz shape — used on every button, chip, and single-line input.
      </p>
      <div className="grid grid-cols-3 gap-lg">
        {Object.entries(radius).map(([name, value]) => (
          <div key={name} className="flex flex-col items-center gap-md">
            <div
              className="h-[120px] w-[120px] bg-sage-light border border-sage-medium"
              style={{ borderRadius: value }}
            />
            <code className="text-body-sm text-text-muted">{name} / {value}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Motion: Story = {
  render: () => (
    <div className="p-xl max-w-container mx-auto">
      <h1 className="text-heading-md text-text-primary mb-lg">Motion</h1>
      <p className="text-body-md text-text-secondary mb-xl">
        Duration scale + easing. Hover any swatch to see the duration in action.
      </p>
      <div className="grid grid-cols-3 gap-lg mb-2xl">
        {Object.entries(motion.duration).map(([name, value]) => (
          <div key={name} className="flex flex-col gap-md">
            <code className="text-body-sm text-text-muted">{name} / {value}</code>
            <div
              className="h-[80px] bg-sage-pale hover:bg-sage-medium border border-sage-medium rounded-md transition-colors"
              style={{ transitionDuration: value }}
            />
          </div>
        ))}
      </div>
      <h2 className="text-heading-sm text-text-primary mb-md">Easing</h2>
      <dl className="grid grid-cols-2 gap-md text-body-sm">
        <dt className="text-text-muted">standard</dt>
        <dd className="font-mono text-text-primary">{motion.easing.standard}</dd>
        <dt className="text-text-muted">out</dt>
        <dd className="font-mono text-text-primary">{motion.easing.out}</dd>
        <dt className="text-text-muted">activeScale (button press)</dt>
        <dd className="font-mono text-text-primary">{motion.activeScale}</dd>
      </dl>
    </div>
  ),
};
