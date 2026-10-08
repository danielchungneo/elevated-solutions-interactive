# Cocktail site starter kit

1. Unzip this folder and open it in Cursor or Claude Code. The brief is in `AGENTS.md`; Cursor reads it automatically, and `CLAUDE.md` points Claude Code to it.
2. Paste this as your first prompt:

> Read AGENTS.md and the files in design/. Scaffold an Astro project in this folder with React islands, using the existing content/ and public/ folders. Build the design tokens and a base layout first, then the recipe page at /c/[slug] from content/cocktails/margarita.json, matching design/reference/Main.dc.html. Stop after the recipe page so I can review it, then we'll do cook mode and the home page.

3. Run `npm run dev` and check the page at phone width (390px) in your browser's dev tools.

## Contents

- `AGENTS.md`: build brief (stack, routes, page specs, accessibility and performance rules)
- `design/tokens.css`: colors, type, spacing and sizing as CSS variables
- `design/reference/`: the canvas artboards (recipe, cook mode, home, design system) plus the original coaster art
- `content/cocktails/margarita.json`: sample recipe. Add one JSON file per drink.
- `public/images/margarita-hero.webp`: hero art (light line art on slate #1F2326)
