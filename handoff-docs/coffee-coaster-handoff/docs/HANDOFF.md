# NFC Coaster Platform: Build Handoff

Laser-engraved coasters carry an NFC tag. Tapping one with a phone opens that drink's recipe page. One platform hosts several **collections** (Cocktails and Coffee today, more later). Every collection shares one layout and component set and swaps a **theme**: colors, fonts, corner radius, shadow and texture.

This document is the build spec. The design references in `design/reference/` show the intended result. The theme files in `design/themes/` and the data in `content/` are ready to use as-is.

---

## 1. Goals and constraints

- **Mobile-first, one-handed.** The primary action always sits in the bottom third and is pinned (sticky) on long pages. Touch targets are at least 44px.
- **Fast after an NFC tap.** Static HTML, minimal JavaScript, small images. Target: Lighthouse mobile ≥ 95, LCP < 2.0 s on 4G.
- **High contrast and accessible.** All text is at least 4.5:1 contrast. Body text is at least 15px. Use rem units, real buttons, links and labels, and visible focus rings.
- **Reusable.** Structure, components, spacing and type sizes are shared. Only theme tokens differ between collections. New page types will come later.

## 2. Stack

- **Astro** with static output, plus **React islands** only for interactive parts: servings selector, method switcher, home filters and search, guided mode and timer.
- **Content collections** load `content/<collection>/*.json`, validated with Zod (schema in §6).
- **Plain CSS** on the semantic tokens in `design/themes/`. No UI kit.
- **Static hosting** (Vercel or Netlify).

> Next.js (`output: 'export'`) is a valid alternative. Only §3 and the content-loading code would change.

## 3. Suggested repo layout

```
src/
  layouts/BaseLayout.astro        # <html data-theme={collection.theme}>, fonts, meta
  components/                     # shared, theme-agnostic (see §7)
  islands/                        # React: ServingsSelector, MethodSwitcher, GuidedMode, ShotTimer, DrinkFilter
  content/config.ts               # Zod schema (§6)
  lib/scale.ts                    # amount scaling helpers
  pages/
    index.astro                   # platform landing: list collections
    [collection]/index.astro      # collection home
    [collection]/[slug].astro     # recipe page (NFC target)
    [collection]/[slug]/guide.astro  # cook mode / brew mode
content/                          # provided: collections.json + drinks
design/themes/                    # provided: base.css, cocktail.css, coffee.css
public/                           # provided: hero art, paper texture
```

## 4. Routes and NFC URLs

| Route | Page | Reference |
|---|---|---|
| `/` | Platform landing (simple list of collections; not designed yet, keep it minimal) | none |
| `/cocktails` | Cocktail home | `cocktails/home.dc.html` |
| `/cocktails/margarita` | Recipe | `cocktails/recipe-margarita.dc.html` |
| `/cocktails/margarita/guide` | Cook mode | `cocktails/cook-mode.dc.html` |
| `/coffee` | Coffee home | `coffee/home.dc.html` |
| `/coffee/espresso` | Recipe | `coffee/recipe-espresso.dc.html` |
| `/coffee/espresso/guide` | Brew mode + shot timer | `coffee/brew-mode.dc.html` |

- **NFC tags** store the full recipe URL, e.g. `https://<domain>/coffee/espresso` (fits NTAG213).
- **Slugs are permanent** once a coaster ships. Renames get a redirect, never a changed tag.
- Optionally append `?src=nfc` to the URL written on each tag so analytics can tell taps from browsing.
- **Guided mode** keeps the current step in the URL (`?step=4`) so a refresh doesn't lose the user's place.
- **Catalog drinks without a recipe file yet** render as non-linked cards (or link to a "coming soon" state). Never link to a 404.

## 5. Theming architecture

- `base.css` holds shared tokens: spacing, type sizes by role, button heights, and the body/heading defaults.
- `cocktail.css` and `coffee.css` set the **same semantic token names** under `[data-theme="…"]`.
- `BaseLayout` sets `<html data-theme>` from the collection config.
- **Components use only `var(--…)` tokens.** A raw hex value in a component is a bug.
- **Fonts:** load only the active theme's fonts. Move each theme's `@import` into the layout per collection, or self-host the font files with `<link rel="preload">` and `font-display: swap`.

Token summary:

| Token | Cocktails | Coffee |
|---|---|---|
| `--color-bg` | #F4F0E7 paper | #F5EDE0 oat + grain texture |
| `--color-surface` / `-2` | #F4F0E7 / #EAE4D7 | #FCF7EE cream / #EFE4D3 latte |
| `--color-ink` / `-muted` | #16191B / #4D5357 | #2B1D14 / #6B5242 |
| `--color-accent` (fill) | #C9A15B brass, on dark only | #A9532A terracotta |
| `--color-accent-ink` (text) | #7A5A1F | #974722 |
| `--color-secondary` / `-soft` | n/a | #4E5C45 sage / #E3E8DB |
| `--color-inverse` | #1F2326 slate (hero, art bg) | #3A2A20 cocoa (dial-in, timer, footer) |
| `--font-display` | Bodoni Moda 800–900 | Fraunces 700, `"SOFT" 100` |
| `--font-body` | Instrument Sans | Nunito |
| `--radius-card` / `-control` | 4px / 4px | 20px / 999px (pills) |
| `--shadow-card` | none (hairline rules) | soft two-layer brown |
| `--hero-frame` | `coaster`: double border + 4 corner dots on slate | `card`: cream card with an inset rule |
| `--guided-surface` | dark | light (timer card is dark) |

Components that change shape between themes, such as the `HeroArt` frame variant, read a **prop from the collection config**. Don't try to do it with CSS alone.

## 6. Content model

Source files: `content/cocktails/margarita.json`, `content/coffee/espresso.json`, `content/collections.json`.
Margarita was normalized: `tips` was split into `tips` and `commonMistakes`, `equipment` became objects, and `containsAlcohol` was added. In Espresso, `contains_alcohol` became `containsAlcohol`.

```ts
type Amount = string; // "2 oz", "18 g", "Rim". Numeric prefix + unit scales; anything else doesn't.

interface Drink {
  collection: "cocktails" | "coffee";
  slug: string; name: string;
  tags: string[];               // exactly 3; display in title case ("CRÉMA" → "Créma")
  tagline: string; intro: string;
  heroImage: string; heroAlt: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  prepTimeMinutes: number; servings: number;
  serveTemp?: "Hot" | "Iced";                         // coffee
  glassware?: { name: string; note?: string };         // cocktails
  vessel?: { name: string; sizeOz?: number; note?: string }; // coffee
  garnish?: string[];
  ingredients: { amount: Amount; item: string; note?: string }[];
  equipment: { item: string; alternative?: string }[];
  steps: { title: string; body: string; tip?: string }[];
  dialIn?: { doseGrams: number; yieldGrams: number; grind: string; waterTempF: number; timeSeconds: string };
  timer?: { stepIndex: number; targetMinSeconds: number; targetMaxSeconds: number; scaleMaxSeconds: number };
  homeMethods?: { method: string; note: string }[];
  tips?: string[]; commonMistakes?: string[];
  variations?: { name: string; description: string }[];
  substitutions?: string[];
  flavorProfile?: Record<string, 1 | 2 | 3 | 4 | 5>;   // any 4 axes, rendered in key order
  history?: string;              // not rendered in v1
  containsAlcohol: boolean;
  relatedSlugs: string[];
  seo: { title: string; description: string };
}
```

`collections.json` defines each collection's theme, brand name, home copy, guided-mode name, quick-fact fields, filters, footer text and catalog (all drinks, including ones without a recipe file yet).

**Every optional module renders only when its data exists.** For example, Margarita has no `dialIn`, so it skips that card.

## 7. Shared components

| Component | Notes |
|---|---|
| `PageHeader` | Wordmark (collection `brandName`) linking to the collection home, plus a right-side link ("All cocktails" / "All coffee"). 56–60px tall. |
| `DrinkTitle` | Name (display font; uppercase only in the cocktail theme), tagline, 3 tags. Cocktail: tags as a dot-separated line. Coffee: tags as sage pills, with a steam ornament above the name. |
| `HeroArt` | Variant `coaster` or `card`. The image has explicit width and height, `fetchpriority="high"`, and is never lazy-loaded. Caption: `heroLabel`. |
| `QuickFacts` | Fields from `collection.quickFacts`. Cocktail: 3-column `<dl>` between strong rules. Coffee: 4 cream tiles. Below it, the glassware or vessel note. |
| `Intro` | Lead text size. |
| `Ingredients` + `ServingsSelector` (island) | Segmented 1 / 2 / 4 with `aria-pressed`. Scales the numeric amounts. Cocktails show ml next to oz (1 oz ≈ 30 ml). Coffee shows the dose count. Non-numeric amounts ("Rim") don't scale. Coffee at ×2/×4 shows: "Pull N separate double shots. One basket holds one 18 g dose." |
| `Equipment` | List. If `alternative` is set, show a sage pill reading "No machine? …" or "No grinder? …" (wording from the item type). Cocktail renders chips. |
| `Steps` | `<ol>` with numerals (cocktail: large serif numerals in accent ink; coffee: terracotta circles). Each `tip` renders as a callout on `--color-surface-2`. A "Cook/Brew mode" button sits in the section header. |
| `DialInCard` | Coffee only. Inverse (cocoa) card holding a 2×2 grid: dose, yield, time, water (°F plus °C, computed), and grind spanning both columns. Footer: the "starting point" tip. |
| `MethodSwitcher` (island) | `role="tablist"` with tabs Machine / Moka pot / AeroPress. The Machine tab text is new copy (see `recipe-espresso.dc.html`). The other tabs use `homeMethods`, plus 2–3 fact pills each. Any extra `homeMethods` entry (e.g. strong brewed coffee) renders as a note below. |
| `TipsList` | "Common mistakes" (✕ icons) and "Good to know" / "Pro tips" (✓ icons), on a `surface-2` band. |
| `Variations` | Cocktail: list divided by rules. Coffee: cream cards. |
| `FlavorProfile` | One row per axis: label, 5 dots (filled `--color-accent`, empty outlined), "n/5". The row carries `aria-label="4 out of 5"`. |
| `RelatedGrid` | 2-column cards from `relatedSlugs`, falling back to the catalog name and meta. Art tile: the hero art if one exists, otherwise a monogram (cocktail) or bean icon (coffee). |
| `StickyCTA` | Full-width primary button, `position: sticky; bottom: 0`, linking to `/guide`. |
| `Footer` | `collection.footer`. Cocktails carry the responsible-drinking note; coffee carries the caffeine note. |

## 8. Page specs

### 8.1 Recipe page

Section order: PageHeader → DrinkTitle → HeroArt → QuickFacts → Intro → Ingredients → Equipment → Steps → DialIn? → MethodSwitcher? → TipsList → Variations → FlavorProfile? → RelatedGrid → StickyCTA → Footer.

(The cocktail design places Equipment inside the Ingredients section and doesn't show FlavorProfile. Both are acceptable; follow the reference for each theme.)

### 8.2 Guided mode (`/[collection]/[slug]/guide`)

- One step per screen. Step title is about 38–40px; body is about 23–25px.
- Segmented progress bar. The step region uses `aria-live="polite"`.
- Pinned bottom nav: Back (1fr) and Next (2fr), both 68px tall. Back is disabled on step 1. The last step's button reads "Done", which shows the done screen (`guidedModeDoneTitle`) with "Start over" / "Brew another".
- Exit (✕) returns to the recipe page.
- **Screen Wake Lock:** request on mount, re-acquire on `visibilitychange`, release on unmount. Hide the "screen stays awake" hint when the API isn't supported.
- **Cocktail:** dark surface. A header button opens an ingredients overlay.
- **Coffee:** light surface. A header button toggles the shot timer.

### 8.3 Shot timer (coffee, `timer` data)

- Auto-opens on `timer.stepIndex` ("Pull the shot"). Can be toggled on any step. Resets when the step changes.
- Display: `0.0 s` (tabular numerals, 48px).
- Controls: Start / Stop / Resume (56px primary pill) and a Reset icon button.
- Track from 0 to `scaleMaxSeconds`, with the target window (25–30 s) highlighted in sage.
- Status text (`aria-live="polite"`):
  - Before start: "Start with the shot"
  - Under the minimum: "Keep going…"
  - In the window: "In the window. Stop the shot."
  - Up to 5 s over: "A little long"
  - Beyond that: "Too long: grind coarser next time"
- Use `performance.now()` plus `requestAnimationFrame`. Only re-render on 0.1 s changes.
- Optional: a short vibration (`navigator.vibrate(40)`) when entering the window.

### 8.4 Collection home (`/[collection]`)

- Title, intro, a search field with a visible label, filter chips (`aria-pressed`), and a live count ("12 drinks").
- Cocktail: list rows. Coffee: 2-column card grid with Hot/Iced badges.
- Coffee filters: All / Hot / Iced / With milk (`milk` flag). Cocktail filters: All / by spirit.
- Filtering and search run client-side in one small island. The full list is in the static HTML, so it works without JavaScript.

## 9. Accessibility and performance checklist

- [ ] All text contrast pairs match the token comments (each ≥ 4.5:1)
- [ ] Every control is a real `<button>` / `<a>` / `<input>` + `<label>`; icon-only buttons have an `aria-label`
- [ ] Segmented controls use `aria-pressed`; the method switcher uses the `tablist` / `tab` / `tabpanel` roles
- [ ] Decorative SVGs (steam, beans, dots, diamond dividers) use `aria-hidden="true"`
- [ ] Layout works at 320px width and at 200% zoom without horizontal scroll
- [ ] `prefers-reduced-motion` respected
- [ ] Hero image is WebP with width/height set; other images lazy-load
- [ ] Fonts: two families per page at most, preloaded, `font-display: swap`
- [ ] No layout shift when islands hydrate (render server HTML at the default state)

## 10. SEO

- `<title>` and meta description come from `seo`. Add an Open Graph image (the hero art) and a canonical URL.
- Add a JSON-LD `Recipe` built from the recipe data: `recipeIngredient` from ingredients, `recipeInstructions` as `HowToStep` from steps, `totalTime` as `PT{prepTimeMinutes}M`, and `recipeYield`.

## 11. Build plan

1. **Foundation.** Scaffold Astro, add the themes, BaseLayout with `data-theme`, the Zod schema, and content loading. *Done when* both JSON files validate and `/coffee/espresso` renders the title and hero in the coffee theme.
2. **Recipe page (static parts).** All non-interactive components. *Done when* both recipe pages match their references at 390px.
3. **Islands.** ServingsSelector, MethodSwitcher, FlavorProfile. *Done when* scaling is correct for 1/2/4 servings and keyboard and screen reader checks pass.
4. **Guided mode + shot timer + wake lock.** *Done when* the timer status thresholds behave as in §8.3 and `?step` survives a refresh.
5. **Collection homes.** Search and filters. *Done when* filters work with and without JavaScript, and catalog items without recipes aren't broken links.
6. **Polish.** SEO, JSON-LD, Lighthouse ≥ 95, the §9 checklist, and 404 / redirects.

## 12. Open items

- Placeholders: `[YOUR BRAND]`, `[YOUR CAFÉ]`, `[YEAR]`, and the "Shop coasters" link URL.
- Domain, and whether each collection should get its own domain or subdomain later (the routing supports adding host-based mapping).
- Hero art for every catalog drink other than Margarita and Espresso (the existing two were cropped from the coaster art and tinted: light lines on #1F2326 for cocktails, brown lines on #FBF6EC for coffee).
- Recipe JSON for the remaining 7 cocktails and 11 coffee drinks.
- The platform landing page `/` hasn't been designed yet.
- Whether to show `history` and `substitutions` (both are in the data but not in v1 of the designs).

## 13. Design reference index

`design/reference/` holds exports from the design canvas. **They are references, not production code.** Read them for layout, spacing, copy, colors and interaction states. Ignore their tool-specific scaffolding: `<x-dc>`, `<helmet>`, `<sc-for>`, `<sc-if>`, `{{…}}` placeholders, `support.js`, and `class Component extends DCLogic`. The `renderVals()` functions in them show the intended interaction logic (scaling, filters, timer thresholds).

| File | What it shows |
|---|---|
| `shared-layout-and-themes.dc.html` | Token table for both themes, shared rules, recipe anatomy, one component drawn in both themes, coffee components |
| `cocktails/design-system.dc.html` | Cocktail palette, type scale, spacing, buttons, cards |
| `cocktails/recipe-margarita.dc.html` | Cocktail recipe page (interactive servings) |
| `cocktails/cook-mode.dc.html` | Cocktail guided mode (ingredients overlay) |
| `cocktails/home.dc.html` | Cocktail home (search + spirit filter) |
| `coffee/recipe-espresso.dc.html` | Coffee recipe page (servings, method switcher, dial-in, flavor) |
| `coffee/brew-mode.dc.html` | Coffee guided mode with shot timer |
| `coffee/home.dc.html` | Coffee home, all 12 drinks |
| `*/coaster-art-*.png` | Original coaster artwork |
