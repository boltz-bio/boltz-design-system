# /g-w-component

Generate a new Boltz design system component.

## Usage

```
/g-w-component <Name> [figma-url]
```

- `Name` — PascalCase component name (e.g. `Accordion`, `Toggle`, `NavBar`)
- `figma-url` — optional Figma node URL to pull design context from

## What this does

1. Reads `DESIGN.md` for the visual spec of the component
2. Reads `MAPPING.md` to find the correct DESIGN.md key, Figma name, and code name
3. If a Figma URL is provided, fetches design context via the Figma MCP tool
4. Generates `packages/ui/src/components/<Name>.tsx` following Boltz hard rules
5. Generates `apps/storybook/stories/02-components/<Name>.stories.tsx`
6. Adds the export to `packages/ui/src/index.ts`

## Hard rules (never break these)

- No hex/rgb/hsl — use token-based Tailwind classes only
- Stabil Grotesk Regular 400 only — `font-sans font-regular`
- `rounded-full` (9999px) on all buttons, chips, single-line inputs
- One black CTA per viewport band
- Eyebrow label `• Section name` before major section headings
- No drop shadows (exception: `ex-toast`)
- Use Radix UI primitives for interactive components (Accordion → `@radix-ui/react-accordion`, Toggle → `@radix-ui/react-switch`, etc.)
- Use `class-variance-authority` for variant logic
- Use `cn()` from `../utils` for className merging

## Token classes reference

Colors: `bg-surface-primary`, `bg-surface-secondary`, `bg-surface-card-dark`, `bg-action-primary`, `text-text-primary`, `text-text-secondary`, `text-text-on-dark`, `border-border-light`
Typography: `text-heading-lg`, `text-heading-md`, `text-heading-sm`, `text-body-lg`, `text-body-md`, `text-body-sm`
Spacing: `gap-xs`, `gap-sm`, `gap-md`, `gap-lg`, `gap-xl`, `p-xs`, `p-sm`, `p-md`, `p-lg`, `p-xl`
Radius: `rounded-full`, `rounded-lg`, `rounded-md`
Motion: `transition-colors duration-base ease-standard`, `active:scale-active`

## Steps to execute

$ARGUMENTS contains the component name and optional Figma URL.

Parse $ARGUMENTS:
- First token = component Name
- Remaining tokens = Figma URL (if present)

Then:
1. Search DESIGN.md for the component spec (look for the Name or its DESIGN.md key from MAPPING.md)
2. If Figma URL provided: call `get_design_context` with the URL to get visual details
3. Write the component file to `packages/ui/src/components/<Name>.tsx`
4. Write the story file to `apps/storybook/stories/02-components/<Name>.stories.tsx`
5. Append the export lines to `packages/ui/src/index.ts`
6. Report what was created
