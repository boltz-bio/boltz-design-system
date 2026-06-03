import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from '@boltz/ui';

const meta = {
  title: '02-Components/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A syntax-styled code sample with optional tabs for showing the same operation across languages such as Python, REST, and the SDK. Use standalone in docs or contained inside a coloured section band.',
      },
    },
  },
  argTypes: {
    color:     { control: 'select', options: ['sage', 'blue', 'tierra'] },
    contained: { control: 'boolean' },
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const TABS = [
  {
    label: 'Python',
    code:
`from boltz import BoltzClient

client = BoltzClient(api_key="your-key")

result = client.predict(
    sequence="MKTAYIAKQRQISFVKSHFSRQLEERLKHIQSQDYINASTPLIH"
)

# Returns folded structure + confidence scores
print(result.pdb_string)`,
  },
  {
    label: 'REST API',
    code:
`curl https://api.boltz.bio/v1/predict \\
  -H "Authorization: Bearer $BOLTZ_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sequence": "MKTAYIAKQRQISFVKSHFSRQ",
    "model": "boltz-2"
  }'`,
  },
  {
    label: 'Agentic SDK',
    code:
`import { streamText } from 'ai'

const result = streamText({
  model: 'anthropic/claude-opus-4.1',
  prompt: 'Why is the sky blue?'
})`,
  },
];

const SIMPLE_CODE =
`from boltz import BoltzClient

client = BoltzClient(api_key="your-key")
result = client.predict(sequence="MKTAYIAKQRQISFVKSHFSRQ")

print(result.pdb_string)`;

// ── Standalone ────────────────────────────────────────────────────────────────

export const StandaloneSage: Story = {
  name: 'Standalone — sage',
  args: { color: 'sage', contained: false, tabs: TABS },
};

export const StandaloneBlue: Story = {
  name: 'Standalone — blue',
  args: { color: 'blue', contained: false, tabs: TABS },
};

export const StandaloneTierra: Story = {
  name: 'Standalone — tierra',
  args: { color: 'tierra', contained: false, tabs: TABS },
};

export const StandaloneNoTabs: Story = {
  name: 'Standalone — no tabs',
  args: { color: 'tierra', contained: false, code: SIMPLE_CODE },
};

// ── Contained ─────────────────────────────────────────────────────────────────

export const ContainedSage: Story = {
  name: 'Contained — sage',
  args: { color: 'sage', contained: true, tabs: TABS },
  parameters: { layout: 'fullscreen' },
};

export const ContainedBlue: Story = {
  name: 'Contained — blue',
  args: { color: 'blue', contained: true, tabs: TABS },
  parameters: { layout: 'fullscreen' },
};

export const ContainedTierra: Story = {
  name: 'Contained — tierra',
  args: { color: 'tierra', contained: true, tabs: TABS },
  parameters: { layout: 'fullscreen' },
};

// ── All variants ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-col gap-xl max-w-container mx-auto">
      <div>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-md">Standalone — with tabs</p>
        <div className="flex flex-col gap-md">
          <CodeBlock color="sage"   tabs={TABS} />
          <CodeBlock color="blue"   tabs={TABS} />
          <CodeBlock color="tierra" tabs={TABS} />
        </div>
      </div>
      <div>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-md">Standalone — no tabs</p>
        <CodeBlock color="tierra" code={SIMPLE_CODE} />
      </div>
      <div>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-md">Contained — section band</p>
        <div className="flex flex-col gap-md">
          <CodeBlock color="sage"   contained tabs={TABS} />
          <CodeBlock color="blue"   contained tabs={TABS} />
          <CodeBlock color="tierra" contained tabs={TABS} />
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};
