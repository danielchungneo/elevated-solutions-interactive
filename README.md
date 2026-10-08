# Elevated Solutions Interactive — NFC Cocktail Coasters

Mobile-first recipe site. Each laser-engraved NFC coaster opens one cocktail page when tapped.

## Stack

- **Astro** (static) + **React islands** for servings scaler, cook mode, and home search/filter
- Content: `content/cocktails/*.json` (Zod-validated content collection)
- Design tokens: `src/styles/tokens.css` (from Claude Design handoff)
- Deploy: static output → Vercel or Netlify

## Routes

| Route | Page |
|---|---|
| `/` | Cocktail library (search + spirit filter) |
| `/c/[slug]` | Recipe page (NFC target — keep these URLs stable) |
| `/c/[slug]/cook` | Hands-free cook mode |

## Develop

```bash
npm install
npm run dev
```

Open at phone width (~390px). Sample recipe: [http://localhost:4321/c/margarita](http://localhost:4321/c/margarita)

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
- Design references: `cocktail-site-handoff/design/reference/`
- Coaster posters: `Cocktail Designs/`
- Recipe source: `artifacts/cocktail-recipes.md`
- Product plan: `artifacts/nfc-cocktail-coasters-project-plan.md`
