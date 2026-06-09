# /blog-thumbnail

Generate a `BlogThumbnail` JSX snippet, a standalone HTML preview, and a PNG screenshot for a new blog / news article cover.

`BlogThumbnail` is fully code-generated — every visual is composed from props. No image editing or Figma work needed.

## Usage

```
/blog-thumbnail
```

No arguments required. The skill will ask you the questions it needs.

---

## Step 1 — gather inputs

Ask the user the following questions **in a single message** (don't ask one at a time):

1. **Article title** — the text that appears on the thumbnail (e.g. "Announcing Boltz Lab")
2. **Background tone** — `sage` (green, default) / `blue` / `tierra` (warm tan)
3. **Category** — `new-research` / `product-launch` / `case-study` / `other`
   - This sets the default eyebrow label automatically (see table below)
   - Ask if they want to override the eyebrow with custom text
4. **Protein / molecule render?** — yes or no. If yes, ask for the image path (e.g. `/hero-protein.png`, `/render-a.png`)
5. **Co-brand partner?** — yes or no. If yes, ask for the partner name or logo. (A co-brand replaces the title layout with a centred "Boltz | Partner" lockup)
6. **Title layout** — only ask if no render and no partner:
   - Alignment: `left` (default) or `center`
   - Vertical position: `bottom` (default) / `center` / `top`
7. **Blob shape** — optional number 0–15 (leave blank for default 0)

Category → default eyebrow:
| Category | Eyebrow |
|---|---|
| `new-research` | "New research" |
| `product-launch` | "Announcing" |
| `case-study` | "Case study" |
| `other` | *(none — ask for custom eyebrow)* |

---

## Step 2 — generate the JSX snippet

Output a clean, ready-to-paste JSX snippet. Only include props that differ from their defaults:

**Defaults (omit these if unchanged):**
- `tone` — `"sage"`
- `align` — `"left"`
- `titlePosition` — `"bottom"`
- `showLogo` — `true`
- `blobShape` — `0`
- `blobLayer` — `"behind"`

**Example outputs:**

```tsx
// Sage + product launch + protein render
<BlogThumbnail
  tone="sage"
  category="product-launch"
  title="Announcing Boltz Lab"
  renderSrc="/render-a.png"
  blobShape={8}
/>
```

```tsx
// Tierra + centered title, no render
<BlogThumbnail
  tone="tierra"
  title="The future we are building at Boltz"
  align="center"
  titlePosition="center"
  blobShape={5}
/>
```

```tsx
// Blue + co-brand partner
<BlogThumbnail
  tone="blue"
  partner="Pfizer"
  blobShape={3}
/>
```

---

## Step 3 — render HTML preview + screenshot

1. Build a self-contained HTML file at `/tmp/blog-thumbnail-preview.html`:
   - Include the Boltz font via `font-face.css` (base64 inline, from `boltz-design-system/md file/font-face.css`) — paste its full contents into a `<style>` block
   - Include the Tailwind CDN for layout utilities
   - Apply the correct background colour and blob (use inline SVG approximations — the exact blob shapes don't need to match, just give a sense of the composition)
   - Render the thumbnail at **800×500px** (the 16:10 aspect ratio the component uses)
   - Show the eyebrow, title, Boltz wordmark, and render image (if provided) in the correct positions

   Background colours:
   - `sage` → `#EDF7ED`
   - `blue` → `#EEF6FA`
   - `tierra` → `#F7F2E9`

   Ink colour:
   - `sage` → `#003014`
   - `blue` → `#142D36`
   - `tierra` → `#232323`

2. Open the file in the browser and take a screenshot.
3. Share the screenshot inline so the user can see it before using the JSX.

---

## Step 4 — report

Summarise in 3 lines:
- The JSX snippet (formatted)
- The preview file path
- Any props left at their defaults (so the user knows they can change them)

---

## Hard rules

- Never hardcode hex values in the JSX — the component handles all colour via the `tone` prop
- `partner` and `renderSrc` are mutually exclusive — if both are given, ask which takes priority
- The `showLogo` prop defaults to `true` — only set it to `false` if the user explicitly asks to hide the Boltz wordmark
- `blobShape` accepts 0–15 (wraps via modulo internally, but stay in range for clarity)
- The `className` prop can be passed to override the height (the component is `aspect-[16/10]` by default); mention this if the user asks about sizing
