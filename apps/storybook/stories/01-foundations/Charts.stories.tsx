import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  ProgressBar,
  MetricComparison,
  StatMetric,
  EyebrowLabel,
  Card,
  type MetricItem,
} from '@boltz/ui';

// Triggers two nested rAFs so the browser paints the initial 0-state first,
// then CSS transitions animate to their target values on mount.
function useMount() {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    let r1: number, r2: number;
    r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setOn(true)); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, []);
  return on;
}

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
//   • Single colour family per chart — use shades of ONE family (sage/blue/tierra).
//     Never mix families in the same chart. Use dark→medium→light→pale progression.
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
// Rule: same colour family throughout — height carries the data, not colour.
const barData = [
  { label: 'Mon', pct: 42, tone: 'bg-sage-medium' },
  { label: 'Tue', pct: 68, tone: 'bg-sage-medium' },
  { label: 'Wed', pct: 55, tone: 'bg-sage-medium' },
  { label: 'Thu', pct: 81, tone: 'bg-sage-dark' },
  { label: 'Fri', pct: 73, tone: 'bg-sage-medium' },
  { label: 'Sat', pct: 38, tone: 'bg-sage-light' },
];

function BarChart() {
  const on = useMount();
  return (
    <div className="flex flex-col gap-sm">
      <div className="flex items-end gap-sm h-[200px]" role="img" aria-label="Weekly throughput, bar chart">
        {barData.map((d, i) => (
          <div
            key={d.label}
            className={`${d.tone} rounded-sm flex-1 transition-[height] duration-slow ease-standard-out`}
            style={{ height: on ? `${d.pct}%` : 0, transitionDelay: `${i * 60}ms` }}
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
          <ProgressBar value={row.value} size="sm" label={`${row.label} accuracy`} />
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
// Rule: single colour family — sage-dark / sage-light / sage-pale.
const donut = [
  { label: 'Boltz', pct: 58, stroke: 'stroke-sage-dark' },
  { label: 'Other tools', pct: 27, stroke: 'stroke-sage-light' },
  { label: 'Manual', pct: 15, stroke: 'stroke-sage-pale' },
];

function Donut() {
  const on = useMount();
  // r chosen so circumference ≈ 100 → dasharray reads directly as percentages.
  const r = 100 / (2 * Math.PI);
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-xl">
      <svg viewBox="0 0 40 40" className="w-[140px] h-[140px] -rotate-90" role="img" aria-label="Share of workload, donut chart">
        {/* track */}
        <circle cx="20" cy="20" r={r} fill="none" className="stroke-surface-secondary" strokeWidth="5" />
        {donut.map((seg, i) => {
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
              strokeDasharray={`${on ? dash : 0} ${c}`}
              strokeDashoffset={-offset}
              style={{
                transition: `stroke-dasharray 700ms cubic-bezier(0.4,0,0.2,1) ${i * 150}ms`,
              }}
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
// Rule: single colour family — sage-dark / sage-medium / sage-pale.
const stacked = [
  { label: 'Solved', pct: 62, tone: 'bg-sage-dark' },
  { label: 'In progress', pct: 23, tone: 'bg-sage-medium' },
  { label: 'Queued', pct: 15, tone: 'bg-sage-pale' },
];

function StackedShare() {
  const on = useMount();
  return (
    <div className="flex flex-col gap-sm">
      <div className="flex w-full h-20 rounded-full overflow-hidden" role="img" aria-label="Pipeline status share">
        {stacked.map((seg, i) => (
          <div
            key={seg.label}
            className={`${seg.tone} transition-[width] duration-slow ease-standard-out`}
            style={{ width: on ? `${seg.pct}%` : 0, transitionDelay: `${i * 120}ms` }}
            title={`${seg.label}: ${seg.pct}%`}
          />
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

// 5. Sparkline — smooth cubic-bezier path with start/end dots.
// Rule: line graphs use the DARK version from any one colour family
//       (sage-dark, blue-dark, or tierra-500). Pick one family per chart.
const spark = [12, 18, 15, 22, 19, 27, 24, 31, 29, 38];

/** Converts an array of [x,y] points into a smooth SVG path via cubic bezier. */
function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const cx = (x0 + x1) / 2;
    // Horizontal control points keep tangents smooth across data points.
    d += ` C ${cx.toFixed(2)},${y0.toFixed(2)} ${cx.toFixed(2)},${y1.toFixed(2)} ${x1.toFixed(2)},${y1.toFixed(2)}`;
  }
  return d;
}

function SparklineCard({ label, value, tone }: {
  label: string;
  value: string;
  tone: { line: string; dot: string; bg: string };
}) {
  const max = Math.max(...spark);
  const min = Math.min(...spark);
  const pts: [number, number][] = spark.map((v, i) => [
    (i / (spark.length - 1)) * 100,
    30 - ((v - min) / (max - min || 1)) * 27 - 1.5,
  ]);
  const d = smoothPath(pts);
  const [x0, y0] = pts[0];
  const [xN, yN] = pts[pts.length - 1];

  const on = useMount();
  return (
    <Card variant="light" className="flex flex-col gap-md">
      <StatMetric value={value} label={label} />
      {/* viewBox has 3px padding on all sides so dots aren't clipped */}
      <svg
        viewBox="-3 -3 106 36"
        preserveAspectRatio="none"
        className="w-full h-[60px] transition-opacity duration-slow ease-standard"
        style={{ opacity: on ? 1 : 0, transform: on ? 'translateY(0)' : 'translateY(4px)', transition: 'opacity 500ms ease, transform 500ms ease' }}
        role="img"
        aria-label={`${label} trend`}
      >
        <path d={d} className={`${tone.line} fill-none`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <circle cx={x0} cy={y0} r="1.8" className={`${tone.bg} ${tone.dot}`} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        <circle cx={xN} cy={yN} r="2" className={tone.line.replace('stroke-', 'fill-')} vectorEffect="non-scaling-stroke" />
      </svg>
    </Card>
  );
}

function Sparkline() {
  return (
    <div className="grid grid-cols-3 gap-md">
      <SparklineCard value="+38%" label="predictions / week"
        tone={{ line: 'stroke-sage-dark', dot: 'stroke-sage-dark', bg: 'fill-white' }} />
      <SparklineCard value="+22%" label="structures solved"
        tone={{ line: 'stroke-blue-dark', dot: 'stroke-blue-dark', bg: 'fill-white' }} />
      <SparklineCard value="+15%" label="API calls / day"
        tone={{ line: 'stroke-tierra-500', dot: 'stroke-tierra-500', bg: 'fill-white' }} />
    </div>
  );
}

// 6. Stacked horizontal bar — segments sum to row total; bar width = total/max.
// Rule: single colour family. blue-dark = primary, blue-light = secondary.
const hBars = [
  {
    label: 'With Boltz API',
    segs: [{ v: 4000, tone: 'bg-blue-dark' }, { v: 61320, tone: 'bg-blue-light' }],
    display: '65,320',
  },
  {
    label: 'Legacy pipeline',
    segs: [{ v: 64000, tone: 'bg-blue-dark' }, { v: 59139, tone: 'bg-blue-light' }],
    display: '123,139',
  },
];

const hLegend = [
  { label: 'Upfront tokens',    tone: 'bg-blue-dark'  },
  { label: 'Inference tokens',  tone: 'bg-blue-light' },
];

function StackedHorizontal() {
  const on = useMount();
  const maxTotal = Math.max(...hBars.map(r => r.segs.reduce((s, x) => s + x.v, 0)));
  return (
    <div className="flex flex-col gap-md">
      {/* Legend */}
      <div className="flex flex-wrap gap-lg">
        {hLegend.map(l => (
          <span key={l.label} className="inline-flex items-center gap-sm text-body-sm text-text-secondary">
            <span className={`w-[10px] h-[10px] rounded-full flex-shrink-0 ${l.tone}`} />
            {l.label}
          </span>
        ))}
      </div>
      {/* Rows */}
      <div className="flex flex-col gap-sm">
        {hBars.map(row => {
          const total = row.segs.reduce((s, x) => s + x.v, 0);
          const barW = (total / maxTotal) * 100;
          return (
            <div key={row.label} className="flex items-center gap-md">
              <span className="text-body-sm text-text-secondary w-[140px] flex-shrink-0 text-right">{row.label}</span>
              {/* Axis line */}
              <div className="flex-1 flex items-center gap-sm">
                <div className="flex h-[28px] rounded-sm overflow-hidden transition-[width] duration-slow ease-standard-out" style={{ width: on ? `${barW}%` : 0 }}>
                  {row.segs.map((seg, i) => (
                    <div key={i} className={seg.tone} style={{ width: `${(seg.v / total) * 100}%` }} />
                  ))}
                </div>
                <span className="text-body-sm text-text-muted whitespace-nowrap">{row.display}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 7. Stacked vertical bar + reference line.
// Rule: single colour family — sage-dark = primary (wins), sage-light = secondary (ties).
// Reference line at 57 % marks an industry baseline.
const vBars = [
  { label: 'BoltzMol',  primary: 69, secondary: 13 },
  { label: 'BoltzProt', primary: 71, secondary: 12 },
  { label: 'BoltzRNA',  primary: 60, secondary: 14 },
  { label: 'BoltzAb',   primary: 50, secondary: 21 },
];
const Y_TICKS = [0, 20, 40, 60, 80, 100];
const REF_PCT = 57; // industry baseline

function StackedVertical() {
  const on = useMount();
  return (
    <div className="flex flex-col gap-sm">
      {/* Legend */}
      <div className="flex gap-lg mb-xs">
        {[{ label: 'Wins', tone: 'bg-sage-dark' }, { label: 'Ties', tone: 'bg-sage-light' }].map(l => (
          <span key={l.label} className="inline-flex items-center gap-sm text-body-sm text-text-secondary">
            <span className={`w-[10px] h-[10px] rounded-full flex-shrink-0 ${l.tone}`} />
            {l.label}
          </span>
        ))}
      </div>

      {/* Chart area */}
      <div className="flex gap-sm items-stretch">
        {/* Y-axis labels */}
        <div className="flex flex-col-reverse justify-between text-right pr-sm" style={{ height: 200 }}>
          {Y_TICKS.map(t => (
            <span key={t} className="text-body-sm text-text-muted leading-none">{t}%</span>
          ))}
        </div>

        {/* Grid + bars */}
        <div className="relative flex-1" style={{ height: 200 }}>
          {/* Horizontal gridlines */}
          {Y_TICKS.map(t => (
            <div key={t} className="absolute w-full border-t border-border-light"
              style={{ bottom: `${t}%` }} />
          ))}
          {/* Reference line */}
          <div className="absolute w-full border-t-2 border-dashed border-sage-medium z-10"
            style={{ bottom: `${REF_PCT}%` }} />
          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-md px-sm">
            {vBars.map(col => {
              const total = col.primary + col.secondary;
              return (
                <div key={col.label} className="flex-1 flex flex-col items-center gap-xs">
                  <span className="text-body-sm text-text-muted">{total}%</span>
                  <div className="w-full flex flex-col-reverse overflow-hidden rounded-sm transition-[height] duration-slow ease-standard-out"
                    style={{ height: on ? `${total * 2}px` : 0, transitionDelay: `${vBars.indexOf(col) * 80}ms` }}>
                    <div className="bg-sage-dark w-full flex-shrink-0"
                      style={{ height: `${(col.primary / total) * 100}%` }} />
                    <div className="bg-sage-light w-full flex-shrink-0"
                      style={{ height: `${(col.secondary / total) * 100}%` }} />
                  </div>
                  <span className="text-body-sm text-text-muted text-center">{col.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
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

        <Block
          title="Stacked horizontal bar"
          hint="Segments stacked left-to-right; bar width from data (inline %). Single colour family — blue-dark / blue-light."
        >
          <StackedHorizontal />
        </Block>

        <Block
          title="Stacked vertical bar + reference line"
          hint="Columns with two stacked segments. Y-axis gridlines from CSS. Reference line via absolute positioning."
        >
          <StackedVertical />
        </Block>
      </div>
    </div>
  ),
};
