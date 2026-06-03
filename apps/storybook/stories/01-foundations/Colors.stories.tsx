import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors } from '@boltz/tokens';

const meta = {
  title: '01-Foundations/Colors',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <div className="flex items-center gap-md">
    <div
      className="h-40 w-40 rounded-md border border-border-light"
      style={{ backgroundColor: value }}
    />
    <div>
      <div className="text-body-md text-text-primary">{name}</div>
      <code className="text-body-sm text-text-muted">{value}</code>
    </div>
  </div>
);

const Group = ({ title, group }: { title: string; group: Record<string, string> }) => (
  <section className="mb-2xl">
    <h2 className="text-heading-md text-text-primary mb-lg">{title}</h2>
    <div className="grid grid-cols-2 gap-md">
      {Object.entries(group).map(([name, value]) => (
        <Swatch key={name} name={name} value={value} />
      ))}
    </div>
  </section>
);

export const All: Story = {
  render: () => (
    <div className="p-xl max-w-container mx-auto">
      <h1 className="text-heading-lg text-text-primary mb-xl">Color tokens</h1>
      <Group title="Surface" group={colors.surface} />
      <Group title="Text" group={colors.text} />
      <Group title="Sage (atmospheric, brand)" group={colors.sage} />
      <Group title="Blue (secondary brand)" group={colors.blue} />
      <Group
        title="Tierra (warm, secondary brand)"
        group={Object.fromEntries(Object.entries(colors.tierra).map(([k, v]) => [k, v]))}
      />
      <Group title="Neutral" group={colors.neutral} />
      <Group title="Status" group={colors.status} />
    </div>
  ),
};
