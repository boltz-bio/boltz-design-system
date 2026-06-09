# Blog Thumbnail Guide

Blog thumbnails are the cover images shown on news cards, article headers, and the landing page blog list. They're fully generated from code — no image editing needed. You describe what you want, and the system produces both the code and a visual preview.

---

## How to create a new thumbnail

Type the following command in your Claude Code session:

```
/blog-thumbnail
```

Claude will ask you a short series of questions, then generate:
- A **JSX snippet** ready to paste into any story or page
- A **visual preview** so you can see the result before using it

---

## The questions you'll be asked

### 1. Article title
The headline that appears on the thumbnail.
> *Example: "Announcing Boltz Lab"*

---

### 2. Background tone
Controls the colour palette of the entire thumbnail.

| Tone | Background | Text colour | Best for |
|---|---|---|---|
| `sage` | Soft green (#EDF7ED) | Dark green (#003014) | Research, science, default |
| `blue` | Soft blue (#EEF6FA) | Dark blue (#142D36) | API, technical, product |
| `tierra` | Warm tan (#F7F2E9) | Near-black (#232323) | Community, editorial, opinion |

---

### 3. Category
Sets the small label that appears above the title automatically.

| Category | Label shown |
|---|---|
| `product-launch` | "Announcing" |
| `new-research` | "New research" |
| `case-study` | "Case study" |
| `other` | *(you provide custom text, or none)* |

You can always override this with your own eyebrow text.

---

### 4. Protein / molecule render
A transparent PNG of a protein or molecule that bleeds off the right edge of the thumbnail. This is the most common variant for science and product articles.

- Answer **yes** and provide the image path (e.g. `/hero-protein.png`, `/render-a.png`)
- Answer **no** for a clean text-only cover

---

### 5. Co-brand partner *(optional)*
If the article is a partnership or case study, you can show a "Boltz | Partner" lockup in the centre of the thumbnail instead of the standard title layout.

- Answer **yes** and provide the partner name (e.g. "Pfizer", "Roche")
- Answer **no** to skip

> Note: co-brand and a protein render are mutually exclusive — pick one.

---

### 6. Title layout *(only asked if no render and no partner)*
Controls where the title sits inside the thumbnail.

**Alignment:**
- `left` — text anchored to the left edge *(default)*
- `center` — text centred horizontally

**Vertical position:**
- `bottom` — title sits at the bottom *(default)*
- `center` — title sits in the middle
- `top` — title sits at the top

---

### 7. Blob shape *(optional)*
A decorative organic shape in the background. Any number from **0 to 15**. Leave blank to use the default (0). Try different numbers if you want a different feel — each produces a distinct silhouette.

---

## Example combinations

### Science article with protein render
```
Tone: sage
Category: new-research
Title: Boltz-2 sets a new benchmark in protein structure prediction
Render: /hero-protein.png
Blob: 8
```
→ Green background, "New research" eyebrow, molecule bleeding off the right

---

### Product launch, clean layout
```
Tone: blue
Category: product-launch
Title: Announcing Boltz Lab
Render: no
Blob: 11
```
→ Blue background, "Announcing" eyebrow, title bottom-left

---

### Editorial / opinion piece
```
Tone: tierra
Category: other
Eyebrow: (none)
Title: The future we are building at Boltz
Align: center
Position: center
Blob: 5
```
→ Warm tan background, centred title, no eyebrow

---

### Case study with partner co-brand
```
Tone: blue
Category: case-study
Partner: Pfizer
Blob: 3
```
→ Blue background, centred "Boltz | Pfizer" lockup

---

## The output you'll receive

**1. JSX snippet** — paste this wherever the thumbnail is needed:
```tsx
<BlogThumbnail
  tone="sage"
  category="new-research"
  title="Boltz-2 sets a new benchmark in protein structure prediction"
  renderSrc="/hero-protein.png"
  blobShape={8}
/>
```

**2. Visual preview** — a screenshot at the correct 16:10 aspect ratio so you can check the composition before committing.

---

## Sizing

By default the thumbnail fills its container at a **16:10 aspect ratio**. You can override the height with a `className`:

```tsx
<BlogThumbnail
  tone="sage"
  title="Article title"
  className="h-[200px]"   // fixed height for news grid cards
/>
```

The text, logo, and blob all scale proportionally — nothing breaks at smaller sizes.

---

## Hiding the Boltz wordmark

The Boltz logo appears by default. To remove it:

```tsx
<BlogThumbnail
  tone="tierra"
  title="Article title"
  showLogo={false}
/>
```
