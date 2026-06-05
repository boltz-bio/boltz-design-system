import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section, TabBar, CodeBlock } from '@boltz/ui';
import React from 'react';

// Example section — "How you can use Boltz" (Figma "use case section" 246:941).
// A persona TabBar switches the lead copy + a tabbed CodeBlock, on a tinted panel
// with a faint blob. Built entirely from existing primitives — Section (120px
// vertical rhythm), TabBar and CodeBlock — no new colours or components.

const meta = {
  title: '04-Sections/Use cases',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LvTmQRNQ2FZ6GcrSpwuvgl/Boltz-web-2.0?node-id=246-941',
    },
    docs: {
      description: {
        component:
          'A use-case section: a persona TabBar (Scientists / Developers / Agents) drives the lead copy and a tabbed CodeBlock (Python / REST API / Agentic SDK) on a sage panel. Wrapped in the Section component, which owns the standard 120px desktop vertical padding and the centred container.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

type Persona = { value: string; label: string; color: 'sage' | 'blue' | 'tierra'; desc: string; tabs: { label: string; code: string }[] };

const personas: Persona[] = [
  {
    value: 'scientists',
    label: 'Scientists',
    color: 'sage',
    desc: 'A Python CLI for running our most powerful models without leaving your notebook.',
    tabs: [
      { label: 'Python', code: `from boltz import Client\n\nclient = Client(api_key="bz_...")\n\nresult = client.predict(\n    model="boltz-prot-1.1",\n    sequence="MKTAYIAKQR...",\n)\nprint(result.structure.pdb)` },
      { label: 'REST API', code: `curl https://api.boltz.bio/v1/predict \\\n  -H "Authorization: Bearer bz_..." \\\n  -d '{"model":"boltz-prot-1.1",\n       "sequence":"MKTAYIAKQR..."}'` },
      { label: 'Agentic SDK', code: `from boltz.agent import BoltzTool\n\ntools = [BoltzTool(api_key="bz_...")]\nagent.run("Fold this sequence.", tools=tools)` },
    ],
  },
  {
    value: 'developers',
    label: 'Developers',
    color: 'blue',
    desc: 'Typed SDKs and a predictable REST API that drop straight into your product or pipeline.',
    tabs: [
      { label: 'Python', code: `from boltz import Client\n\nclient = Client()\nfor job in client.batch(sequences):\n    store(job.result)` },
      { label: 'REST API', code: `POST /v1/batch\n{\n  "model": "boltz-prot-1.1",\n  "sequences": ["...", "..."],\n  "webhook": "https://app/api/boltz"\n}` },
      { label: 'Agentic SDK', code: `import { Boltz } from '@boltz/sdk'\n\nconst boltz = new Boltz()\nconst { pdb } = await boltz.predict({ sequence })` },
    ],
  },
  {
    value: 'agents',
    label: 'Agents',
    color: 'tierra',
    desc: 'Expose Boltz models as tools your agents can call mid-reasoning, with calibrated confidence.',
    tabs: [
      { label: 'Python', code: `from boltz.agent import BoltzTool\n\ntools = [BoltzTool()]\nagent.run(\n    "Fold this target and rank binding pockets.",\n    tools=tools,\n)` },
      { label: 'REST API', code: `POST /v1/tools/fold\n{\n  "sequence": "MKTAYIAKQR...",\n  "return": ["structure", "pockets"]\n}` },
      { label: 'Agentic SDK', code: `import { streamText } from 'ai'\nimport { boltzTools } from '@boltz/ai'\n\nstreamText({ model, tools: boltzTools, prompt })` },
    ],
  },
];

function UseCasesSection() {
  const [active, setActive] = React.useState('scientists');
  const persona = personas.find((p) => p.value === active) ?? personas[0];

  return (
    <Section innerClassName="flex flex-col items-center gap-xl">
      <h2 className="text-heading-lg text-text-primary text-center">How you can use Boltz</h2>
      <TabBar
        items={personas.map((p) => ({ value: p.value, label: p.label }))}
        value={active}
        onValueChange={setActive}
      />
      <p className="max-w-body text-body-lg text-text-secondary text-center">{persona.desc}</p>

      {/* CodeBlock's contained mode supplies the tinted band + blob decoration;
          kept inside the section container so it has horizontal inset. */}
      <div className="w-full pt-md">
        <CodeBlock color={persona.color} contained tabs={persona.tabs} />
      </div>
    </Section>
  );
}

export const UseCases: Story = {
  render: () => <UseCasesSection />,
};
