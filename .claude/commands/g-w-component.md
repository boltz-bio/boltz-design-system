# /g-w-component

Generate (or extend) a Boltz design system component. Boltz is a **scalable, token-driven, light-first** design system — every value comes from a token, components are composed from existing ones, and nothing is invented per-component.

## Usage

```
/g-w-component <Name> [figma-url]
```

- `Name` — PascalCase component name (e.g. `Accordion`, `Toggle`, `NavBar`)
- `figma-url` — optional Figma node URL to pull design context from

## What this does

1. Reads `DESIGN.md` + `reference/components.html` (source of truth #1) for the spec
2. Reads `MAPPING.md` to find the correct DESIGN.md key, Figma name, and code name
3. **Checks for reuse** — scans `packages/ui/src/components` + `index.ts` so we compose, not duplicate
4. If a Figma URL is provided, reads exact values via the Figma MCP bridge
5. Generates / extends `packages/ui/src/components/<Name>.tsx`
6. Generates `apps/storybook/stories/02-components/<Name>.stories.tsx`
7. Adds the export to `packages/ui/src/index.ts`

## Hard rules (never break these)

### Tokens only — NO hardcoded values
This is a scalable design system. **Never** use Tailwind arbitrary values for design dimensions:
- ❌ `h-[36px]`, `px-[12px]`, `gap-[10px]`, `text-[15px]`, `leading-[1.2]`, `tracking-[-0.02em]`
- ✅ `h-36`, `px-12`, `gap-10`, `text-body-sm` (the type token already carries line-height + tracking)

If a value isn't in the scale, **add it to the token scale** (`packages/tokens/src/tailwind.cjs` + `tokens.css`) — don't inline it. The only acceptable arbitrary `-[…]` uses are non-design-values:
- transition-property lists: `transition-[opacity,transform]`
- Radix/data state selectors: `data-[state=open]`, `group-data-[state=open]:…`
- genuine hairline strokes (e.g. a 1.5px rule) — comment why

### Typography & text
- No `Text` component. Use **semantic HTML** (`h1`/`h2`/`h3`/`p`) + a type token class. Element = semantics (heading level / paragraph), class = size (`text-heading-md`). They are decoupled (a card title may be `<h3 className="text-heading-sm">`).
- Type tokens are **responsive automatically**: `text-heading-*` steps down one level below the `mobile` (768px) breakpoint via CSS variables in `tokens.css`. Never re-specify `line-height`/`letter-spacing` — the token owns them (and re-specifying breaks the mobile step-down).
- Token usage map (from DESIGN.md): heading-lg = hero, heading-md = section heads, heading-sm = card heads, body-lg = intro/lead, body-md = standard body, body-sm = labels/captions/button text, mono-md = code.

### Icons
- No `Icon` component. Import from `iconoir-react` and pass as a `ReactNode` (`<Leaf width={14} height={14} strokeWidth={1.5} />`). Components that take an icon expose an `icon?: React.ReactNode` prop (see `EyebrowLabel`).
- Use `IconContainer` (40×40, radius md) for boxed icons. Browse the full set in Storybook → `01-Foundations/Icons`.

### Responsive
- Typography: automatic (see above).
- Layout: use Boltz screen variants `mobile:` / `tablet:` / `laptop:` (768 / 1024 / 1328px, from `tokens.ts` `breakpoint`). e.g. `grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3`.

### Reuse / compose
- Before writing anything, check `packages/ui/src/index.ts` for existing components and **compose them** (`Badge`, `EyebrowLabel`, `Button`, `IconContainer`, `Card`, `TextButton`, `NavCta`, `Accordion`).
- Only create a new component file for a genuinely new primitive. Shared sub-parts (e.g. a badge inside an accordion) should alias/wrap the canonical component, not re-implement it.

### Light-first (no dark mode yet)
- Build for light surfaces. Dark-surface variants exist in some components but are **not the default** and dark mode is not shipping yet — don't add new dark styling unless the spec explicitly calls for a dark surface.

### Other invariants
- No hex/rgb/hsl literals — token-based Tailwind color classes only (opacity modifiers like `text-white/70` are fine; `white` is a token).
- Stabil Grotesk Regular 400 only — `font-sans font-regular` (family is also set globally on `html`).
- `rounded-full` (9999px) on all buttons, chips, badges, single-line pill inputs. Cards use `rounded-lg`.
- One black CTA per viewport band. No drop shadows (exception: `ex-toast`).
- Eyebrow label before major section headings.
- Radix primitives for interactive components (Accordion → `@radix-ui/react-accordion`, Toggle → `@radix-ui/react-switch`).
- `class-variance-authority` for variants; `cn()` from `../utils` for className merging (it's configured with `extendTailwindMerge` so custom tokens like `text-body-sm` aren't dropped — always merge through it).

## Token classes reference

Colors: `bg-surface-primary`, `bg-surface-secondary`, `bg-surface-card-dark`, `bg-action-primary`, `bg-sage-medium`, `bg-blue-medium`, `bg-tierra-200`, `text-text-primary`, `text-text-secondary`, `text-text-on-dark`, `border-border-light`
Typography: `text-heading-lg`, `text-heading-md`, `text-heading-sm`, `text-body-lg`, `text-body-md`, `text-body-sm`, `text-mono-md`
Spacing (semantic): `gap-sm/md/lg/xl`, `p-sm/md/lg/xl` — (numeric, for component specs): `h-28`, `h-36`, `w-36`, `px-12`, `px-16`, `pl-20`, `gap-10`, `pr-52` …
Radius: `rounded-full`, `rounded-lg`, `rounded-md`
Motion: `transition-colors duration-base ease-standard`, `duration-fast/slow/spring`, `active:scale-active`
Screens: `mobile:` `tablet:` `laptop:`

## Steps to execute

$ARGUMENTS contains the component name and optional Figma URL.

Parse $ARGUMENTS:
- First token = component Name
- Remaining tokens = Figma URL (if present)

Then:
1. Read `DESIGN.md` + `reference/components.html` for the spec (look up the Name or its DESIGN.md key from `MAPPING.md`)
2. Scan `packages/ui/src/components` + `index.ts` — decide whether to compose existing components instead of creating new
3. If a Figma URL is provided: verify the bridge (`figma_get_status` probe). Read exact values from the node — if the REST API token is expired, use `figma_execute` to read fills/sizes from the plugin sandbox (`figma.getNodeByIdAsync`). Resolve bound colour variables to their token names.
4. Write/extend the component in `packages/ui/src/components/<Name>.tsx` — tokens only, responsive, composed
5. Write the story to `apps/storybook/stories/02-components/<Name>.stories.tsx` with `argTypes` for controls
6. Append the export lines to `packages/ui/src/index.ts`
7. Run `pnpm typecheck`; verify visually in Storybook (dimensions match Figma, no arbitrary values left)
8. Report what was created/changed
