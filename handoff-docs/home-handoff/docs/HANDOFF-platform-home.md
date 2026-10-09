# Platform Home Page: Build Handoff

The home page at `/` for **Elevated Solutions** lists every product section: Cocktails, Coffee, and the upcoming Prayer and Puzzles sections. It has its own theme, **"Laser Studio"**, so it reads as the maker's brand rather than a third collection. It uses the same shared layout rules, `base.css` tokens and component conventions as the collection pages (see `docs/HANDOFF.md`).

- **Design references:** `design/reference/platform/home.dc.html` (the page) and `design/reference/platform/theme.dc.html` (the theme sheet)
- **Theme:** `design/themes/platform.css`, which uses the same semantic token names as `cocktail.css` and `coffee.css`
- **Content:** `content/platform.json`
- **Hero image:** `public/images/platform/tapzone-hero.webp` (1074×677, about 113 KB)

---

## 1. Theme: Laser Studio

| Token | Value | Use |
|---|---|---|
| `--color-bg` | #F3F4F1 aluminum | Page background |
| `--color-surface` | #FFFFFF | Cards, header bar |
| `--color-ink` | #101826 ink navy (16.1:1) | Text, primary buttons, arrow circles, footer |
| `--color-ink-soft` | #3A4352 | Body text on light surfaces |
| `--color-ink-muted` | #566070 steel (5.8:1) | Labels, meta |
| `--color-rule` | #DDE1E6 | Hairlines, card borders |
| `--color-rule-dashed` | #AEB6C2 | Coming-soon "cut path" borders only |
| `--color-accent` | #E8461E laser | **Lines, dots and icons only.** Never text, never a button fill (white on it is only 3.9:1) |
| `--color-accent-ink` | #B3330C (5.6:1) | Accent text ("Digital depth.", step numbers) |
| `--color-accent-soft` | #FDE9E2 | Badge fill; badge text #9A2C0B |
| `--color-accent-on-inverse` | #FF6A3D | Brand dot in the footer |

- **Fonts:**
  - Bricolage Grotesque 800 for display. The H1 uses 54px, line height 0.95 and −3.5% tracking; H2s use 28px and −2% tracking.
  - IBM Plex Sans 400–600 for body text.
  - IBM Plex Mono 600, uppercase with +12% tracking, for labels.
- **Shape:** 16px card corners, pill buttons, a single hairline shadow. No texture.
- **Blueprint grid:** on the hero section only, 24px squares at 5% navy (`--hero-grid`).
- **Motifs:**
  - The laser dot (brand mark, a 10px dot with a soft orange ring)
  - Registration crosshairs
  - The dashed cut ring
  - NFC arcs

  Use them sparingly.

## 2. Page structure (top to bottom)

1. **Header bar** (white, 60px, bottom hairline): laser dot plus "Elevated Solutions" wordmark on the left; a "Shop" outlined pill (44px tall) on the right.
2. **Hero** (blueprint grid, bottom hairline):
   - Mono eyebrow `NFC · LASER-ENGRAVED GOODS`
   - H1 "Elevated Solutions"
   - Lead "Physical products. **Digital depth.**", with the second sentence in `--color-accent-ink`
   - Intro line
   - Hero image in a white card with a 1px rule and 16px corners, full width, `height: auto`. It's the LCP element, so load it eagerly with `fetchpriority="high"` and explicit width and height.
3. **Sections:** H2 "Sections" plus a mono count on the right (`2 LIVE · 2 COMING`, computed from data). Then the section cards (§3).
4. **How it works:** H2, then a 3-row list between hairlines. Each row has a mono step number (`01`, in accent ink), a bold title and a muted line.
5. **Footer** (ink navy): brand dot plus wordmark, tagline, Shop and Contact links (44px targets), and a mono copyright line.

## 3. Section card component

**Live** (`status: "live"`):
- The whole card is one `<a>` (white surface, 1px rule, 16px corners, hairline shadow) in a 3-column grid: 76px swatch, text, 40px arrow circle.
- **Swatch:** a preview square styled with **that collection's own theme tokens**:
  - cocktail: slate #1F2326, 4px corners, inset 1px #565D63 frame, brass glass icon
  - coffee: oat #F5EDE0, 18px corners, inset #E0D3C0 ring, terracotta bean icon

  Build it as `<SectionSwatch theme="cocktail" />`, wrapping the swatch in an element with `data-theme` set to that collection so it reads that theme's variables.
- **Text:** mono label `01 · 8 DRINKS` (index plus the catalog count from `collections.json`), title (Bricolage 23px), and a one-line description.
- **Arrow:** a navy circle with a white arrow, marked `aria-hidden` (the link text names the destination).

**Coming soon** (`status: "coming-soon"`):
- **Not a link.** Use an `<li>` with `aria-label="Prayer, coming soon"`.
- 1.5px dashed `--color-rule-dashed` border, no fill, no shadow. The swatch box is dashed too, with a steel line icon.
- An `IN THE WORKSHOP` badge (mono, `--color-accent-soft` fill, #9A2C0B text).
- The text stays at or above 4.5:1 contrast. The title uses `--color-ink-soft` and the description `--color-ink-muted`. **Don't lower opacity.**

Icons: inline stroke SVGs (glass, bean, book, puzzle). The path data is in `home.dc.html`.

## 4. Behavior and accessibility

- The page is fully static: no islands, no client JavaScript.
- Card order comes from `content/platform.json`. A section flips from "coming soon" to "live" just by changing its `status` and adding an `href`.
- Every tap target is at least 44px; the whole live card is clickable.
- Use exactly one `<h1>`; the "Sections" and "How it works" titles are `<h2>`s.
- The focus ring is 3px `--color-accent` with a 2px offset. Over the white cards that's 3.9:1, which passes the 3:1 non-text contrast rule.
- The layout works at 320px with no horizontal scroll.

## 5. SEO

- Title: `Elevated Solutions: Physical products. Digital depth.`
- Meta description: the intro line plus the live section names.
- JSON-LD `Organization` (name, url, logo once available) and `WebSite`.
- Open Graph image: the hero image.

## 6. Build steps

1. Add `platform.css`. Set `data-theme="platform"` on `/` only.
2. Load the three font families on `/` only, not on the collection pages.
3. Extend the Zod schema with a `platform` content type (shape in `content/platform.json`).
4. Build `SectionCard` (live and coming-soon variants) and `SectionSwatch`.
5. Build `src/pages/index.astro` to match `design/reference/platform/home.dc.html` at 390px.

*Done when:*
- Cocktails and Coffee link to `/cocktails` and `/coffee` and show live catalog counts.
- Prayer and Puzzles render as coming soon and aren't focusable.
- Lighthouse mobile scores 95 or higher.

## 7. Open items

- `[SHOP URL]`, `[CONTACT URL]`, `[YEAR]`.
- Logo or wordmark file (the laser dot plus text is a placeholder mark).
- Optional "Notify me" capture for coming-soon sections. It isn't designed yet and would need an email or form backend.
