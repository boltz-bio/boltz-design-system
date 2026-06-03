# Architecture — Boltz Design System

How this repo is structured and the conventions every component follows. This is
the contract; the `/g-w-component` skill generates code that matches it.

## Monorepo layout

```
packages/
  tokens/                  # @boltz/tokens — the single source of design values
    src/tokens.ts          #   TS objects (Figma-verified)
    src/tokens.css         #   CSS custom properties + @font-face + responsive type
    src/tailwind.cjs       #   Tailwind preset (consumes the tokens)
  ui/                      # @boltz/ui — the component library
    src/components/        #   one component (or family) per file
    src/styles.ts          #   shared className fragments (focusRing, etc.)
    src/utils.ts           #   cn() — tailwind-merge configured for our tokens
    src/index.ts           #   public exports
apps/
  storybook/               # @boltz/storybook — docs + dev surface (NOT shipped)
    stories/
      00-overview/         #   intro
      01-foundations/      #   colors, type, tokens, icons
      02-components/       #   one story file per component
      04-sections/         #   composition proofs
      05-screens/          #   full example pages (Landing, News)
      _data/boltz.ts       #   shared demo fixtures (models, stats, articles)
```

## Hard conventions

### 1. Tokens only — no hardcoded values
Styling comes from token classes, never Tailwind arbitrary values for design
dimensions. `h-36` not `h-[36px]`; `text-body-sm` not `text-[15px]`. If a value
isn't in the scale, add it to `tailwind.cjs` — don't inline it.

Acceptable arbitrary `-[…]` (not design values): transition-property lists
(`transition-[opacity,transform]`), Radix state selectors (`data-[state=open]`),
hairline strokes, and genuine one-off component-layout dimensions (e.g. a 560px
hero-card height) — comment those.

### 2. Typography = semantic element + token class
No `Text` component. Use `h1`/`h2`/`h3`/`p` for semantics, a `text-*` token for
size. The token carries line-height + tracking — never re-specify them. Type is
**responsive automatically**: `text-heading-*` steps down below the `mobile`
(768px) breakpoint via CSS variables. Don't repeat `font-sans font-regular` —
`html` sets Stabil Grotesk 400 globally.

### 3. Icons = Iconoir as ReactNode
No `Icon` component. Import from `iconoir-react`, pass as `icon?: React.ReactNode`
(size via `width`/`height`, `strokeWidth={1.5}`). `IconContainer` (40×40) boxes them.

### 4. Variants
Single-root components → `cva()`. Multi-element components (where each variant
styles several elements) → typed `Record<Variant, string>` maps. Always merge
classes through `cn()` from `../utils`.

### 5. No custom CSS files
This is a Tailwind + token system. Styling lives in token classes and the small
shared `styles.ts` fragments — **not** in per-component CSS. Adding a styles/ CSS
folder is an anti-pattern here.

### 6. Light-first
Build for light surfaces. Dark-surface variants exist but are not the default;
no dark-mode theme ships yet.

### 7. Responsive layout
Use Boltz screen variants `mobile:` / `tablet:` / `laptop:` (768 / 1024 / 1328px).

## Per-component requirements

Every component ships with:
- `packages/ui/src/components/<Name>.tsx` — the component (token-only, responsive).
- An export in `packages/ui/src/index.ts`.
- `apps/storybook/stories/02-components/<Name>.stories.tsx` with:
  - `tags: ['autodocs']`
  - `argTypes` for controls
  - `parameters.docs.description.component` — a short explanation
  - `parameters.design` — the Figma node URL (Figma preview panel)
- Realistic data sourced from `stories/_data/boltz.ts` when content-driven.

## Storybook addons (configured)
- **Controls** (core) — props/attr panel, expanded.
- **Viewport** (core) — Boltz breakpoints + device presets.
- **addon-a11y** — accessibility checks (test: 'todo').
- **addon-designs** — Figma preview via `parameters.design`.

## Data
Demo/sample data lives in `apps/storybook/stories/_data/` (Storybook app), never
in `@boltz/ui` — the shipped package stays content-free. Components are
prop-driven; their TypeScript prop types are the data contract.

## Token / Figma sync
Figma is the visual source of truth; `DESIGN.md` is the spec. On conflict, Figma
wins for visuals. Read exact Figma values via the figma-console MCP bridge
(`figma_execute` reads node fills when the REST token is expired). See
`AUDIT-2026-06-03.md` and `MAPPING.md`.

## Planned (not yet done)
- Per-component folders (`components/Button/Button.tsx` + `index.ts`) once the
  team coordinates the move.
- Token/font-sans cleanup of the most recent components (CodeBlock/ListItem/NewsItem).
