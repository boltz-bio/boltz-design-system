# Boltz — Product Knowledge

> Source: extracted from `DESIGN.md`, `@boltz/ui` component index, and Storybook screen stories.

## What Boltz is

Boltz is a frontier AI research company for biomolecular design. The product builds models for molecular structure prediction (BoltzMol, BoltzProt, Boltz-2) and provides API + platform for life-science engineering teams.

## Audiences

1. **Scientists** — research credibility, capability claims, benchmarks
2. **Engineers / Developers** — API quality, modularity, integration surface
3. **Community** — open-source contributors, partners, ecosystem

## Three strategic messages (strict priority order)

1. **Frontier Capabilities** — state-of-the-art models, research credibility
2. **Flexibility / Modularity** — engineering quality, "production-ready infrastructure"
3. **Popularity / Distribution** — community size (GitHub, Slack), partner logos

Every page, section, and content decision reinforces these in sequence. When a section can only serve one, serve the highest-ranked one it can.

---

## Screens built

| Screen | Storybook story | Key sections (top → bottom) |
|---|---|---|
| **Landing** | `05-Screens/Landing` | NavBar · PrimaryHero (sage, protein render) · AboutNews · Models accordion + protein render (tierra-100) · PlatformFeatureSection (dark) · CommunitySection · Footer |
| **Platform** | `05-Screens/Platform` | NavBar (dark) · PrimaryHero (dark, dashboard bleed) · AboutNews · SplitSection (products list) · Security FeatureGrid (sage-pale) · PricingSection · CommunitySection · Footer |
| **API** | `05-Screens/API` | NavBar · PrimaryHero (blue, protein render) · SplitSection + highlight card · TabBar + CodeBlock (use cases) · IntegrationsSection · ModelAccordion · PricingSection · CommunitySection · Footer |
| **Recent News** | `05-Screens/Recent news` | NavBar · PageHeader · FilterTabBar + view toggle · NewsItem grid · "Load more" TextButton · Footer |
| **Blog Post** | `05-Screens/Blog post` | NavBar · back link + badges · BlogThumbnail hero · article summary+CTA split · prose body · NewsGrid (related) · Footer |
| **Case Study** | `05-Screens/Case study` | NavBar · back link + badges · BlogThumbnail hero · article summary+CTA split · tabbed CodeBlock · PricingSection comparison · closing image · Footer |

---

## @boltz/ui component inventory

All components are exported from `packages/ui/src/index.ts`. Import as `import { X } from '@boltz/ui'`.

### Primitives

| Component | Export(s) | Purpose |
|---|---|---|
| **Logo** | `Logo`, `LogoMark` | Boltz wordmark SVG; `LogoMark` is mark-only |
| **Button** | `Button` | Full-pill CTA — variants: `black`, `white`, `outlined`; split label+circle structure |
| **TextButton** | `TextButton` | Inline text link with optional ↗ arrow |
| **IconButton** | `IconButton` | Square icon-only button |
| **EyebrowLabel** | `EyebrowLabel` | "• Section name" pill label — accepts leading icon |
| **Badge** | `Badge` | 28px filled pill — variants: `primary` (tierra-100), `sage`, `blue` |
| **Icon** | `Icon` | Thin wrapper around Iconoir SVG icons |
| **IconContainer** | `IconContainer` | 40px rounded square, light or dark variant |
| **NavBar** | `NavBar`, `NavLink` | Sticky navbar; `tone="light"\|"dark"` for light/dark hero; `NavLink` accepts `active` prop |
| **NavCta** | `NavCta` | "Get early access" filled black pill in nav |
| **CodeBlock** | `CodeBlock` | Syntax-highlighted code block with tab support; color variants |
| **Embed** | `Embed` | Responsive iframe embed |
| **Carousel** | `Carousel` | Horizontal scroll carousel |
| **Blob** | `Blob`, `BLOB_COUNT`, `BLOB_SHAPES` | Decorative SVG blob background shapes |
| **Thumbnail** | `Thumbnail`, `placeholderImage` | Generic image thumbnail |
| **BlogThumbnail** | `BlogThumbnail` | Article cover — tones: `sage`, `blue`, `tierra`; renders protein + blob |
| **ProgressBar** | `ProgressBar` | Horizontal progress/comparison bar |
| **MetricComparison** | `MetricComparison` | Side-by-side metric bar chart |
| **StatMetric** | `StatMetric`, `StatMetricRow` | Single stat value + label; row wrapper |

### Cards

| Component | Export(s) | Purpose |
|---|---|---|
| **Card** | `Card`, `CardSmall`, `CardMedium`, `CardWide`, `CardCaseStudy`, `CardGroup` | Full card family — `CardMedium` takes `color` prop (sage-dark, sage-medium, sage-light, blue-*, tierra-*); `CardWide` is the full-width dark CTA card; `CardCaseStudy` is the community case card |

### List & Tab items

| Component | Export(s) | Purpose |
|---|---|---|
| **ListItem** | `ListItem`, `ListItemApp`, `ListItemTab`, `ListItemTabGroup` | Feature list rows with icon; `ListItemTabGroup` is the persona/use-case switcher |
| **TabBar** | `TabBar`, `Tab`, `FilterTabBar`, `ViewToggle` | Generic tabs; `FilterTabBar` = news category filter with grid/list toggle |
| **Accordion** | `Accordion`, `AccordionItem`, `AccordionBadge`, `AccordionActions` | Radix-based accordion — used for model listings |

### Sections (page-band components)

| Component | Export(s) | Purpose |
|---|---|---|
| **Section** | `Section` | Generic section wrapper with background + padding tokens |
| **SectionHeader** | `SectionHeader` | Eyebrow + title + optional action row |
| **Hero** | `Hero` | Base hero band |
| **PrimaryHero** | `PrimaryHero` | Full marketing hero — `tone="sage"\|"blue"\|"dark"\|"tierra"`; accepts `heading`, `body`, `actions`, `media` |
| **SplitSection** | `SplitSection` | Two-column content+media split; `mediaPosition="left"\|"right"` |
| **AboutNews** | `AboutNews` | Left copy block + right news list with dividers; used for "About us" + latest posts |
| **FeatureGrid** | `FeatureGrid` | N-column icon+text feature grid |
| **CTABand** | `CTABand` | Full-width CTA band (e.g. "Partner with us" / "Join our team" rows) |
| **StatBand** | `StatBand` | Horizontal row of stat metrics |
| **NewsGrid** | `NewsGrid` | Responsive article card grid |
| **NewsItem** | `NewsItem` | Single article row or card (list or grid view) |
| **PageHeader** | `PageHeader` | Page-level title + subtitle (e.g. news index header) |
| **IntegrationsSection** | `IntegrationsSection` | Integration partner logo + name grid |
| **ModelAccordion** | `ModelAccordion` | Model listing accordion (BoltzMol, BoltzProt, Boltz-2) with badges |
| **ModelCard** | `ModelCard` | Standalone model card tile — tones: `sage`, `blue`, `tierra` |
| **PlatformFeatureSection** | `PlatformFeatureSection` | Dark platform hero card + 4-up feature cells + media slot |
| **CommunitySection** | `CommunitySection` | Case study card + StatBand + CTABand rows on sage-pale background |
| **PricingSection** | `PricingSection` | Tabbed pricing with use-case description + cost comparison bar chart |
| **LinkSection** | `LinkSection`, `LinkSectionRow` | Footer-style link column group |
| **Footer** | `Footer` | Site footer with logo + link columns |

---

## Domain glossary

- **Protein, ligand, binding pocket** — molecular structure terms (used in copy and visuals)
- **Model** — generic for Boltz's AI systems (BoltzMol, BoltzProt, Boltz-2)
- **Lab** — interactive platform for trying models ("Try Boltz Lab")
- **Stack** — Boltz's integration/tooling layer
- **Frontier** — internal positioning term, frequently in copy

---

## What MUST NOT exist on Boltz

- Cold SaaS aesthetic (blue CTAs, white-only canvas, rectangular buttons, drop shadows)
- Social/gamification features (likes, badges, points)
- Marketing enthusiasm — never "awesome", "delightful", "amazing", "incredible"
- Bold weight emphasis mid-sentence (no `<strong>` in headings)
- Stock photos of scientists or labs

## What MUST exist

- Stabil Grotesk Regular 400 throughout (single weight)
- Eyebrow labels ("• Section name") before major section headings
- ↗ arrow suffix on CTA text (typographic or icon-button variant)
- One black CTA per viewport band
- Protein render in hero (brand's atmospheric anchor)
- Warm temperature: Tierra-50 / Sage / Blue canvases — never cold blue tint

---

## TODO — to be filled in by kollega + stakeholder

- [ ] Confirm audience prioritization (scientists vs developers — which leads landing copy?)
- [ ] List of competitor products to differentiate from (DeepMind AlphaFold, etc.)
- [ ] Models in production vs roadmap (so AI knows what's mentionable)
- [ ] Partner names to mention by default (logos, case studies)
- [ ] Internal naming conventions for new model releases
