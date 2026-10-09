# Elevated Solutions Interactive — NFC Product Platform

Mobile-first site for NFC-linked Elevated Solutions products. Cocktails are the first live section; more (coffee, prayer, puzzles) will follow.

## Stack

- **Astro** (static) + **React islands** for servings scaler, cook mode, and cocktail search/filter
- Content: `content/cocktails/*.json` (Zod-validated content collection)
- Sections directory: `src/lib/sections.ts`
- Design tokens: `src/styles/tokens.css` (from Claude Design handoff)
- Deploy: static output → Vercel or Netlify

## Routes

| Route | Page |
|---|---|
| `/` | Company section directory |
| `/cocktails` | Cocktail library (search + spirit filter) |
| `/cocktails/[slug]` | Recipe page (NFC target — keep these URLs stable) |
| `/cocktails/[slug]/cook` | Hands-free cook mode |

## Develop

```bash
npm install
npm run dev
```

Open at phone width (~390px). Sample recipe: [http://localhost:4321/cocktails/margarita](http://localhost:4321/cocktails/margarita)

```bash
npm run build
npm run preview
```

## Add a cocktail

1. Add `content/cocktails/<slug>.json` matching the schema in `src/content.config.ts`
2. Optionally add hero art at `public/images/<slug>-hero.webp` and set `heroImage` / `heroAlt` in the JSON
3. Rebuild — the new page is generated automatically

Drinks without hero art show a monogram in the coaster frame.

## Brand placeholders

Edit `src/lib/site.ts` for brand name, shop URL, and site description. Set `site` in `astro.config.mjs` to your production domain before launch.

## Handoff sources

- Build brief: `AGENTS.md`
- Design references: `handoff-docs/cocktail-site-handoff/design/reference/`
- Coaster posters: `assets/Cocktail Designs/`
- Recipe source: `artifacts/cocktail-recipes.md`
- Product plan: `artifacts/nfc-cocktail-coasters-project-plan.md`
