import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ProgressBar,
  MetricComparison,
  StatMetric,
  EyebrowLabel,
  Card,
  type MetricItem,
} from '@boltz/ui';

// ── Charts — composition patterns, not components ─────────────────────────────
//
// The Boltz DS ships *primitives* (ProgressBar, MetricComparison, StatMetric …),
// not a charting component. These examples show how to assemble simple,
// token-styled data visualisations from those primitives plus a little markup —
// matching the Figma Guidelines "graphs / nodes" (57:5562 / 57:5563).
//
// Rules followed here:
//   • Token-only Tailwind classes (no hex, no arbitrary colour values).
//   • Inline style is used ONLY for runtime/data dimensions (height/width %,
//     strokeDasharray) — never for colour. Colour always comes from a token
//     className or `currentColor`.
//
// Reach for a real charting library only when you need axes, ticks, tooltips,
// zoom, or large/streaming datasets.

const meta = {
  title: '01-Foundations/Charts',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Composition patterns for simple graphs and charts built entirely from existing @boltz/ui primitives (ProgressBar, MetricComparison, StatMetric) plus minimal token-styled markup. The design system intentionally does NOT ship a Chart component — these are reference recipes. Every colour comes from a token class; inline styles carry only data-driven dimensions (height/width %, strokeDasharray), never colour. Use a dedicated charting library when you need axes, ticks, tooltips, or large/streaming datasets.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Small labelled block wrapper used by every example.
function Block({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-md">
      <div className="flex flex-col gap-xs">
        <h2 className="text-heading-sm text-text-primary">{title}</h2>
        {hint && <p className="text-body-sm text-text-muted">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

// 1. Vertical bar chart — token-styled divs. Heights are runtime data → inline %.
const barData = [
  { label: 'Mon', pct: 42, tone: 'bg-sage-medium' },
  { label: 'Tue', pct: 68, tone: 'bg-blue-medium' },
  { label: 'Wed', pct: 55, tone: 'bg-sage-medium' },
  { label: 'Thu', pct: 81, tone: 'bg-blue-medium' },
  { label: 'Fri', pct: 73, tone: 'bg-sage-medium' },
  { label: 'Sat', pct: 38, tone: 'bg-blue-medium' },
];

function BarChart() {
  return (
    <div className="flex flex-col gap-sm">
      <div className="flex items-end gap-sm h-[200px]" role="img" aria-label="Weekly throughput, bar chart">
        {barData.map((d) => (
          <div
            key={d.label}
            className={`${d.tone} rounded-sm flex-1`}
            style={{ height: `${d.pct}%` }}
            title={`${d.label}: ${d.pct}%`}
          />
        ))}
      </div>
      <div className="flex gap-sm">
        {barData.map((d) => (
          <span key={d.label} className="flex-1 text-center text-body-sm text-text-muted">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// 2. Horizontal ranked bars — built from ProgressBar rows.
const accuracyByTarget = [
  { label: 'Kinases', value: 94 },
  { label: 'GPCRs', value: 88 },
  { label: 'Proteases', value: 81 },
  { label: 'Ion channels', value: 72 },
  { label: 'Nuclear receptors', value: 64 },
];

function HorizontalBars() {
  return (
    <ul className="flex flex-col gap-md">
      {accuracyByTarget.map((row, i) => (
        <li key={row.label} className="flex flex-col gap-xs">
          <div className="flex items-baseline justify-between gap-md">
            <span className="text-body-md text-text-primary">{row.label}</span>
            <span className="text-body-md text-text-primary whitespace-nowrap">{row.value}%</span>
          </div>
          <ProgressBar value={row.value} size="sm" label={`${row.label} accuracy`} delayMs={i * 90} />
        </li>
      ))}
    </ul>
  );
}

// 3. Labelled comparison — the MetricComparison primitive, used as a bar chart.
const comparisonItems: MetricItem[] = [
  { label: 'Boltz API', cost: { display: '$2,700', value: 2700 }, time: { display: '3 days', value: 3 } },
  { label: 'In-house cluster', cost: { display: '$8,400', value: 8400 }, time: { display: '11 days', value: 11 } },
  { label: 'Legacy pipeline', cost: { display: '$14,200', value: 14200 }, time: { display: '21 days', value: 21 } },
];

// 4a. Donut / share — SVG with stroke-dasharray. Colour via className token,
//     the dash lengths (data) via inline style.
const donut = [
  { label: 'Boltz', pct: 58, stroke: 'stroke-sage-medium' },
  { label: 'Other tools', pct: 27, stroke: 'stroke-blue-medium' },
  { label: 'Manual', pct: 15, stroke: 'stroke-blue-deep' },
];

function Donut() {
  // r chosen so circumference ≈ 100 → dasharray reads directly as percentages.
  const r = 100 / (2 * Math.PI);
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-xl">
      <svg viewBox="0 0 40 40" className="w-[140px] h-[140px] -rotate-90" role="img" aria-label="Share of workload, donut chart">
        {/* track */}
        <circle cx="20" cy="20" r={r} fill="none" className="stroke-surface-secondary" strokeWidth="5" />
        {donut.map((seg) => {
          const dash = (seg.pct / 100) * c;
          const el = (
            <circle
              key={seg.label}
              cx="20"
              cy="20"
              r={r}
              fill="none"
              className={seg.stroke}
              strokeWidth="5"
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <ul className="flex flex-col gap-sm">
        {donut.map((seg) => (
          <li key={seg.label} className="flex items-center gap-sm">
            <span
              aria-hidden
              className={`w-12 h-12 rounded-full ${seg.stroke.replace('stroke-', 'bg-')}`}
            />
            <span className="text-body-sm text-text-primary">{seg.label}</span>
            <span className="text-body-sm text-text-muted">{seg.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 4b. Stacked share bar — share-of-total split into token-coloured segments.
const stacked = [
  { label: 'Solved', pct: 62, tone: 'bg-sage-dark' },
  { label: 'In progress', pct: 23, tone: 'bg-sage-medium' },
  { label: 'Queued', pct: 15, tone: 'bg-blue-medium' },
];

function StackedShare() {
  return (
    <div className="flex flex-col gap-sm">
      <div className="flex w-full h-20 rounded-full overflow-hidden" role="img" aria-label="Pipeline status share">
        {stacked.map((seg) => (
          <div key={seg.label} className={seg.tone} style={{ width: `${seg.pct}%` }} title={`${seg.label}: ${seg.pct}%`} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-lg gap-y-xs">
        {stacked.map((seg) => (
          <span key={seg.label} className="inline-flex items-center gap-sm">
            <span aria-hidden className={`w-12 h-12 rounded-full ${seg.tone}`} />
            <span className="text-body-sm text-text-primary">{seg.label}</span>
            <span className="text-body-sm text-text-muted">{seg.pct}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// 5. Sparkline — minimal inline <svg> polyline, token stroke colour.
const spark = [12, 18, 15, 22, 19, 27, 24, 31, 29, 38];

function Sparkline() {
  const max = Math.max(...spark);
  const min = Math.min(...spark);
  const points = spark
    .map((v, i) => {
      const x = (i / (spark.length - 1)) * 100;
      const y = 30 - ((v - min) / (max - min || 1)) * 28 - 1;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <Card variant="light" className="flex flex-col gap-md max-w-[320px]">
      <StatMetric value="+38%" label="predictions / week" />
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-[60px]" role="img" aria-label="Weekly predictions trend, line chart">
        <polyline points={points} className="stroke-blue-deep fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </Card>
  );
}

export const Overview: Story = {
  render: () => (
    <div className="max-w-container mx-auto flex flex-col gap-2xl">
      <header className="flex flex-col gap-md">
        <EyebrowLabel>Charts</EyebrowLabel>
        <p className="text-body-md text-text-secondary max-w-body">
          These are composition patterns, not components — the design system ships primitives
          (ProgressBar, MetricComparison, StatMetric), and you assemble charts from them plus
          token-styled markup. Colour always comes from a token class; inline styles carry only
          data-driven dimensions.
        </p>
      </header>

      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-xl">
        <Block title="Bar chart" hint="Token-styled divs, height set from data (inline %). Throughput by day.">
          <BarChart />
        </Block>

        <Block title="Horizontal bars" hint="ProgressBar rows as a ranked list. Model accuracy by target type.">
          <HorizontalBars />
        </Block>

        <Block title="Comparison" hint="The MetricComparison primitive. Toggle Cost / Time.">
          <MetricComparison
            header={{ label: 'Method', value: 'Per run' }}
            items={comparisonItems}
            background="sage"
          />
        </Block>

        <Block title="Donut / share" hint="SVG circles; dash lengths from data, colour from stroke tokens.">
          <Donut />
        </Block>

        <Block title="Stacked share" hint="Share-of-total split into token-coloured segments.">
          <StackedShare />
        </Block>

        <Block title="Sparkline / line" hint="Inline <svg> polyline with a token stroke, inside a Card with a stat.">
          <Sparkline />
        </Block>
      </div>
    </div>
  ),
};
