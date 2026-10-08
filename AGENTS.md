# Cocktail coaster site — build brief

Mobile-first NFC product platform. The home page is a company section directory; cocktails are the first live section.
Each laser-engraved NFC coaster opens one cocktail's page when tapped with a phone.
More page types will be added later, so build reusable components on shared design tokens.

## Stack (recommended)

- **Astro** (static output) + **React islands** only where interactivity is needed. Ship no JS on pages that don't need it.
- Recipes are **Astro content collections** loaded from `content/cocktails/*.json` (one file per drink, schema = `margarita.json`). Validate with a Zod schema.
- Styling: plain CSS on `design/tokens.css` variables (scoped component styles). No UI kit.
- Deploy as static (Vercel or Netlify).

## Routes

| Route | Page | Design reference |
|---|---|---|
| `/` | Company directory (sections; Coming soon placeholders) | — |
| `/cocktails` | Cocktail library, search + spirit filter | `design/reference/Home.dc.html` |
| `/cocktails/[slug]` | Recipe page (NFC target) | `design/reference/Main.dc.html` |
| `/cocktails/[slug]/cook` | Cook mode | `design/reference/CookMode.dc.html` |

Keep NFC URLs stable (`https://<domain>/cocktails/margarita`). Never change a slug once a coaster ships; add redirects instead.

## Design references

`design/reference/*.dc.html` are design-tool exports, NOT production code. Read them for layout, spacing, copy, colors and states.
Ignore their `<x-dc>`, `<helmet>`, `<sc-for>`, `<sc-if>`, `{{holes}}`, `support.js` and `class Component extends DCLogic` scaffolding. Inline styles there map to tokens in `design/tokens.css`.
`DesignSystem.dc.html` is the token/component spec. `coaster-art-margarita.png` is the original coaster artwork.

## Recipe page, top to bottom

1. Slim header: brand wordmark + "All cocktails" link.
2. Hero on `--slate-800`: coaster frame (double border + 4 corner dots), "Tapped from your coaster" label, name (display, uppercase), diamond divider, 3 tags, italic tagline, hero art.
3. Intro (lead text).
4. Quick facts: 3-column `<dl>` (difficulty, prep time, glass) + glass note.
5. Ingredients: servings segmented control (1/2/4, `aria-pressed`) scales numeric amounts and shows ml (1 oz ≈ 30 ml). Non-numeric amounts ("Rim") don't scale. Each ingredient shows its note. Then garnish and equipment chips.
6. Method: numbered `<ol>`, big Bodoni numerals in `--accent-ink`, optional "Tip" callout on `--paper-100`. "Cook mode" button in the section header.
7. Pro tips (check icon) and common mistakes (x icon): split `tips[]` on the "Pro tip:" / "Common mistake:" prefix and strip it.
8. Variations list.
9. More cocktails: 2-col grid from `relatedSlugs`. Drinks without art show a monogram in the coaster frame.
10. Sticky bottom bar: "Start cook mode" (thumb zone).
11. Footer on `--slate-900`: responsible-drinking note.

`history`, `substitutions` and `flavorProfile` exist in the data but are not in v1 of the design. Don't render them yet.

## Cook mode

- Full-screen dark (`--slate-900`), one step at a time, 40px title, 25px body.
- Back (1fr) / Next (2fr) buttons, 68px tall, pinned to the bottom. The last step's button reads "Done", which shows a "Cheers." screen.
- Segmented progress bar, `aria-live="polite"` on the step region.
- Ingredients button in the header opens a panel over the step.
- Use the Screen Wake Lock API (`navigator.wakeLock.request('screen')`). Re-acquire it on `visibilitychange`. Hide the "screen stays awake" note if the API isn't supported.
- Keep the current step in the URL (`?step=3`) so a refresh doesn't lose your place.

## Rules

- One-handed use: primary actions in the bottom third. Touch targets ≥ 44px.
- Contrast ≥ 4.5:1. Never use `--accent` as text on paper; use `--accent-ink`.
- Body text ≥ 15px; use rem units so browser zoom works.
- Real `<button>`, `<a>`, `<label>`. Keep the focus ring.
- Performance: preload the two font files, `font-display: swap`, hero image as WebP with width/height set, no layout shift. Target Lighthouse mobile ≥ 95.
- SEO: use `seo.title` / `seo.description`, plus JSON-LD `Recipe` schema built from the recipe data.
- Brand name, year and the shop link are placeholders: `[YOUR BRAND]`, `[YEAR]`, `[SHOP URL]`.
