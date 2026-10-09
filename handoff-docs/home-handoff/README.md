# NFC Coaster Platform: starter kit

A handoff kit for building the cocktail and coffee recipe sites in Cursor or Claude Code.

## Get started

1. Unzip this kit and open the folder in Cursor.
   - `.cursor/rules/handoff.mdc` loads the project rules automatically.
   - Claude Code reads `CLAUDE.md`, which points to the same rules.
2. Paste this as your first prompt (Agent mode):

> Read docs/HANDOFF.md and AGENTS.md. Do milestone 1 only: scaffold an Astro project in this folder with React islands, keeping the existing content/, design/ and public/ folders. Wire up design/themes (base + per-collection theme via `data-theme` on `<html>`), the Zod content schema from HANDOFF §6, and a recipe route at /[collection]/[slug] that renders the title and hero art. Verify both content/cocktails/margarita.json and content/coffee/espresso.json load. Then stop and summarize.

3. Run `npm run dev` and check `/coffee/espresso` and `/cocktails/margarita` at 390px width in dev tools.
4. To build the home page, use: "Read docs/HANDOFF-platform-home.md and build the platform home page at / with data-theme="platform", matching design/reference/platform/home.dc.html at 390px. Use content/platform.json and pull the live drink counts from content/collections.json."
5. Continue one milestone at a time (HANDOFF §11). For example: "Do milestone 2: build the static recipe page components to match design/reference/coffee/recipe-espresso.dc.html and cocktails/recipe-margarita.dc.html."

## Contents

| Path | What |
|---|---|
| `docs/HANDOFF-platform-home.md` | Platform home page spec: Laser Studio theme, section cards, live and coming-soon states |
| `docs/HANDOFF.md` | Full build spec: routes, theming, content schema, components, guided mode and shot timer, accessibility, SEO, milestones, open items |
| `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/` | Project rules for AI coding tools |
| `design/themes/` | `base.css` (shared) + `cocktail.css` + `coffee.css` + `platform.css` (semantic tokens) |
| `design/reference/` | Design-canvas artboards for every screen, plus the original coaster art |
| `content/` | `platform.json` (home page sections) + `collections.json` (themes, copy, filters, catalogs) + Margarita and Espresso recipes |
| `public/` | Hero art (WebP) and the paper-grain texture |

To preview a design reference, open the `.dc.html` file in a browser for a rough view of the markup. Styles are inline, but the interactive parts only run in the design canvas.
