---
version: "1.3"
name: boltz-bio-design-spec
description: |
  Boltz is a frontier AI research company for biomolecular design. The website carries three strategic messages in priority order: (1) Frontier Capabilities — state-of-the-art models and research credibility; (2) Flexibility/Modularity — engineering quality and usability that differentiates Boltz from academic models; (3) Popularity/Distribution — community scale and ecosystem breadth as social proof. Content decisions, section order, and hero copy must reinforce these in sequence.

  The visual identity is grounded in biology and warmth. White is the default page canvas. Sections alternate between Sage, Blue, and Tierra tones for rhythm — never two identical-background bands adjacent. Three brand colour families: Sage (atmospheric — molecular render, dark feature cards, section tints), Blue (secondary — technical/API contexts, cool-toned sections), and Tierra (secondary — warm earthy canvas and surface warmth). Neutral black (#232323) is the sole action colour: all primary CTA buttons use black fill.

  Stabil Grotesk Regular (400) is the only typeface for all UI text, at a six-token scale: heading-lg (56px), heading-md (32px), heading-sm (24px), body-lg (20px), body-md (18px), body-sm (15px). IBM Plex Mono for code blocks only. Iconoir for all icons. Buttons are full-pill (9999px radius) — no exceptions. Cards use 16px radius. No drop shadows — depth comes from background contrast only. No dark mode.

  Motion is purposeful and minimal: duration-fast (100ms) for colour swaps, duration-base (200ms) for state changes, duration-slow (350ms) for accordion/modal transitions, all on cubic-bezier(0.4, 0, 0.2, 1). Buttons scale to 0.97 on press. The protein render rotates on a 12s loop. Semantic status colours (error #CC4444, warning #C97B22, success #2D7A3F, info #2E6DA4) are used only for inline validation and system feedback — never as brand fills.

  An AI generating new Boltz assets can: (1) use either of tierra, blue and sage colors as section backgrounds (2) must use neutral black (#232323) for all primary CTA buttons (3) keep all interactive elements full-pill — no rectangular buttons; (4) prefix major section headlines with an eyebrow label in the format "• Section name" (sentence case, bullet as literal content character); (5) sequence page content to lead with capability claims before community stats. The brand fails when it looks like cold SaaS (blue CTAs, white canvas, rectangular buttons, drop shadows) or loses the warm earthy surface temperature.

colors:
  # Background & Surface
  surface-primary: "#FBFAF7"        # Tierra-50 — warm tinted sections (not the default canvas)
  surface-secondary: "#F0EFEC"      # Warm grey — alternating section bands
  surface-tertiary: "#E8E7E3"       # Slightly darker grey — footer-adjacent sections
  surface-card-light: "#FFFFFF"     # White — light feature cards
  surface-card-blue: "#EEF6FA"      # Alias of blue-pale — blue-tinted feature cards. Use either token; values are identical.
  surface-card-dark: "#232323"      # Black — dark feature cards and hero CTA card

  # Text
  text-primary: "#232323"           # Black — all primary headings and body
  text-secondary: "#505050"         # Grey-500 — secondary body text and metadata
  text-muted: "#7E7E7E"             # Grey-200 — placeholder, captions, disabled
  text-on-dark: "#FFFFFF"           # On dark cards and nav CTA

  # Action
  cta-primary: "#232323"            # Neutral black — primary CTA fill (all primary buttons)

  # Brand — Sage (Atmospheric)
  sage-dark: "#003014"              # Dark feature cards; dark section accents — NOT used for buttons
  sage-medium: "#C6E5C6"            # Light sage — molecular render tones; passive accents
  sage-light: "#D9EED9"             # Very light sage — subtle tinted backgrounds
  sage-pale: "#EDF7ED"              # Near-white sage — soft tinted chips/badges

  # Brand — Blue (Secondary)
  blue-dark: "#142D36"              # Deep blue-green — dark card variant
  blue-medium: "#C7E3EE"            # Sky blue — secondary feature highlights
  blue-light: "#E5F2F7"             # Very light blue — secondary tinted backgrounds
  blue-pale: "#EEF6FA"              # Near-white blue — card backgrounds (Blue-Pale)

  # Brand — Tierra (Secondary)
  tierra-500: "#DACAB0"             # Warm tan — decorative accents, illustrative use
  tierra-200: "#EEE7DB"             # Warm light beige — dividers and warm surfaces
  tierra-100: "#F7F2E9"             # Warm near-white — card and section backgrounds
  tierra-50: "#FBFAF7"              # Near-white warm — primary page canvas (= surface-primary)

  # Neutrals
  neutral-white: "#FFFFFF"
  neutral-black: "#232323"          # Primary CTA fill — the brand's action colour
  neutral-grey-500: "#505050"
  neutral-grey-200: "#7E7E7E"
  neutral-grey-100: "#D9D9D9"

  # Borders & Dividers
  border-light: "#D9D9D9"           # Grey-100 — card borders on light backgrounds
  border-warm: "#EEE7DB"            # Tierra-200 — warm dividers on Tierra surfaces
  border-dark: "#333333"            # Dark borders on dark cards

  # Semantic — Status
  status-error:          "#CC4444"  # Error — destructive actions, validation failures
  status-error-surface:  "#FDF2F2"  # Error background — inline error states
  status-warning:        "#C97B22"  # Warning — advisory states
  status-warning-surface:"#FDF6ED"  # Warning background
  status-success:        "#2D7A3F"  # Success — confirmations, completed states
  status-success-surface:"#F0FAF2"  # Success background
  status-info:           "#2E6DA4"  # Info — neutral informational states
  status-info-surface:   "#EFF5FB"  # Info background

typography:
  # Official 6-token scale from Figma (node 58-108). Stabil Grotesk Regular (400) only.

  heading-lg:
    fontFamily: "Stabil Grotesk"
    fontSize: "56px"
    fontWeight: 400
    lineHeight: 1.00
    letterSpacing: "-1.0px"
    usage: "Hero headline, Section hero headline"

  heading-md:
    fontFamily: "Stabil Grotesk"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.20
    letterSpacing: "-0.5px"
    usage: "Large subheads, Section headings"

  heading-sm:
    fontFamily: "Stabil Grotesk"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.20
    letterSpacing: "-0.3px"
    usage: "Card headings"

  body-lg:
    fontFamily: "Stabil Grotesk"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: "normal"
    usage: "Hero body / intro copy, stat text"

  body-md:
    fontFamily: "Stabil Grotesk"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: "normal"
    usage: "Standard body, All button text"

  body-sm:
    fontFamily: "Stabil Grotesk"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.30
    letterSpacing: "normal"
    usage: "Small body / captions, Metadata, timestamps"

  eyebrow:
    fontFamily: "Stabil Grotesk"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.30
    letterSpacing: "normal"
    textTransform: "none"
    usage: "Section labels — body-sm (15px), normal tracking, no uppercase"

  mono-md:
    fontFamily: "IBM Plex Mono"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.60
    letterSpacing: "normal"
    usage: "Code blocks, API snippets, terminal output"

rounded:
  none: "0px"
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "24px"
  full: "9999px"   # THE canonical radius — all buttons, chips, and pill elements

spacing:
  xs: "4px"
  sm: "8px"       # connected card gap, tight component gaps
  md: "16px"      # small/compact card padding
  lg: "24px"      # standalone card gap, medium card padding
  xl: "40px"      # full-size card internal padding
  2xl: "80px"     # sub-section separation
  3xl: "120px"    # section vertical padding
  section: "160px" # hero vertical padding

motion:
  duration-fast:    "100ms"
  duration-base:    "200ms"
  duration-slow:    "350ms"
  easing-standard: "cubic-bezier(0.4, 0, 0.2, 1)"
  easing-out:      "cubic-bezier(0.0, 0, 0.2, 1)"
  active-scale:    "0.97"    # Button press / tap scale-down
  render-rotation: "12s"     # Protein render full-rotation period (gentle loop)

components:
  # Notation: {colors.x} → var(--x) in CSS  |  {typography.x} → font-size/line-height vars  |  {rounded.x} → var(--rounded-x)  |  {spacing.x} → var(--space-x)
  # Hover states are NOT documented. Default and active/pressed states only.
  # All values reference tokens. One primary CTA per viewport band.

  button-primary:
    backgroundColor: "{colors.neutral-black}"
    textColor: "{colors.text-on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "10px 18px"
    border: "none"
    iconSuffix: "↗ arrow, same size as text"

  button-primary-active:
    backgroundColor: "#111111"
    textColor: "{colors.text-on-dark}"

  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "9px 17px"
    border: "1px solid {colors.border-light}"
    iconSuffix: "↗ arrow, same size as text"

  button-secondary-active:
    backgroundColor: "{colors.surface-secondary}"
    border: "1px solid {colors.neutral-grey-500}"

  card-dark:
    backgroundColor: "{colors.surface-card-dark}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "none"
    # The signature dark feature card — used for "Try Boltz Lab" primary CTA block

  card-light:
    backgroundColor: "{colors.surface-card-light}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border-light}"

  card-blue:
    backgroundColor: "{colors.surface-card-blue}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "none"

  card-dark-active:
    backgroundColor: "#1a1a1a"

  icon-container:
    backgroundColor: "{colors.surface-secondary}"
    rounded: "{rounded.md}"
    size: "40px"
    iconColor: "{colors.text-secondary}"

  icon-container-dark:
    backgroundColor: "rgba(255,255,255,0.10)"
    rounded: "{rounded.md}"
    size: "40px"
    iconColor: "{colors.text-on-dark}"

  eyebrow-label:
    # Signature component — the bullet-prefixed section label
    # Format: "• Section name" — bullet dot, space, sentence case text
    typography: "{typography.eyebrow}"
    textColor: "{colors.text-secondary}"
    bulletColor: "{colors.sage-dark}"
    backgroundColor: "transparent"
    padding: "4px 10px"
    border: "1px solid {colors.border-light}"
    rounded: "{rounded.full}"
    # Note: the bullet dot (•) is part of the label content, not a CSS pseudo-element

  tag-dark:
    textColor: "rgba(255,255,255,0.60)"
    bulletColor: "{colors.sage-medium}"
    border: "1px solid rgba(255,255,255,0.15)"

  stat-chip:
    # Signature component — metric badges (e.g. "GitHub 4K+ Stars")
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: "8px 14px"
    border: "1px solid {colors.border-light}"
    iconLeading: "service icon (GitHub, Slack) at 16px"

  stat-chip-active:
    backgroundColor: "{colors.surface-secondary}"

  nav-bar:
    backgroundColor: "{colors.neutral-white}"
    height: "60px"
    padding: "0 40px"
    borderBottom: "1px solid {colors.border-light}"
    position: "sticky top-0"
    maxWidth: "1328px"
    layout: "logo left · nav-items-group right"

  nav-link:
    # Outlined pill — 36px tall, 20px horizontal padding, 1px black border
    # Active state: no fill change — only text colour shifts to text-primary (no bg)
    height: "36px"
    padding: "0 20px"
    borderRadius: "44px"
    border: "1px solid {colors.neutral-black}"
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    activeTextColor: "{colors.text-primary}"
    activeBackgroundColor: "transparent"   # no fill on active — text-only state change
    typography: "{typography.body-sm}"

  nav-items-group:
    # Platform | API | News | CTA — 4px gap between items
    display: "flex"
    gap: "4px"
    alignItems: "center"

  nav-cta:
    # "Get early access ↗" — filled black pill, 36px tall
    height: "36px"
    padding: "0 20px"
    borderRadius: "44px"
    backgroundColor: "{colors.neutral-black}"
    textColor: "{colors.text-on-dark}"
    typography: "{typography.body-sm}"
    gap: "8px"

  hero-band:
    backgroundColor: "{colors.surface-primary}"
    layout: "two-column — text left, 3D molecular render right (full bleed, overflowing)"
    paddingTop: "{spacing.section}"
    paddingBottom: "{spacing.section}"

  section-band:
    backgroundColor: "{colors.surface-secondary}"
    paddingTop: "{spacing.3xl}"
    paddingBottom: "{spacing.3xl}"

  section-band-warm:
    backgroundColor: "{colors.surface-primary}"
    paddingTop: "{spacing.3xl}"
    paddingBottom: "{spacing.3xl}"

  footer-band:
    backgroundColor: "{colors.surface-tertiary}"
    paddingTop: "{spacing.xl}"
    paddingBottom: "{spacing.xl}"

  # Standard extension components
  ex-pricing-tier:
    backgroundColor: "{colors.surface-card-light}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border-light}"
    headerTypography: "{typography.heading-md}"
    priceTypography: "{typography.heading-md}"

  ex-pricing-tier-featured:
    backgroundColor: "{colors.sage-dark}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "none"

  ex-modal-card:
    backgroundColor: "{colors.surface-card-light}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.border-light}"
    overlay: "rgba(35,35,35,0.40)"

  ex-auth-form-card:
    backgroundColor: "{colors.surface-card-light}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.border-light}"

  ex-data-table-cell:
    backgroundColor: "transparent"
    borderBottom: "1px solid {colors.border-light}"
    padding: "12px {spacing.md}"
    typography: "{typography.body-md}"
    textColor: "{colors.text-primary}"

  ex-app-shell-row:
    backgroundColor: "{colors.surface-primary}"
    borderBottom: "1px solid {colors.border-light}"
    padding: "{spacing.md} {spacing.lg}"

  ex-empty-state-card:
    backgroundColor: "{colors.surface-secondary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.2xl}"
    border: "1px dashed {colors.border-light}"
    textColor: "{colors.text-muted}"

  ex-toast:
    backgroundColor: "{colors.surface-card-dark}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.full}"
    padding: "10px 18px"
    shadow: "0 4px 16px rgba(0,0,0,0.16)"

  badge:
    # 28px tall, filled pill, NO border — Figma node 2060-5567
    # H: 28, padding: 12px horizontal, border-radius: 44px, fill only
    height: "28px"
    padding: "0 12px"
    borderRadius: "44px"
    border: "none"  # no border — filled background only
    typography: "{typography.body-sm}"
    textColor: "{colors.text-primary}"

  badge-tierra:
    backgroundColor: "{colors.neutral-tierra-100}"   # #F7F2E9 — warm

  badge-sage:
    backgroundColor: "{colors.sage-medium}"           # #C6E5C6 — green

  badge-blue:
    backgroundColor: "{colors.blue-light}"            # #E5F2F7 — blue

  ex-section-eyebrow:
    # See eyebrow-label component above — this is the standard implementation
    uses: "{components.tag}"

  featured-article-card:
    # Full-width dark featured post — typically pinned above an article grid
    backgroundColor: "{colors.sage-dark}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"  # 40px
    border: "none"
    headlineTypography: "{typography.heading-lg}"
    bodyTypography: "{typography.body-md}"
    ctaVariant: "button-secondary on dark — white border/text"

  filter-tab:
    # Active/selected state — "Latest" filter
    backgroundColor: "{colors.sage-dark}"
    textColor: "{colors.text-on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "7px 14px"
    border: "none"

  filter-tab-inactive:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "6px 13px"
    border: "1px solid {colors.border-light}"

  article-card:
    # News grid card — cover image top, meta below
    backgroundColor: "{colors.surface-card-light}"
    rounded: "{rounded.lg}"
    border: "none"
    overflow: "hidden"
    coverHeight: "200px"
    # Cover background varies by article type (see Cover Types below)
    # Cover types:
    #   sage:    bg {colors.sage-light}, protein render + title overlay
    #   tierra:  bg {colors.neutral-tierra-100}, title text + Boltz logo
    #   partner: bg {colors.blue-pale}, two partner logos side-by-side
    #   collab:  bg {colors.sage-pale}, Boltz + partner logo + line art
    metaPadding: "{spacing.md} 0 0 0"
    titleTypography: "{typography.body-md}"
    titleFontWeight: 500
    metaTypography: "{typography.body-sm}"
    metaColor: "{colors.text-muted}"
    # Meta format: "Category · Date" — category in text-secondary, dot separator, date in text-muted

  article-list-row:
    # Alternative list view on news page
    backgroundColor: "transparent"
    borderBottom: "1px solid {colors.border-light}"
    padding: "{spacing.md} 0"
    categoryTypography: "{typography.body-sm}"
    categoryColor: "{colors.text-muted}"
    titleTypography: "{typography.body-md}"
    titleFontWeight: 500
    dateTypography: "{typography.body-sm}"
    dateColor: "{colors.text-muted}"
    layout: "category left · title center · date right"

  partner-logo-strip:
    # Horizontal marquee of partner/customer logos
    backgroundColor: "{colors.surface-primary}"
    paddingY: "{spacing.xl}"
    logoColor: "{colors.neutral-grey-200}"  # logos rendered as muted grey
    logoHeight: "20px"
    gap: "{spacing.2xl}"
    overflow: "auto-scroll marquee"

  model-accordion-item:
    # Expandable model entry — BotzMol 1.1, BotzProt 1.1, Boltz-2
    backgroundColor: "transparent"
    borderBottom: "1px solid {colors.border-light}"
    padding: "{spacing.md} 0"
    headerTypography: "{typography.heading-md}"
    headerFontWeight: 400
    badgeStyle: "{components.ex-badge-pill}"
    expandIcon: "+ / −"
    # Expanded state shows: description text + two CTA buttons (filled + outlined)
    expandedBodyTypography: "{typography.body-md}"
    expandedBodyColor: "{colors.text-secondary}"

  case-study-card-light:
    # Customer story card — light sage variant (e.g. Pfizer)
    backgroundColor: "{colors.sage-pale}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "none"
    logoHeight: "20px"
    bodyTypography: "{typography.body-md}"
    ctaVariant: "button-secondary"

  case-study-card-dark:
    # Customer story card — dark sage variant (e.g. dsm-firmenich)
    backgroundColor: "{colors.sage-dark}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "none"
    logoHeight: "20px"
    bodyTypography: "{typography.body-md}"
    ctaVariant: "button-secondary on dark"

  stats-metric-item:
    # One stat in the 4-up metrics row
    valueTypography: "{typography.heading-sm}"
    valueFontWeight: 400
    labelTypography: "{typography.body-sm}"
    labelColor: "{colors.text-secondary}"
    layout: "stacked — value above, label below"

  feature-column:
    # One column in the 4-up feature icon grid
    iconContainer: "{components.icon-container}"
    titleTypography: "{typography.body-md}"
    titleFontWeight: 500
    bodyTypography: "{typography.body-sm}"
    bodyColor: "{colors.text-secondary}"
    layout: "icon top, title, body — centered or left-aligned"

  hero-band-blue:
    # Hero band variant — uses blue-pale canvas instead of warm cream
    backgroundColor: "{colors.blue-pale}"
    layout: "two-column — text left, protein render right"
    paddingTop: "{spacing.section}"
    paddingBottom: "{spacing.section}"

  vertical-tab-switcher:
    # Scientists / Developers / Agents tab interface
    tabWidth: "200px"
    tabPadding: "{spacing.md}"
    tabTypography: "{typography.body-md}"
    tabFontWeight: 500
    tabColor: "{colors.text-secondary}"
    tabActiveColor: "{colors.text-primary}"
    tabActiveBorder: "2px solid {colors.sage-dark} on left edge"
    contentBackground: "{colors.surface-secondary}"
    contentRounded: "{rounded.lg}"
    contentPadding: "{spacing.lg}"

  code-block:
    # Python / code snippet display
    backgroundColor: "{colors.neutral-tierra-100}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    fontFamily: "IBM Plex Mono"
    fontSize: "13px"
    lineHeight: 1.6
    keywordColor: "{colors.sage-dark}"
    stringColor: "{colors.blue-dark}"
    commentColor: "{colors.text-muted}"
    defaultTextColor: "{colors.text-primary}"

  integration-partner-card:
    # Partner logo + name + description grid item
    backgroundColor: "{colors.surface-card-light}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
    border: "1px solid {colors.border-light}"
    logoSize: "32px"
    nameTypography: "{typography.body-md}"
    nameFontWeight: 500
    descTypography: "{typography.body-sm}"
    descColor: "{colors.text-secondary}"

  pricing-use-case-row:
    # Left side of pricing section — use case + description
    iconContainer: "{components.icon-container}"
    titleTypography: "{typography.body-md}"
    titleFontWeight: 500
    descTypography: "{typography.body-sm}"
    descColor: "{colors.text-secondary}"
    borderBottom: "1px solid {colors.border-light}"
    padding: "{spacing.md} 0"

  pricing-comparison-table:
    # Right side of pricing section — cost breakdown
    backgroundColor: "{colors.surface-secondary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    headerTypography: "{typography.body-sm}"
    headerColor: "{colors.text-muted}"
    valueTypography: "{typography.heading-md}"
    rowBorderBottom: "1px solid {colors.border-light}"
    # Bar chart: progress bars using {colors.sage-medium} fill, {colors.border-light} track

  card-wide:
    # Big/wide card — only used 1 per row or section
    # Two variants: with image (no button) or no image (with button)
    backgroundColor: "{colors.neutral-black}"
    borderRadius: "{rounded.lg}"  # 16px
    padding: "40px"              # same as full-size card padding
    textColor: "{colors.text-on-dark}"
    layout: "content left (max 480px) + optional image right (overflows bottom)"
    heading: "{typography.heading-md} — white"
    body: "{typography.body-md} — rgba(255,255,255,0.55)"
    tag: "{components.tag-dark}"
    button: "{components.button-white}  (variant without image only)"
    imageOverflow: "image margin-bottom: -40px — bleeds past card bottom edge"

  hero-band-dark:
    # Hero band variant — dark/near-black with UI screenshot
    backgroundColor: "{colors.surface-card-dark}"
    textColor: "{colors.text-on-dark}"
    layout: "two-column — text left, UI mockup screenshot right"
    paddingTop: "{spacing.section}"
    paddingBottom: "{spacing.section}"
    screenshotStyle: "desktop monitor frame with app screenshot"

  security-tab-switcher:
    # Data Security / Privacy / IP & Ownership tabs
    # Same pattern as vertical-tab-switcher but horizontal
    tabPadding: "{spacing.lg}"
    tabTypography: "{typography.heading-md}"
    tabFontWeight: 400
    tabColor: "{colors.text-secondary}"
    tabActiveColor: "{colors.text-primary}"
    tabActiveBackground: "{colors.surface-card-light}"
    tabActiveRounded: "{rounded.lg}"
    contentTypography: "{typography.body-md}"

  article-breadcrumb:
    # "← Back" + category pill + date pill row
    backLinkTypography: "{typography.body-sm}"
    backLinkColor: "{colors.text-secondary}"
    categoryPill:
      typography: "{typography.caption}"
      rounded: "{rounded.full}"
      padding: "3px 10px"
      border: "1px solid {colors.border-light}"
      color: "{colors.text-secondary}"
    datePill:
      typography: "{typography.caption}"
      rounded: "{rounded.full}"
      padding: "3px 10px"
      border: "1px solid {colors.border-light}"
      color: "{colors.text-muted}"
    gap: "{spacing.sm}"

  article-meta-row:
    # Author line (left) + social share icons (right)
    authorTypography: "{typography.body-sm}"
    authorColor: "{colors.text-muted}"
    shareIconSize: "16px"
    shareIconColor: "{colors.text-muted}"
    layout: "space-between — author left, icons right"
    borderBottom: "1px solid {colors.border-light}"
    paddingBottom: "{spacing.md}"

  article-summary-block:
    # Two-column summary — bold abstract left, CTAs right
    leftTypography: "{typography.body-lg}"
    leftFontWeight: 400
    leftColor: "{colors.text-primary}"
    # Summary block bold: achieved via a <strong> element, not a heavier weight
    rightLayout: "stacked — primary CTA button above, text link below"
    rightCta: "{components.button-primary}"
    rightTextLink:
      typography: "{typography.body-sm}"
      color: "{colors.text-secondary}"
      textDecoration: "none"
    paddingY: "{spacing.xl}"
    borderTop: "1px solid {colors.border-light}"

  footer-cta-row:
    # Horizontal CTA row — "Partner with us" / "Join our team"
    layout: "space-between — text block left, button right"
    titleTypography: "{typography.heading-md}"
    bodyTypography: "{typography.body-md}"
    bodyColor: "{colors.text-secondary}"
    button: "{components.button-secondary}"
    borderTop: "1px solid {colors.border-light}"
    paddingY: "{spacing.xl}"

  footer:
    backgroundColor: "{colors.surface-primary}"
    borderTop: "1px solid {colors.border-light}"
    paddingY: "{spacing.xl}"
    logoSize: "standard wordmark"
    layout: "logo left + link columns right"
    # Two column groups:
    # Group 1: Career, News, Pricing, Legal
    # Group 2: GitHub, LinkedIn, Slack (or GitHub, Models, Stack, About)
    linkTypography: "{typography.body-sm}"
    linkColor: "{colors.text-secondary}"
    copyrightTypography: "{typography.caption}"
    copyrightColor: "{colors.text-muted}"

  input-default:
    backgroundColor: "{colors.surface-card-light}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "10px 16px"
    border: "1px solid {colors.border-light}"
    placeholderColor: "{colors.text-muted}"

  input-focus:
    border: "1px solid {colors.sage-dark}"
    outline: "2px solid rgba(0,48,20,0.12)"

  input-error:
    border: "1px solid #CC4444"
---

## Strategic Messaging

The website is built around three strategic messages, in strict priority order. Every page, section, and content decision should reinforce these — in this sequence. When a section can only serve one, serve the highest-ranked one it can.

**1. Frontier Capabilities** *(highest priority)*
Position Boltz as a frontier AI research lab with state-of-the-art models and capabilities. This is the primary claim the brand must make before anything else. Headlines, hero copy, and model sections should lead with capability and research credibility. Quantified benchmarks, model names, and technical precision are all signals of this message.

**2. Flexibility / Modularity**
Differentiate Boltz from academic models and pure-research companies by highlighting engineering quality, usability, and modularity. Boltz is the infrastructure layer — "the foundation" — not just a paper or a demo. This message lives in the API, Platform, and integration sections. Language: "production-ready", "high-performance infrastructure", "built to integrate". Engineers and developers are the audience for this pillar.

**3. Popularity / Distribution**
Social proof through community scale and ecosystem breadth. A large, diverse, and enthusiastic user base counters competitors and validates the product. This message lives in community stats (GitHub stars, Slack members), partner logos, case studies, and integration grids. It is the third impression, not the first.

**Content rules derived from this hierarchy:**
- Hero headlines lead with capability claims, not community stats
- The model accordion and API sections are Pillar 2 territory — lead with engineering language
- Community/stats sections appear after product sections, never before
- Case studies and partner logos reinforce Pillar 3 and should cite specific outcomes where possible
- Never lead a page with a stat chip or partner logo strip before a capability statement has been made

---

## Logo

The Boltz wordmark is a single SVG combining the stylised B-mark (two strokes) with the logotype "Boltz". File: `boltz-logo.svg`.

All paths use `fill` directly. To switch variants, change the fill on all paths.

| Variant | Fill | Use on |
|---|---|---|
| Primary | `#232323` | All light surfaces (Tierra-50, white, pale/light bands) |
| Reversed | `#FFFFFF` | Dark surfaces (Sage-Dark, Blue-Dark, Black, dark bands) |

**Clearspace:** Equal to the full wordmark height (22px) on all sides.
**Minimum width:** 60px rendered.

**Never:**
- Recolour to anything other than `#232323` or `#FFFFFF`
- Stretch, skew, or change viewBox proportions
- Apply shadows, outlines, or opacity effects
- Place dark logo on dark surface or white logo on white surface
- Recreate in type — always use `boltz-logo.svg`

---

## Colors

### Background & Surface

The default page canvas is white. Section and hero backgrounds can freely use any shade from the Tierra, Sage, or Blue colour families — there is no restriction on which family belongs to which page or section. Choose based on the tone the content calls for: Tierra for warm and earthy warmth, Sage for biological and atmospheric contexts, Blue for technical and cool-toned sections.

The lightest shades (Tierra-50 #FBFAF7, Sage-Pale #EDF7ED, Blue-Pale #EEF6FA) work as gentle section washes. Mid shades (Tierra-100, Sage-Light, Blue-Light) provide stronger tint. Avoid placing two identical-background bands directly adjacent — alternate to create visual rhythm.

### Text

Text lives in the near-black **#232323** (not true black) for softness. Secondary and metadata text uses **#505050** and **#7E7E7E** respectively. In combination of a header text and paragraph connected to that heading, **#505050** is used for the paragraph. Longer texts use **#505050** as the preferred colour. White text is reserved exclusively for dark-background contexts — the dark feature card and the primary nav CTA.

### Brand & Action

**Neutral black (#232323) is the brand's action colour** — the fill for all primary CTA buttons, the nav CTA, and any interactive element that needs a filled state. It gives CTAs authority without screaming.

**Sage** is an atmospheric brand colour. It tones the molecular render, tints section backgrounds, and fills dark feature cards (sage-dark). It is never used as a button fill — sage-dark on a button is wrong.

**Blue** and **Tierra** are both secondary brand colours. Blue suits technical/API contexts and cool-toned sections. Tierra provides the warm earthy warmth of the canvas and decorative surfaces. Neither is an action colour.

### Accent boundary

Black is the sole action accent. One primary black CTA per viewport band. Sage, Blue, and Tierra do atmosphere and surfaces — never CTAs.

---

## Typography

### Stabil Grotesk

**Classification:** Geometric sans-serif with humanist refinements  
**Why chosen:** Stabil Grotesk has the mathematical clarity of a geometric sans but with slightly warmer, more organic curves. At display sizes it conveys scientific precision; at body sizes it reads naturally. The name itself — "Stable Grotesque" — maps to Boltz's positioning: grounded, not showy.  
**License:** Proprietary OTF — self-hosted only. File: `StabilGrotesk-Regular.otf`. Not on Google Fonts, Adobe Fonts, or any CDN.  
**Weight in use:** Regular (400) only. No Medium, no Bold, no other weights.  
**Open-source substitute (emergency only):** [Inter](https://fonts.google.com/specimen/Inter) Regular (400). Reduce letter-spacing by 0.02em at display sizes. This is a last resort — the brand font must be used in all real deliverables.  
**Fallback stack:** `"Stabil Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`  
**Role:** Universal — every text element on every page uses Stabil Grotesk Regular  
**When NOT to use:** Never below 11px. Never in code blocks or monospace contexts — use IBM Plex Mono there.

### IBM Plex Mono

**Classification:** Monospace  
**Why chosen:** Clean, neutral monospace that doesn't compete with Stabil Grotesk. Carries the technical credibility of IBM's open-source type family.  
**License:** Open source (SIL Open Font License) — available on [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Mono)  
**CDN load:** `<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap" rel="stylesheet">`  
**Role:** Code blocks, API snippets, terminal output, molecular formula strings  
**When NOT to use:** Never for UI text, headings, labels, or body copy — Stabil Grotesk only for all non-code text.

### Iconoir

**Icon library:** [Iconoir](https://iconoir.com/) — open source SVG icon set  
**Style:** Thin stroke, 1.5px stroke width, rounded line caps  
**Default size:** 20px (inline icons), 24px (standalone/feature icons)  
**Color:** Inherits `currentColor` — set via parent text color token  
**CDN:** `https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css`  
**Usage rule:** Always use Iconoir SVGs — never use emoji, Font Awesome, Material Icons, or any other icon set. Icon sizes must be 20px or 24px; never 16px or below in UI contexts.

### Type scale

Official 6-token scale confirmed in Figma (node 58-108). All Regular (400), all Stabil Grotesk.

| Token | Size | Line Height | Tracking | Usage |
|---|---|---|---|---|
| `heading-lg` | 56px | 1.00 | −1.0px | Hero headline, Section hero headline |
| `heading-md` | 32px | 1.20 | −0.5px | Large subheads, Section headings |
| `heading-sm` | 24px | 1.20 | −0.3px | Card headings |
| `body-lg` | 20px | 1.40 | normal | Hero body / intro copy, stat text |
| `body-md` | 18px | 1.40 | normal | Standard body, **all button text** |
| `body-sm` | 15px | 1.30 | normal | Small body / captions, metadata |
| `eyebrow` *(derived)* | 15px | 1.30 | normal | Section labels — body-sm, sentence case |
| `mono-md` | 13px | 1.60 | normal | Code blocks (IBM Plex Mono) |

> **Button text = `body-md` (18px).** No separate button token exists. All CTAs and nav links use `{typography.body-md}`.

### Typography rules

1. **Single weight:** Regular (400) only throughout — no Medium, no Bold, no Black. The brand conveys confidence through scale and spacing, not stroke weight.
2. **Six tokens only:** Use only `heading-lg`, `heading-md`, `heading-sm`, `body-lg`, `body-md`, `body-sm`. Do not invent intermediate sizes outside this scale.
3. **Button text = `body-md`:** All CTAs, nav pills, and filter tabs use `{typography.body-md}` (18px). There is no separate button token.
4. **Eyebrow case:** `{typography.eyebrow}` uses sentence case — not all-caps. Always preceded by a bullet dot "•". Example: "• Our models", "• Platform", "• Community".
5. **Negative tracking on headings:** heading-lg (−1.0px), heading-md (−0.5px), heading-sm (−0.3px). Never positive tracking on headings.
6. **No weight mixing in a single text block:** A headline doesn't get a weight-600 word emphasis mid-sentence. Use a separate element if emphasis is needed.
5. **Line length:** Body text should not exceed 65 characters per line. Use max-width constraints on content columns.
6. **Arrow suffix on CTAs:** All call-to-action text ends with a ↗ arrow character (U+2197), same size as the button text, no extra margin — this is typographic, not an icon.

---

## Layout

### Spacing scale

| Token | Value | Usage |
|---|---|---|
| `xs` | 4px | Tight gaps, icon padding |
| `sm` | 8px | Connected card gap, internal component gaps |
| `md` | 16px | Small card internal padding, compact components |
| `lg` | 24px | Standard card internal padding (small cards), standalone card gap |
| `xl` | 40px | Standard card internal padding (full-size cards) |
| `2xl` | 80px | Sub-section separation |
| `3xl` | 120px | Section padding (top/bottom) |
| `section` | 160px | Hero section padding |

### Card spacing rules

**Internal padding:**
- Full-size cards (case study cards, featured article card, dark platform card): `40px` (`{spacing.xl}`) on all sides
- Medium cards (feature columns, model cards): `24px` (`{spacing.lg}`)
- Compact/small cards: `16px` (`{spacing.md}`) — use when the card is visually small or on mobile

**Gap between cards:**
- **Connected cards** — cards that share a visual group and touch with minimal separation (e.g. security tab switcher, feature row): `8px` (`{spacing.sm}`). The cards read as a single compound element.
- **Standalone cards** — cards that are visually independent with clear breathing room between them (e.g. case study pair, article card grid): `24px` (`{spacing.lg}`).

```
Connected (8px gap):          Standalone (24px gap):
┌──────┐┌──────┐┌──────┐      ┌──────┐      ┌──────┐
│  A   ││  B   ││  C   │      │  A   │      │  B   │
└──────┘└──────┘└──────┘      └──────┘      └──────┘
```

**Responsive adjustment:** At mobile (<768px), full-size card padding reduces from `40px` to `24px`. Card gaps hold at their defined values.

### Grid & containers

The desktop grid is **12 columns × 96px** with a **20px gutter**, contained within a **1328px max-width** wrapper. All page layouts are designed against this grid.

| Context | Max width | Columns | Col width | Gutter |
|---|---|---|---|---|
| Page container | 1328px | 12 | 96px | 20px |
| Text / article body | 740px | — | — | — |
| Hero text column | ~6 cols (~636px) | 6 | 96px | 20px |

**CSS implementation:**
```css
.container {
  max-width: 1328px;
  margin: 0 auto;
  padding: 0 40px;   /* side padding below 1408px viewport */
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 20px;
  /* At full 1328px container: each column resolves to ~96px */
}
```

**Responsive column counts:**

| Breakpoint | Viewport | Columns | Gutter | Container padding |
|---|---|---|---|---|
| Desktop | ≥ 1328px | 12 | 20px | 40px each side |
| Laptop | 1024–1327px | 12 | 20px | 40px each side (cols scale fluidly) |
| Tablet | 768–1023px | 8 | 20px | 32px each side |
| Mobile | < 768px | 4 | 16px | 20px each side |

### Page band rhythm

White (`#FFFFFF`) is the default page canvas. Sections use Sage, Blue, or Tierra colours to create atmosphere and visual rhythm. Avoid placing two identical-background bands directly adjacent.

**Sage** is the primary section colour — Sage-Pale (#EDF7ED) and Sage-Light (#D9EED9) are the most commonly used section backgrounds across all pages (Community, Security, features, models).

**Blue** can be used throughout the website, not restricted to a single page. Blue-Pale (#EEF6FA) and Blue-Light (#E5F2F7) suit pricing tables, API-related content, and any section that benefits from a cool tone.

**Tierra** tones (Tierra-50, Tierra-100, Tierra-200) suit warm sections — case studies, partner content, and community context.

**Black (#232323)** as a section background is reserved exclusively for platform-related contexts (Platform hero, platform feature dark bands). Not used as general page decoration.

### Whitespace philosophy

Not too much whitespace is the brand's signal of confidence. Sections should not feel cramped, but not too spacious either — a good middle ground. Content blocks sit with at minimum 120px vertical padding maximum. The hero's protein render deliberately extends beyond the grid edge — this intentional overflow is the brand's one architectural flourish.

---

## Elevation & Depth

Boltz uses an effectively **flat elevation system** — no drop shadows. The brand achieves visual hierarchy through background tone, border contrast, and layering, not shadow.

| Level | Method | Usage |
|---|---|---|
| Flat | No shadow, no border | Default page sections |
| Hairline | `1px solid {colors.border-light}` | Cards, inputs on warm backgrounds |
| Inset | Slightly darker background | Dark cards on light backgrounds |
| Overlay | `rgba(35,35,35,0.40)` backdrop | Modals and dialogs |

**Elevation philosophy:** Depth is conveyed through background polarity, not illumination simulation. A card doesn't float — it's differentiated. The dark card (#232323) gets depth through contrast, not a box-shadow.

---

## Shapes

| Token | Value | Usage |
|---|---|---|
| `none` | 0px | Tables, data grids |
| `sm` | 6px | Input fields (inner) |
| `md` | 10px | Icon containers |
| `lg` | 16px | Cards, feature blocks |
| `xl` | 24px | Modals, large containers |
| `full` | 9999px | **Buttons, chips, badges, stat pills** |

**Canonical radius: `{rounded.full}` (9999px).** This is the non-negotiable shape signature. Every interactive element — buttons, chips, stat badges, input fields when used as single-line pill inputs — uses full pill geometry. Cards use `{rounded.lg}`. There are no intermediate compromises.

**Shape philosophy:** The contrast between the sharp-to-rectangular grid structure and the full-pill interactive elements creates a visual rhythm. Content is architectural; interaction is organic.

---

## Atmosphere

**The Molecular Render**

Boltz's atmospheric element is a real-time-rendered 3D protein complex visualization: a large-scale soft-body metaball protein surface in sage-green tones, with a glowing cyan-white small molecule ligand nestled in the binding pocket. This is rendered at high fidelity and used as a full-bleed hero-right visual, cropped at the viewport edge.

**Characteristics:**
- Surface material: soft matte metaball spheres in `{colors.sage-medium}` to `{colors.sage-light}` tones
- Ligand: glowing cyan-white (#B8F0FF area), emissive quality
- Background: transparent — the protein floats on the surface-primary canvas
- Scale: enormous — the protein render fills roughly 60–65% of the viewport width at desktop
- Lighting: soft, diffuse, from upper-left; no harsh specular

**Usage rules:**
- The protein render appears only in the hero band, full scale
- Never crop it to a small thumbnail, icon, or card illustration
- Never use it on a dark background
- Never apply brand color overlays or filters — it must feel photographically real
- The render can be animated (gentle slow rotation) in interactive contexts
- Social and print treatments reference the render as a full-bleed visual — see Social Media section

---

## Components

> Hover states are not documented. Default and active/pressed states only. All values reference tokens. One `{colors.neutral-black}` primary CTA per viewport band.

See YAML `components` block above for full token-referenced specs. Key component notes:

**Eyebrow Label** (signature component): The icon-circle + text-pill compound label reading "• Section name" that precedes major section headlines. The bullet dot (•) is a literal content character, not a CSS pseudo-element. On light backgrounds use `{components.tag}`; on dark cards use `{components.tag-dark}`.

**Stat Chip** (signature component): The metric badge format used for community proof points ("GitHub 4K+ Stars", "Slack 5K+ Members"). Leading service icon, brand name, stat value in one pill. Outlined, no fill.

**Dark Feature Card** (signature component): A near-black (#232323) card block used as the primary platform CTA card. Contains the eyebrow label, a headline, and a body line — no button inside, the entire card is interactive.

**Button primary:** Full-pill, neutral-black (#232323) fill, white text, ↗ suffix. One per page band.

**Button secondary:** Full-pill, transparent fill, dark border, dark text, ↗ suffix. Used for secondary actions alongside the primary.

---

---

## Card Colour Usage

Cards use the Tierra, Blue, and Sage colour families across four shades (Pale → Light → Medium → Dark). The correct shade depends on the section background the card sits on.

### Shade selection by context

| Section background | Card shade to use |
|---|---|
| White / light neutral | Light, Medium, or Dark — never Pale |
| Sage-Pale (#EDF7ED) | Sage-Light, Sage-Medium, or Sage-Dark |
| Blue-Pale (#EEF6FA) | Blue-Light, Blue-Medium, or Blue-Dark |
| Tierra-100 (#F7F2E9) | Tierra-200, Tierra-500 |
| Dark (#232323) | Any pale/light — reverses to high contrast |

### Row rules

- **≤ 3 cards per row**: use different shades of the same colour family (e.g. Sage-Light + Sage-Medium)
- **> 3 cards per row**: use the same colour on all cards
- **Medium cards**: max 3 per row

### Text on cards

- Dark variants (Sage-Dark, Blue-Dark, Black): white text (`text-on-dark`)
- All pale/light/medium variants: dark text (`text-primary` #232323)

---

## Do's and Don'ts

### Do
- Use white as the default page canvas
- Prefix most section headlines with an eyebrow label using the "• Section name" format — not required on every section, but preferred
- Use `{rounded.full}` for all buttons, chips, and single-line input fields without exception
- Keep primary CTAs scarce — one `{colors.neutral-black}` filled button per viewport band
- Let the 3D molecular render breathe — give it generous space and let it overflow the grid edge
- Use the alternating band rhythm (Sage, Blue, Tierra) for every multi-section page
- Use weight 400 for display text — the brand's confidence comes from scale, not weight

### Don't
- Don't use colours as the page canvas — the standard surface is white, but sections can use other colours to create atmosphere
- Don't use rectangular buttons — all interactive pill elements use `{rounded.full}`
- Don't add drop shadows — depth comes from background contrast, not elevation shadows
- Don't use any font weight other than Regular (400) — no Medium, no Bold
- Don't place two same-background bands adjacent to each other without a transition band
- Don't miniaturize the protein render — it's a hero element, not an icon
- Don't use positive letter-spacing on headlines — all display type tracks tight (negative)

---

## Social Media

### Platform dimensions

| Platform | Format | Dimensions | Safe zone |
|---|---|---|---|
| Instagram — Feed square | 1:1 | 1080×1080px | 80px all sides |
| Instagram — Feed portrait | 4:5 | 1080×1350px | 80px all sides |
| Instagram — Story / Reels | 9:16 | 1080×1920px | 250px top + bottom |
| LinkedIn — Feed image | 1.91:1 | 1200×628px | 60px all sides |
| LinkedIn — Portrait | 4:5 | 1080×1350px | 60px all sides |
| X (Twitter) | 1.91:1 | 1200×628px | 50px all sides |
| YouTube thumbnail | 16:9 | 1280×720px | 60px all sides |

### Typography adaptation for social

Web type sizes are too small for social. Scale up significantly:

| Web token | Social equivalent | Notes |
|---|---|---|
| `{typography.heading-lg}` | 80–96px | Feed/Story headline |
| `{typography.heading-md}` | 60–72px | Secondary headline |
| `{typography.heading-md}` | 36–48px | Subhead |
| `{typography.eyebrow}` | 22–28px | Section/category label (sentence case + bullet dot) |
| `{typography.body-md}` | 28–32px | CTA text |
| `{typography.body-md}` | 28–32px | Short descriptor copy |

Rule: maximum 2 typographic levels on any social format. No paragraphs — social copy is headline + at most one short descriptor line.

### Post templates

**Announcement post (1:1 or 4:5)**
Canvas: `{colors.surface-primary}` (Tierra-50)  
Eyebrow: `{components.tag}` — "• Category" · sentence case · 22px equivalent  
Headline: 2–5 words · large (`heading-lg` social equivalent) · `{colors.text-primary}`  
Optional: bottom-left Boltz wordmark · minimum size  
Background texture: optionally a subtle Tierra-100 inner glow from center

**Model / science launch (4:5 or 9:16)**  
Canvas: `{colors.surface-card-dark}` — use the dark card surface for model launches  
Visual: protein render cropped to fill right half or full bleed background at low opacity  
Eyebrow: `{components.tag-dark}` — "• BOLTZ-2" or model name  
Headline: white · large · left-aligned  
Stat: one key metric chip in white-outlined pill format ("1000X FASTER")

**Stat / community milestone (1:1)**  
Canvas: `{colors.surface-primary}`  
Large number: `heading-lg` size · `{colors.text-primary}`  
Label: `{typography.eyebrow}` below the number  
Boltz wordmark: bottom-left

**Story / Reels (9:16)**  
Canvas: `{colors.surface-card-dark}` or full-bleed protein render  
Safe zone: keep all text within 250px from top and bottom  
Headline: centered · white · large  
CTA pill: `{components.button-primary}` aligned bottom-center

### Social do's and don'ts
- Always use the Stabil Grotesk font — never substitute for social posts
- Maintain the bullet dot + sentence case eyebrow pattern even at social sizes
- Prefer the full-bleed protein render on dark-background posts — it is the brand's most distinctive visual
- Never use blue as a primary color on social posts — sage/tierra/dark tones only
- One CTA per post

---

## Presentations

### Slide dimensions

| Format | Dimensions | Use case |
|---|---|---|
| Widescreen 16:9 | 1920×1080px | Standard — projectors and screens |
| Google Slides | 1366×768px | Google Slides default |
| PowerPoint | 33.87×19.05cm | Microsoft PowerPoint |
| Keynote | 1920×1080px | Apple Keynote |

### Typography for slides

| Web token | Slide equivalent | Size |
|---|---|---|
| `{typography.heading-lg}` | Cover title | 80–96pt |
| `{typography.heading-lg}` | Section divider title | 56–64pt |
| `{typography.heading-md}` | Content slide title | 36–44pt |
| `{typography.heading-md}` | Subhead / callout | 28–32pt |
| `{typography.body-md}` | Slide body text | 24–28pt |
| `{typography.eyebrow}` (body-sm) | Section label | 16–18pt |
| `{typography.caption}` | Footnotes / source | 12–14pt |

Rule: no body text below 24pt. If text needs to shrink below this, the slide has too much — split it.

### Slide master templates

**Cover slide**  
Background: `{colors.surface-primary}` (Tierra-50) with large protein render bleed right  
Headline: `heading-lg` equivalent · left-aligned · `{colors.text-primary}`  
Eyebrow: pill label "• PRESENTATION TYPE" · top-left below logo  
Logo: top-left corner

**Section divider**  
Background: `{colors.surface-card-dark}` (near-black)  
Section number or eyebrow: `{components.tag-dark}`  
Section title: large white  
Optional: subtle protein render ghost at 10% opacity behind

**Content slide (text + visual)**  
Background: `{colors.surface-primary}`  
Title: `heading-md` equivalent · left-aligned  
Body: two columns if needed; max 5 bullet points  
Visual: right side, card-framed (`{rounded.lg}`)

**Data / chart slide**  
Background: `{colors.surface-secondary}` (subtle grey)  
Chart colors: `{colors.sage-dark}`, `{colors.sage-medium}`, `{colors.blue-medium}` in that priority  
Annotation labels: `{typography.caption}` equivalent

**Quote / testimonial**  
Background: `{colors.surface-card-dark}`  
Quote: large white, italic variant if available  
Attribution: `{typography.eyebrow}` equivalent in `{colors.neutral-grey-200}`

**Closing / CTA slide**  
Background: `{colors.surface-primary}` with protein render  
Headline: large · centered or left  
CTA: prominent — use button-primary visual treatment as a designed shape element

### Presentation do's and don'ts
- Install Stabil Grotesk before building any presentation — never use system font substitutes
- Apply `{rounded.lg}` to all image frames, chart containers, and card shapes
- Use `{colors.neutral-black}` for the one primary CTA per slide; use `{colors.sage-dark}` sparingly for dark card accents only
- One key message per slide — never more than 5 bullet points
- Maintain the warm/cool section band rhythm: alternate between warm-cream and near-dark section dividers

---

## Print

### Colour mode

Key CMYK conversions (verify against physical proof — screen-to-print shift can be significant):

| Token | Hex | Estimated CMYK | Notes |
|---|---|---|---|
| `{colors.surface-primary}` | #FBFAF7 | C2 M1 Y4 K0 | Near-white — verify paper stock reads warm |
| `{colors.text-primary}` | #232323 | C0 M0 Y0 K86 | Rich black alternative: C20 M10 Y10 K90 |
| `{colors.sage-dark}` | #003014 | C100 M38 Y86 K61 | Deep forest green — may need Pantone match |
| `{colors.neutral-tierra-500}` | #DACAB0 | C9 M18 Y31 K0 | Warm tan — verify warmth on coated stock |

**Pantone suggestion for Sage-Dark:** PMS 3435 C (verify). Vibrant screen greens can shift significantly — always proof.

**Font licensing:** Confirm Stabil Grotesk's desktop/print license covers commercial print production before submitting to printer.

### Common formats

| Format | Dimensions | Bleed | Safe zone |
|---|---|---|---|
| Business card | 85×55mm | 3mm | 5mm |
| A4 one-pager | 210×297mm | 3mm | 12mm |
| A4 letterhead | 210×297mm | 3mm | 20mm top, 12mm sides |
| US Letter | 8.5×11in | 0.125in | 0.5in |
| Conference poster | 841×1189mm (A0) | 5mm | 20mm |

### Typography minimums for print
- Body text: 9pt minimum
- Captions / footnotes: 7pt minimum
- Eyebrow labels: 7pt minimum

---

## Design Scaling

### What stays constant across all formats

- Brand colors: same hex values everywhere (`{colors.sage-dark}`, `{colors.surface-primary}`, etc.)
- **Canonical radius:** `{rounded.full}` (9999px) for all button/pill elements — never changes in any format
- Logo proportions, clearspace, and minimum sizes
- CTA scarcity: one primary black CTA per "frame" (slide, post, spread, screen)
- Accent discipline: `{colors.neutral-black}` is the action colour in every format — never substitute sage-dark as a button fill
- The eyebrow label pattern: "• Section name" — maintained in all formats at appropriately scaled sizes
- Surface temperature: warm cream or neutral grey backgrounds — never cold blue-tinted

### What adapts by context

- Type sizes: web 15px body → 24pt slide body → 28–32px social body
- The protein render: hero-scale on web, full-bleed on slides and social, may be reduced to a ghosted texture on print
- Spacing: generous 160px web hero padding compresses for social safe zones; slides use different column logic
- Component complexity: multi-field platform cards become single-stat chips on social
- Hierarchy depth: 4-level web hierarchy becomes 2 levels on a slide, 1–2 on social

### The "does this feel right?" test

Could a reasonable person immediately recognize this as Boltz? If it looks like generic SaaS (blue CTAs, white backgrounds, rectangular buttons, drop shadows), revise. If it looks like a clinical lab report (cold surfaces, heavy type, no warmth), revise. If the protein render has been replaced with a stock photo of a scientist, revise.

---

## Responsive Behavior

### Breakpoints

| Name | Width | Grid cols | Gutter | Container padding |
|---|---|---|---|---|
| Mobile | < 768px | 4 | 16px | 20px |
| Tablet | 768–1023px | 8 | 20px | 32px |
| Laptop | 1024–1327px | 12 (fluid) | 20px | 40px |
| Desktop | ≥ 1328px | 12 × 96px | 20px | 40px + auto margin |

### Collapsing strategy

**Navigation:** Hamburger menu below 768px. Logo left, hamburger right. CTA pill persists at smallest functional size (min 80px wide).

**Hero:** Two-column splits to stacked at mobile (text above, protein render below as full-width cropped visual at ~350px height).

**Type:** `heading-lg` (56px) → 40px at tablet → 32px at mobile. `body-md` (18px) holds across all breakpoints — never reduce below this.

**Card grids:** 3-col → 2-col → 1-col as viewport narrows.

**Protein render:** On mobile, the render is cropped to a horizontal letterbox band rather than overflowing the grid. Still large-scale, never miniaturized.

---

## Iteration Guide

**For any AI agent generating new Boltz assets, read this section first.**

1. Read the YAML `description` field — it contains the continuity contract and non-negotiables
2. Always use color tokens — never paste raw hex values in component specs or designs
3. Check existing components before inventing new patterns — the eyebrow label, stat chip, and dark card are the brand's signature trio
4. Canonical radius is `{rounded.full}` for all pill elements — this is the single most important shape rule
5. Check "When NOT to use" before assigning Stabil Grotesk sizes — never below 11px
6. One `{colors.neutral-black}` primary CTA per band — if you need more CTAs, you need more bands
7. No drop shadows — elevation is achieved through background contrast only
8. Surface temperature check: is your background warm (Tierra-50) or neutral cool (grey)? It must never be blue-tinted or pure white
9. The eyebrow bullet pattern ("• LABEL") is required before every major section heading

### Quick reference

- **Canvas temperature:** Warm cream (Tierra-50 #FBFAF7) or neutral cool grey (#F0EFEC) — never white, never blue
- **Canonical radius:** `{rounded.full}` — full pill on everything interactive
- **CTA rule:** One `{colors.neutral-black}` primary CTA per viewport band. Black is the action colour — sage-dark is for dark card surfaces only.
- **Display font key rule:** Stabil Grotesk Regular (400) at 80px with −1.5px tracking for display. Never Bold.
- **Eyebrow rule:** "• Section name" — literal bullet dot, sentence case, icon circle + text pill compound, before most section headlines

### Example prompts using token names

**Hero section:** "Create a two-column hero band on `{colors.surface-primary}`. Left column: eyebrow label `{components.tag}` with '• BUILD ON BOLTZ', followed by `{typography.heading-lg}` headline in `{colors.text-primary}`, body in `{typography.body-lg}` `{colors.text-secondary}`, two `{components.button-secondary}` pills with ↗ suffix. Right column: protein render visualization, overflowing the right grid edge."

**Feature card grid:** "Three-column card grid alternating `{components.card-dark}`, `{components.card-light}`, `{components.card-blue}`. Each card has `{components.icon-container}` at top, `{typography.heading-md}` headline, `{typography.body-md}` description. Cards use `{rounded.lg}` radius. Grid sits within `{components.section-band}`."

**Social announcement:** "Instagram 4:5 post on `{colors.surface-primary}`. Top-left: `{components.tag}` at 22px equivalent. Center: two-line headline in `{typography.heading-lg}` social equivalent (80px), `{colors.text-primary}`. Bottom-left: Boltz wordmark. No protein render on this template — the warm cream canvas is the atmosphere."

**Pitch deck content slide:** "Slide on `{colors.surface-primary}`. Top: `{typography.heading-md}` equivalent slide title. Below: two-column split — left body text at 24pt, right: data visualization in card with `{rounded.lg}`. Chart primary color: `{colors.sage-dark}`, secondary: `{colors.sage-medium}`."

---

---

## Developer Handoff

This section is written for the developers implementing the Boltz website. It translates every design token and component pattern from the spec above into production-ready code references.

---

### Font loading — Stabil Grotesk

**Only Regular (400) is used.** There is no Medium, Bold, or any other weight in this design system.

Stabil Grotesk is a proprietary OTF — not on Google Fonts or any CDN. It must be self-hosted.

#### Option A — Self-hosted (production)

Copy `StabilGrotesk-Regular.otf` into your project's `/public/fonts/` directory, then:

```css
@font-face {
  font-family: "Stabil Grotesk";
  src: url("/fonts/StabilGrotesk-Regular.otf") format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

#### Option B — Inline base64 (generated HTML files / prototypes / skills)

A self-contained `font-face.css` file with the font base64-encoded is included alongside this DESIGN.md. **When generating any standalone HTML file, copy the entire contents of `font-face.css` into a `<style>` block in the `<head>`.** This makes the font work with zero file dependencies.

```html
<head>
  <style>
    /* Paste full contents of font-face.css here */
    @font-face {
      font-family: "Stabil Grotesk";
      src: url("data:font/otf;base64,AAEAAAA...") format("opentype"),
           url("StabilGrotesk-Regular.otf") format("opentype");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
  </style>
</head>
```

> **Why this matters:** If `font-face.css` is not included, generators fall back to Inter or system fonts. Always include it. The file is ~107KB.

**Fallback stack for all elements:**
```css
font-family: "Stabil Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

#### IBM Plex Mono (code blocks only)

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap" rel="stylesheet">
```

Or via CSS import:
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');
```

#### Iconoir (icons)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css">
```

Usage: `<i class="iconoir-[icon-name]"></i>` — browse all icons at iconoir.com

---

### CSS custom properties

Paste this block into your global stylesheet (e.g. `globals.css`, `tokens.css`, or `:root` in your CSS-in-JS setup). Every component should reference these variables — no raw hex or pixel values in component stylesheets.

```css
:root {
  /* ─── Surface & Background ─── */
  --surface-primary:      #FBFAF7;   /* Tierra-50 — main canvas */
  --surface-secondary:    #F0EFEC;   /* Alternating section bands */
  --surface-tertiary:     #E8E7E3;   /* Footer / closing sections */
  --surface-card-light:   #FFFFFF;   /* Light feature cards */
  --surface-card-blue:    #EEF6FA;   /* Alias of --blue-pale — use either */
  --surface-card-dark:    #232323;   /* Dark feature cards & CTA card */

  /* ─── Text ─── */
  --text-primary:         #232323;
  --text-secondary:       #505050;
  --text-muted:           #7E7E7E;
  --text-on-dark:         #FFFFFF;

  /* ─── Action ─── */
  --cta-primary:          #232323;   /* Neutral black — primary button fill */

  /* ─── Brand — Sage (Atmospheric) ─── */
  --sage-dark:            #003014;   /* Dark feature cards and accents — NOT for buttons */
  --sage-medium:          #C6E5C6;
  --sage-light:           #D9EED9;
  --sage-pale:            #EDF7ED;

  /* ─── Brand — Blue (Secondary) ─── */
  --blue-dark:            #142D36;
  --blue-medium:          #C7E3EE;
  --blue-light:           #E5F2F7;
  --blue-pale:            #EEF6FA;

  /* ─── Brand — Tierra (Secondary) ─── */
  --tierra-500:           #DACAB0;
  --tierra-200:           #EEE7DB;
  --tierra-100:           #F7F2E9;
  --tierra-50:            #FBFAF7;   /* = --surface-primary */

  /* ─── Neutrals ─── */
  --neutral-black:        #232323;   /* Primary CTA fill */
  --neutral-grey-500:     #505050;
  --neutral-grey-200:     #7E7E7E;
  --neutral-grey-100:     #D9D9D9;
  --neutral-white:        #FFFFFF;

  /* ─── Borders ─── */
  --border-light:         #D9D9D9;
  --border-warm:          #EEE7DB;
  --border-dark:          #333333;

  /* ─── Border Radius ─── */
  --rounded-none:         0px;
  --rounded-sm:           6px;
  --rounded-md:           10px;
  --rounded-lg:           16px;
  --rounded-xl:           24px;
  --rounded-full:         9999px;   /* All buttons, chips, pills */

  /* ─── Spacing ─── */
  --space-xs:             4px;
  --space-sm:             8px;
  --space-md:             16px;
  --space-lg:             24px;
  --space-xl:             40px;   /* full-size card padding */
  --space-2xl:            80px;
  --space-3xl:            120px;
  --space-section:        160px;

  /* ─── Typography — Font sizes (official 6-token scale) ─── */
  --font-heading-lg:      56px;   /* Hero headline */
  --font-heading-md:      32px;   /* Section headings */
  --font-heading-sm:      24px;   /* Card headings */
  --font-body-lg:         20px;   /* Hero body / intro copy */
  --font-body-md:         18px;   /* Standard body + ALL button text */
  --font-body-sm:         15px;   /* Small body / captions */
  --font-eyebrow:         15px;   /* body-sm size — no uppercase, normal tracking */
  --font-mono:            13px;   /* IBM Plex Mono code blocks */

  /* ─── Typography — Line heights ─── */
  --lh-heading-lg:        1.00;
  --lh-heading:           1.20;
  --lh-body:              1.40;
  --lh-body-sm:           1.30;
  --lh-mono:              1.60;

  /* ─── Typography — Letter spacing ─── */
  --ls-heading-lg:        -0.0625rem;   /* -1.0px */
  --ls-heading-md:        -0.03125rem;  /* -0.5px */
  --ls-heading-sm:        -0.01875rem;  /* -0.3px */
  --ls-eyebrow:           normal; /* eyebrow uses body-sm tracking */
  --ls-normal:            normal;

  /* ─── Semantic — Status ─── */
  --status-error:           #CC4444;
  --status-error-surface:   #FDF2F2;
  --status-warning:         #C97B22;
  --status-warning-surface: #FDF6ED;
  --status-success:         #2D7A3F;
  --status-success-surface: #F0FAF2;
  --status-info:            #2E6DA4;
  --status-info-surface:    #EFF5FB;

  /* ─── Motion ─── */
  --duration-fast:    100ms;
  --duration-base:    200ms;
  --duration-slow:    350ms;
  --easing-standard:  cubic-bezier(0.4, 0, 0.2, 1);
  --easing-out:       cubic-bezier(0.0, 0, 0.2, 1);
  --active-scale:     0.97;
  --render-rotation:  12s;

  /* ─── Max widths ─── */
  --container-max:        1328px;  /* 12 cols × 96px + 11 × 20px gutter */
  --content-max:          740px;   /* text / article body */
  --hero-text-max:        636px;   /* 6-col text column */
  --container-padding:    40px;    /* side padding inside container */
}
```

---

### Breakpoints

```css
/* Mobile first — add complexity upward */

/* Mobile: default (no media query needed) */
/* < 768px */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Wide */
@media (min-width: 1328px) { }
```

**In JavaScript / Tailwind config (matches `@boltz/tokens` preset):**
```js
screens: {
  mobile: '768px',
  tablet: '1024px',
  laptop: '1328px',
}
```

---

### Component HTML structure

The following markup patterns implement the key Boltz components. Class names are illustrative — adapt to your framework (Tailwind, CSS Modules, styled-components, etc.).

---

#### Eyebrow label

The bullet dot (•) is a **content character in the HTML**, not a CSS pseudo-element or background image.

```html
<span class="eyebrow-label">
  <span class="eyebrow-dot" aria-hidden="true">•</span>
  BUILD ON BOLTZ
</span>
```

```css
.eyebrow-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid var(--border-light);
  border-radius: var(--rounded-full);
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-eyebrow);
  font-weight: 400;
  letter-spacing: var(--ls-eyebrow);
  text-transform: uppercase;
  color: var(--text-secondary);
  line-height: 1.30;
}

.eyebrow-dot {
  color: var(--sage-dark);
  font-size: 8px;  /* slightly smaller than label text */
}

/* Dark variant — for use on dark card backgrounds */
.eyebrow-label--dark {
  border-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.60);
}
.eyebrow-label--dark .eyebrow-dot {
  color: var(--sage-medium);
}
```

---

#### Buttons — split structure

Buttons are a connected split: text pill (left) + arrow circle (right). Three context variants.

```html
<!-- Primary: black label pill + white icon circle (on coloured/sage/tierra bg) -->
<a class="btn btn--filled" href="/path">
  <span class="btn__label">Get early access</span>
  <span class="btn__icon" aria-hidden="true"><i class="iconoir-arrow-up-right"></i></span>
</a>

<!-- Secondary: outlined label + outlined circle (on white bg) -->
<a class="btn btn--outlined" href="/path">
  <span class="btn__label">Learn more</span>
  <span class="btn__icon" aria-hidden="true"><i class="iconoir-arrow-up-right"></i></span>
</a>

<!-- On dark: white label + black circle -->
<a class="btn btn--white" href="/path">
  <span class="btn__label">Get early access</span>
  <span class="btn__icon" aria-hidden="true"><i class="iconoir-arrow-up-right"></i></span>
</a>

<!-- Text button -->
<a class="btn--text" href="/path">Read more <i class="iconoir-arrow-up-right"></i></a>
```

```css
/* Base — shared by all variants */
.btn {
  display: inline-flex;
  align-items: center;
  height: 36px;
  text-decoration: none;
  cursor: pointer;
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-sm);
  font-weight: 400;
}

/* Label pill — full pill radius on BOTH sides */
.btn__label {
  height: 36px;
  padding: 0 20px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-sm);
  white-space: nowrap;
}

/* Icon circle — separate full circle */
.btn__icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

/* Primary: black label + white circle */
.btn--primary .btn__label { background: var(--neutral-black); color: #fff; }
.btn--primary .btn__icon  { background: #fff; color: var(--neutral-black); }

/* Secondary: outlined label + outlined circle (on white bg) */
.btn--secondary .btn__label { background: transparent; color: var(--text-primary); border: 1px solid var(--neutral-black); }
.btn--secondary .btn__icon  { background: transparent; color: var(--text-primary); border: 1px solid var(--neutral-black); }

/* On dark: white label + black circle */
.btn--on-dark .btn__label { background: #fff; color: var(--neutral-black); }
.btn--on-dark .btn__icon  { background: var(--neutral-black); color: #fff; }

/* Text button */
.btn--text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-sm);
  color: var(--text-primary);
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
}
.btn--text-dark { color: #fff; }
```

---

#### Stat chip

```html
<a class="stat-chip" href="https://github.com/..." target="_blank" rel="noopener">
  <img class="stat-chip__icon" src="/icons/github.svg" alt="" width="16" height="16" />
  <span class="stat-chip__name">GitHub</span>
  <span class="stat-chip__value">4K+ Stars</span>
</a>
```

```css
.stat-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 8px 14px;
  border: 1px solid var(--border-light);
  border-radius: var(--rounded-full);
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-sm);
  font-weight: 400;
  color: var(--text-primary);
  text-decoration: none;
  background-color: transparent;
  transition: background-color 120ms ease;
}

.stat-chip:active {
  background-color: var(--surface-secondary);
}

.stat-chip__icon {
  flex-shrink: 0;
}

.stat-chip__value {
  color: var(--text-secondary);
}
```

---

#### Dark feature card

```html
<div class="card card--dark">
  <div class="card__header">
    <span class="eyebrow-label eyebrow-label--dark">
      <span class="eyebrow-dot" aria-hidden="true">•</span>
      PLATFORM
    </span>
  </div>
  <div class="card__icon-container card__icon-container--dark">
    <!-- icon SVG here -->
  </div>
  <h3 class="card__title">Try Boltz Lab</h3>
  <p class="card__body">Get started with AI-powered drug discovery today.</p>
</div>
```

```css
.card {
  border-radius: var(--rounded-lg);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.card--dark {
  background-color: var(--surface-card-dark);
  color: var(--text-on-dark);
}

.card--light {
  background-color: var(--surface-card-light);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
}

.card--blue {
  background-color: var(--surface-card-blue);
  color: var(--text-primary);
}

.card__title {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-heading-md);
  font-weight: 400;
  letter-spacing: var(--ls-heading-lg);
  line-height: var(--lh-heading);
  margin: 0;
}

.card__body {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-md);
  font-weight: 400;
  line-height: var(--lh-body);
  color: var(--text-secondary);
  margin: 0;
}

.card--dark .card__body {
  color: rgba(255, 255, 255, 0.60);
}
```

---

#### Icon container

```html
<div class="icon-container">
  <!-- 20px SVG icon here -->
</div>
```

```css
.icon-container {
  width: 40px;
  height: 40px;
  border-radius: var(--rounded-md);
  background-color: var(--surface-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--text-secondary);
}

.icon-container--dark {
  background-color: rgba(255, 255, 255, 0.10);
  color: var(--text-on-dark);
}
```

---

#### Navigation

```html
<nav class="nav">
  <a class="nav__logo" href="/">
    <!-- Boltz wordmark SVG -->
  </a>
  <ul class="nav__links">
    <li><a class="nav__link" href="/news">News</a></li>
    <li><a class="nav__link" href="/pricing">Pricing</a></li>
  </ul>
  <a class="btn btn--primary nav__cta" href="/lab">
    Try Boltz Lab <span class="btn-arrow" aria-hidden="true">↗</span>
  </a>
</nav>
```

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background-color: rgba(251, 250, 247, 0.85); /* --surface-primary at 85% */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.nav__links {
  display: flex;
  gap: var(--space-lg);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__link {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-md);
  font-weight: 400;
  color: var(--text-secondary);
  text-decoration: none;
}

.nav__link:hover {
  background-color: var(--surface-secondary);
}

/* Active state: text colour only — no background fill */
.nav__link[aria-current="page"] {
  color: var(--text-primary);
  background-color: transparent;
}

.nav__cta {
  padding: 8px 16px; /* slightly smaller than page CTAs */
}
```

---

#### Page section bands

```html
<!-- Warm band (hero, primary sections) -->
<section class="band band--warm">
  <div class="band__container">
    <!-- content -->
  </div>
</section>

<!-- Cool band (alternating sections) -->
<section class="band band--cool">
  <div class="band__container">
    <!-- content -->
  </div>
</section>
```

```css
.band {
  width: 100%;
  padding-top: var(--space-3xl);
  padding-bottom: var(--space-3xl);
}

.band--warm {
  background-color: var(--surface-primary);
}

.band--cool {
  background-color: var(--surface-secondary);
}

.band--dark {
  background-color: var(--surface-card-dark);
  color: var(--text-on-dark);
}

.band--footer {
  background-color: var(--surface-tertiary);
}

.band--hero {
  padding-top: var(--space-section);
  padding-bottom: var(--space-section);
}

.band__container {
  max-width: var(--container-max); /* 1328px */
  margin: 0 auto;
  padding: 0 var(--container-padding); /* 40px */
}

/* Grid — 12 columns, 20px gutter, cols resolve to ~96px at full width */
.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 20px;
}

/* Responsive column counts */
@media (max-width: 1023px) {
  .grid { grid-template-columns: repeat(8, minmax(0, 1fr)); }
  .band__container { padding: 0 32px; }
}
@media (max-width: 767px) {
  .grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
  .band__container { padding: 0 20px; }
}
```

---

#### Navigation with pill links

```html
<nav class="nav">
  <a class="nav__logo" href="/">
    <!-- Boltz wordmark SVG -->
  </a>
  <ul class="nav__links">
    <li><a class="nav__link" href="/models">Models</a></li>
    <li><a class="nav__link" href="/platform">Platform</a></li>
    <li><a class="nav__link nav__link--active" href="/api" aria-current="page">API</a></li>
    <li><a class="nav__link" href="/news">News</a></li>
  </ul>
  <a class="btn btn--primary nav__cta" href="/early-access">
    Get early access <span class="btn-arrow" aria-hidden="true">↗</span>
  </a>
</nav>
```

```css
/* Nav links are pill-shaped outlined buttons — not plain text */
.nav__link {
  display: inline-flex;
  align-items: center;
  padding: 7px 14px;
  border-radius: var(--rounded-full);
  border: 1px solid var(--border-light);
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-md);
  font-weight: 400;
  color: var(--text-primary);
  text-decoration: none;
  background-color: transparent;
  transition: background-color 120ms ease, border-color 120ms ease;
}

.nav__link--active,
.nav__link[aria-current="page"] {
  background-color: var(--surface-secondary);
  border-color: var(--neutral-grey-500);
}
```

---

#### Article card (news grid)

```html
<article class="article-card">
  <!-- Cover — background class varies by article type -->
  <div class="article-card__cover article-card__cover--sage">
    <!-- Optional: title overlay or logo -->
    <span class="article-card__cover-title">Announcing Boltz-prot-1</span>
    <!-- Optional: protein render image -->
  </div>
  <div class="article-card__meta">
    <h3 class="article-card__title">Announcing Boltz</h3>
    <p class="article-card__info">
      <span class="article-card__category">Product</span>
      <span class="article-card__sep" aria-hidden="true"> · </span>
      <time class="article-card__date">Feb 10, 2026</time>
    </p>
  </div>
</article>
```

```css
.article-card {
  border-radius: var(--rounded-lg);
  overflow: hidden;
  background-color: var(--surface-card-light);
  display: flex;
  flex-direction: column;
}

.article-card__cover {
  height: 200px;
  display: flex;
  align-items: flex-end;
  padding: var(--space-md);
  position: relative;
  overflow: hidden;
}

/* Cover background variants */
.article-card__cover--sage    { background-color: var(--sage-light); }
.article-card__cover--tierra  { background-color: var(--neutral-tierra-100); }
.article-card__cover--partner { background-color: var(--blue-pale); }
.article-card__cover--collab  { background-color: var(--sage-pale); }

.article-card__cover-title {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-heading-md);
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.2;
  letter-spacing: -0.2px;
}

.article-card__meta {
  padding: var(--space-md) 0 0;
}

.article-card__title {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-md);
  font-weight: 400;
  color: var(--text-primary);
  margin: 0 0 var(--space-xs);
  line-height: 1.4;
}

.article-card__info {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-sm);
  color: var(--text-muted);
  margin: 0;
}

.article-card__category {
  color: var(--text-secondary);
}
```

---

#### Filter tab bar

```html
<div class="filter-bar" role="tablist" aria-label="News categories">
  <button class="filter-tab filter-tab--active" role="tab" aria-selected="true">Latest</button>
  <button class="filter-tab" role="tab" aria-selected="false">Research</button>
  <button class="filter-tab" role="tab" aria-selected="false">Platform</button>
  <button class="filter-tab" role="tab" aria-selected="false">Partnerships</button>
  <button class="filter-tab" role="tab" aria-selected="false">Company</button>

  <div class="filter-bar__view-toggle" aria-label="View mode">
    <button class="view-toggle-btn view-toggle-btn--active" aria-label="Grid view">
      <!-- grid icon SVG -->
    </button>
    <button class="view-toggle-btn" aria-label="List view">
      <!-- list icon SVG -->
    </button>
  </div>
</div>
```

```css
.filter-bar {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.filter-bar__view-toggle {
  margin-left: auto;
  display: flex;
  gap: var(--space-xs);
}

.filter-tab {
  padding: 7px 14px;
  border-radius: var(--rounded-full);
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-md);
  font-weight: 400;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-light);
}

.filter-tab--active {
  background-color: var(--sage-dark);
  color: var(--text-on-dark);
  border-color: var(--sage-dark);
}

.view-toggle-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--rounded-md);
  background-color: transparent;
  border: 1px solid var(--border-light);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-toggle-btn--active {
  background-color: var(--sage-dark);
  border-color: var(--sage-dark);
  color: var(--text-on-dark);
}
```

---

#### Model accordion

```html
<div class="model-accordion">
  <!-- Expanded item -->
  <div class="accordion-item accordion-item--expanded">
    <button class="accordion-item__header">
      <span class="accordion-item__name">BotzMol 1.1</span>
      <span class="ex-badge-pill">Beta</span>
      <span class="accordion-item__toggle" aria-hidden="true">−</span>
    </button>
    <div class="accordion-item__body">
      <p class="accordion-item__desc">A one-designed small molecule screening and hit discovery...</p>
      <div class="accordion-item__actions">
        <a class="btn btn--filled" href="#">Get early access ↗</a>
        <a class="btn btn--outlined" href="#">Read technical report ↗</a>
      </div>
    </div>
  </div>

  <!-- Collapsed item -->
  <div class="accordion-item">
    <button class="accordion-item__header">
      <span class="accordion-item__name">BotzProt 1.1</span>
      <span class="ex-badge-pill accordion-item__badge--todo">To be</span>
      <span class="accordion-item__toggle" aria-hidden="true">+</span>
    </button>
  </div>
</div>
```

```css
.model-accordion {
  display: flex;
  flex-direction: column;
}

.accordion-item {
  border-bottom: 1px solid var(--border-light);
}

.accordion-item__header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}

.accordion-item__name {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-heading-md);
  font-weight: 400;
  color: var(--text-primary);
  flex: 1;
  letter-spacing: -0.2px;
}

.accordion-item__toggle {
  font-size: var(--font-heading-md);
  color: var(--text-secondary);
  margin-left: auto;
}

.accordion-item__body {
  padding: 0 0 var(--space-lg);
  display: none;
}

.accordion-item--expanded .accordion-item__body {
  display: block;
}

.accordion-item__desc {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-md);
  color: var(--text-secondary);
  line-height: var(--lh-body);
  margin: 0 0 var(--space-md);
}

.accordion-item__actions {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}
```

---

#### Blog post — article breadcrumb

```html
<div class="article-breadcrumb">
  <a class="breadcrumb__back" href="/news">← Back</a>
  <span class="breadcrumb__category">Product</span>
  <span class="breadcrumb__date">October 28th, 2025</span>
</div>
```

```css
.article-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.breadcrumb__back {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-sm);
  color: var(--text-secondary);
  text-decoration: none;
}

.breadcrumb__category,
.breadcrumb__date {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-caption);
  padding: 3px 10px;
  border-radius: var(--rounded-full);
  border: 1px solid var(--border-light);
}

.breadcrumb__category { color: var(--text-secondary); }
.breadcrumb__date     { color: var(--text-muted); }
```

---

#### Blog post — summary block

```html
<div class="article-summary">
  <div class="article-summary__text">
    <p><strong>Summary....</strong> Boltzgen is a new state-of-the-art model for protein binder design built on Boltz-2...</p>
  </div>
  <div class="article-summary__cta">
    <a class="btn btn--filled" href="#">Get access ↗</a>
    <a class="article-summary__link" href="#">Read technical report</a>
  </div>
</div>
```

```css
.article-summary {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-2xl);
  align-items: start;
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--border-light);
}

.article-summary__text {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-lg);
  color: var(--text-primary);
  line-height: 1.55;
}

.article-summary__text strong {
  font-weight: 400;
}

.article-summary__cta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-sm);
  min-width: 160px;
}

.article-summary__link {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-sm);
  color: var(--text-secondary);
  text-decoration: none;
}

@media (max-width: 640px) {
  .article-summary {
    grid-template-columns: 1fr;
  }
}
```

---

#### Footer CTA rows

```html
<div class="footer-ctas">
  <div class="footer-cta-row">
    <div class="footer-cta-row__text">
      <h3 class="footer-cta-row__title">Partner with us</h3>
      <p class="footer-cta-row__body">We partner with pioneering teams to tackle the most challenging problems...</p>
    </div>
    <a class="btn btn--outlined" href="/contact">Get in touch ↗</a>
  </div>
  <div class="footer-cta-row">
    <div class="footer-cta-row__text">
      <h3 class="footer-cta-row__title">Join our team</h3>
      <p class="footer-cta-row__body">We're building a world-class team to push the boundaries...</p>
    </div>
    <a class="btn btn--outlined" href="/careers">View open roles ↗</a>
  </div>
</div>
```

```css
.footer-ctas {
  display: flex;
  flex-direction: column;
}

.footer-cta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xl);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--border-light);
}

.footer-cta-row__title {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-heading-md);
  font-weight: 400;
  color: var(--text-primary);
  margin: 0 0 var(--space-xs);
  letter-spacing: -0.2px;
}

.footer-cta-row__body {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-md);
  color: var(--text-secondary);
  margin: 0;
  max-width: 520px;
}

@media (max-width: 640px) {
  .footer-cta-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

---

#### Site footer

```html
<footer class="site-footer">
  <div class="band__container">
    <div class="site-footer__inner">
      <a class="site-footer__logo" href="/"><!-- Boltz wordmark SVG --></a>
      <nav class="site-footer__links" aria-label="Footer navigation">
        <ul class="site-footer__col">
          <li><a href="/careers">Career</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/legal">Legal</a></li>
        </ul>
        <ul class="site-footer__col">
          <li><a href="https://github.com/..." target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://linkedin.com/..." target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="https://slack.boltz.bio" target="_blank" rel="noopener">Slack</a></li>
        </ul>
      </nav>
    </div>
    <p class="site-footer__copy">© 2026 Boltz</p>
  </div>
</footer>
```

```css
.site-footer {
  background-color: var(--surface-primary);
  border-top: 1px solid var(--border-light);
  padding: var(--space-xl) 0;
}

.site-footer__inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-2xl);
  margin-bottom: var(--space-xl);
}

.site-footer__links {
  display: flex;
  gap: var(--space-2xl);
}

.site-footer__col {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.site-footer__col a {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-body-sm);
  color: var(--text-secondary);
  text-decoration: none;
}

.site-footer__copy {
  font-family: "Stabil Grotesk", sans-serif;
  font-size: var(--font-caption);
  color: var(--text-muted);
  margin: 0;
}
```

---

### Tailwind config (if using Tailwind CSS)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        surface: {
          primary:   '#FBFAF7',
          secondary: '#F0EFEC',
          tertiary:  '#E8E7E3',
        },
        card: {
          light: '#FFFFFF',
          blue:  '#EEF6FA',
          dark:  '#232323',
        },
        sage: {
          dark:   '#003014',
          medium: '#C6E5C6',
          light:  '#D9EED9',
          pale:   '#EDF7ED',
        },
        blue: {
          dark:   '#142D36',
          medium: '#C7E3EE',
          light:  '#E5F2F7',
          pale:   '#EEF6FA',
        },
        tierra: {
          500: '#DACAB0',
          200: '#EEE7DB',
          100: '#F7F2E9',
          50:  '#FBFAF7',
        },
        neutral: {
          black: '#232323',
          500:   '#505050',
          200:   '#7E7E7E',
          100:   '#D9D9D9',
        },
        border: {
          light: '#D9D9D9',
          warm:  '#EEE7DB',
          dark:  '#333333',
        },
      },
      fontFamily: {
        sans: ['"Stabil Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm:   '6px',
        md:   '10px',
        lg:   '16px',
        xl:   '24px',
        full: '9999px',
      },
      spacing: {
        xs:      '4px',
        sm:      '8px',
        md:      '16px',
        lg:      '24px',
        xl:      '40px',   // full-size card padding
        '2xl':   '80px',
        '3xl':   '120px',
        section: '160px',
      },
      screens: {
        sm: '768px',   /* tablet — 8-col grid */
        md: '1024px',  /* laptop — 12-col fluid */
        lg: '1328px',  /* desktop — 12 × 96px at full width */
      },
      maxWidth: {
        container: '1328px',  /* 12-col grid max */
        content:   '740px',   /* article / text body */
        hero:      '636px',   /* 6-col hero text column */
      },
    },
  },
}
```

---

## Motion

Boltz uses a minimal, purposeful motion system. Transitions exist to confirm state, not to entertain. All interactive elements use `--easing-standard` unless the motion is exit-only (use `--easing-out`). The protein render's slow rotation is the brand's only ambient animation — all other motion is response-to-input.

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | 100ms | Hover fills, color swaps, opacity changes |
| `--duration-base` | 200ms | Button presses, tab switches, chip state changes |
| `--duration-slow` | 350ms | Accordion expand/collapse, modal in/out |
| `--easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | All enter and state transitions |
| `--easing-out` | `cubic-bezier(0.0, 0, 0.2, 1)` | Exit / dismiss transitions |
| `--active-scale` | `0.97` | Button/chip press scale-down (transform: scale) |
| `--render-rotation` | `12s` | Protein render full-rotation loop period |

**Motion rules:**
- Apply `transition: background-color var(--duration-fast) var(--easing-standard)` on color-only hover changes
- Apply `transform: scale(var(--active-scale))` on `:active` for all buttons and chips
- Never animate layout properties (width, height, padding) — use opacity and transform only
- `prefers-reduced-motion`: wrap all transitions and animations in a `@media (prefers-reduced-motion: no-preference)` block; default to instant state changes

```css
/* Canonical button motion */
.btn {
  transition:
    background-color var(--duration-fast) var(--easing-standard),
    color            var(--duration-fast) var(--easing-standard),
    border-color     var(--duration-fast) var(--easing-standard);
}
.btn:active {
  transform: scale(var(--active-scale));
}

/* Accordion expand */
.accordion-item__body {
  transition: opacity var(--duration-slow) var(--easing-out);
}

/* Protein render rotation */
@keyframes slow-rotate {
  from { transform: rotateY(0deg); }
  to   { transform: rotateY(360deg); }
}
.protein-render {
  animation: slow-rotate var(--render-rotation) linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; animation: none !important; }
}
```

---

## Semantic Colors

Status colors operate entirely separately from the brand palette. `{colors.sage-dark}` is never repurposed as a success signal — it is a dark card surface color. `{colors.neutral-black}` is the action color and is equally off-limits for status use. Status colors appear exclusively in inline validation, toast notifications, and system feedback — never as decorative section fills or card backgrounds.

| Token | Hex | Usage |
|---|---|---|
| `--status-error` | `#CC4444` | Error text, error icon, destructive border |
| `--status-error-surface` | `#FDF2F2` | Error message background |
| `--status-warning` | `#C97B22` | Warning text, advisory icon |
| `--status-warning-surface` | `#FDF6ED` | Warning message background |
| `--status-success` | `#2D7A3F` | Success text, confirmation icon |
| `--status-success-surface` | `#F0FAF2` | Success message background |
| `--status-info` | `#2E6DA4` | Info text, neutral system message |
| `--status-info-surface` | `#EFF5FB` | Info message background |

**Usage rules:**
- Each status color is paired with its `-surface` variant: text/icon uses the base color, the container background uses the surface variant
- Status colors never appear in buttons, nav, or card fills — only in inline feedback (input validation, toasts, banners)
- The toast component (`{components.ex-toast}`) uses `{colors.surface-card-dark}` for a neutral dark treatment — reserve status colors for semantic toasts only
- Border on status containers: `1px solid` at 25% opacity of the base status color

```css
/* Inline input error */
.input--error {
  border-color: var(--status-error);
  outline: 2px solid rgba(204, 68, 68, 0.12);
}
.input-error-msg {
  color: var(--status-error);
  font-size: var(--font-body-sm);
}

/* Status banner / toast */
.status-banner {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 10px var(--space-md);
  border-radius: var(--rounded-lg);
  font-size: var(--font-body-sm);
}
.status-banner--error   { background: var(--status-error-surface);   color: var(--status-error); }
.status-banner--warning { background: var(--status-warning-surface); color: var(--status-warning); }
.status-banner--success { background: var(--status-success-surface); color: var(--status-success); }
.status-banner--info    { background: var(--status-info-surface);    color: var(--status-info); }
```
