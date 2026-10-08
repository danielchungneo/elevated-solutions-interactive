# NFC Cocktail Coasters: Web Platform Plan

## 1. Project Summary

**Product:** Slate cocktail coasters with laser-engraved recipe art and an NFC tag. Tapping a phone on the coaster opens a mobile-friendly web page with in-depth instructions for that cocktail.

**Goal:** One public React web app, hosted on Vercel, that serves a page per cocktail now and supports other kinds of NFC-linked pages for other company products later.

**Tooling plan:**
- **Content:** Claude (chat) expands each short coaster recipe into full instructions.
- **Design:** Claude Design for the page layouts and visual system.
- **Build and deploy:** Claude Code builds the app and deploys it to Vercel.

**Status:**
- Coaster artwork is approved (Piña Colada is the master template) and the other designs are being generated.
- The next phase is the web platform, covered in this document.

---

## 2. Cocktail List (12 coasters)

| # | Cocktail | Coaster recipe (already on the coaster) |
|---|----------|------------------------------------------|
| 1 | Margarita | 2 oz tequila, 1 oz lime juice, 1 oz orange liqueur, salt rim |
| 2 | Old Fashioned | 2 oz bourbon or rye, 1 sugar cube, 2 dashes Angostura bitters, 1 tsp water |
| 3 | Espresso Martini | 2 oz vodka, 1 oz coffee liqueur, 1 oz fresh espresso, ½ oz simple syrup |
| 4 | Mojito | 2 oz white rum, 1 oz lime juice, 2 tsp sugar, 8 mint leaves, soda water |
| 5 | Moscow Mule | 2 oz vodka, ½ oz lime juice, 4 oz ginger beer |
| 6 | Whiskey Sour | 2 oz bourbon, ¾ oz lemon juice, ¾ oz simple syrup |
| 7 | Martini | 2½ oz gin, ½ oz dry vermouth, olive or lemon twist |
| 8 | Negroni | 1 oz gin, 1 oz Campari, 1 oz sweet vermouth |
| 9 | Aperol Spritz | 3 oz prosecco, 2 oz Aperol, 1 oz soda water |
| 10 | Piña Colada | 2 oz white rum, 1½ oz cream of coconut, 1½ oz pineapple juice, 1 cup ice |
| 11 | Daiquiri | 2 oz white rum, 1 oz lime juice, ¾ oz simple syrup |
| 12 | Manhattan | 2 oz rye whiskey, 1 oz sweet vermouth, 2 dashes Angostura bitters |

---

## 3. Decisions to Make Before Building

### 3.1 Vercel plan: Hobby vs. Pro (important)

Your plan is to host on your personal Vercel account. Vercel's fair use guidelines say Hobby teams are restricted to **non-commercial personal use only**, and that all commercial usage requires a Pro or Enterprise plan. Vercel defines commercial usage as any deployment used for the financial gain of anyone involved in the project.

These coasters are a product you sell (Etsy, LLC), so this site is very likely commercial use, even if the pages themselves are free to view.

**Recommendation:**
- Plan on **Vercel Pro** for this project. Check current pricing on Vercel's site, since it changes.
- If you're unsure, ask Vercel Support to confirm in writing.
- Pro can still live under your personal account's team setup, but consider creating a team named after your LLC so billing and ownership are clean.
- Do not start on Hobby and hope it slides. Customers' tags are physical, permanent products, so the hosting has to stay stable.

Sources: https://vercel.com/docs/limits/fair-use-guidelines and https://vercel.com/docs/plans/hobby

### 3.2 Domain (strongly recommended)

NFC tags are physically embedded and hard to reprogram at scale. **Never write a `*.vercel.app` URL to a tag.** Buy a short domain you control and write that to every tag. Then you can move hosting or restructure pages later without touching a single coaster.

- Pick a short domain (shorter URLs also mean smaller NFC payloads).
- Connect it in Vercel, then confirm HTTPS works.

### 3.3 URL strategy: the tag URL is permanent, the destination is flexible

Use stable, short, product-oriented URLs, and put a redirect layer between the tag and the real page:

```
Tag URL (permanent):  https://yourdomain.com/t/<tag-id>
         |
         v   (lookup in a redirects/config file)
Real page (changeable): https://yourdomain.com/cocktails/old-fashioned
```

Benefits:
- You can retarget any tag later (seasonal pages, a new recipe version, a promo, a different product type).
- You can add analytics per tag.
- Tags programmed today never break when the site structure changes.

Simple version: skip the `/t/` layer at first and write `/cocktails/<slug>` to the tag. The redirect layer is better if you expect to sell other NFC products on this platform, which you've said you do.

---

## 4. Architecture

### 4.1 Framework

**Recommended: Next.js (App Router) + TypeScript, deployed on Vercel.**

Why:
- It's React, which matches your preferred stack.
- Static generation gives near-instant loads on a phone tap, which matters for NFC.
- File-based routing makes "many page types" straightforward.
- It deploys to Vercel with zero config.

Styling: Tailwind CSS or your usual React/MUI approach. Pick one in the Claude Design phase and keep it.

### 4.2 Multi-purpose structure

The site is a **platform**, and cocktails are the first content type. Keep each page type in its own section with its own template and data:

```
/app
  /(marketing)            # optional home / about / company page
  /cocktails
    /[slug]/page.tsx      # cocktail recipe template (SSG)
  /t/[tagId]/route.ts     # NFC redirect resolver (optional)
  /<future-type>          # e.g. /care-guides, /warranty, /menus, /links
/content
  /cocktails/*.json|.mdx  # one file per recipe
  /<future-type>/*
/components
  /ui                     # shared design-system components
  /cocktail               # cocktail-specific components
/lib
  schema.ts               # content types and validation
  tags.ts                 # tag-id to destination map
/public                   # images, icons, OG images
```

Rules:
- **Content is data, not code.** Adding the 13th cocktail should mean adding one file, not editing components.
- **Shared design system** (colors, typography, buttons, layout shell) is reused across all page types.
- **One template per page type**, fed by typed content.
- **Static generation** (`generateStaticParams`) for all content pages.

### 4.3 Cocktail content model

Define this once so Claude generates every recipe in the same shape:

```ts
type Cocktail = {
  slug: string;                 // "old-fashioned"
  name: string;                 // "Old Fashioned"
  tags: [string, string, string];
  tagline: string;              // matches the coaster tagline
  intro: string;                // 2 to 3 sentence story/flavor summary
  difficulty: "Easy" | "Medium" | "Advanced";
  prepTimeMinutes: number;
  servings: number;
  glassware: { name: string; note?: string };
  garnish: string[];
  ingredients: {
    amount: string;             // "2 oz"
    item: string;               // "Bourbon or rye"
    note?: string;              // brand/substitute guidance
  }[];
  equipment: string[];
  steps: { title: string; body: string; tip?: string }[];
  tips: string[];               // pro tips, common mistakes
  variations: { name: string; description: string }[];
  substitutions?: string[];
  flavorProfile: { sweet: number; sour: number; bitter: number; strong: number }; // 1 to 5
  history?: string;             // short, accurate origin note
  relatedSlugs: string[];       // links to other cocktails
  seo: { title: string; description: string };
};
```

### 4.4 Page features for the cocktail template

- Mobile-first, readable one-handed, one-column layout.
- Hero with drink name, tags, and a black-and-white illustration matching the coaster.
- Ingredient list with a **servings scaler** (1 / 2 / 4 drinks).
- **Step-by-step view**, optionally a big-text "cook mode" that keeps the screen on.
- Pro tips, variations, and substitutions.
- "More cocktails" links to the other 11 recipes.
- Responsible-drinking note in the footer.
- Fast: no heavy client JS, optimized images, proper meta tags and Open Graph image.

### 4.5 Analytics (optional, later)

Vercel Web Analytics or a privacy-friendly alternative, so you can see which coasters get tapped. The `/t/<tag-id>` redirect layer makes per-tag counts easy.

---

## 5. NFC Tag Notes

- **Tag type:** NTAG213 is typically enough for a single URL. NTAG215 or 216 offers more memory. Confirm the tag works through your slate thickness and any adhesive, because stone and metal can interfere.
- **Write one URL** per tag using an NDEF URI record. Free phone apps such as NFC Tools can write tags.
- **Keep URLs short** and avoid tracking parameters.
- **Lock tags** (write-protect) after programming and testing, so customers can't overwrite them.
- **Test on both iPhone and Android**, with the phone case on. iPhones read NFC tags in the background on recent models, Android varies by setting.
- **Test through the actual slate** before you commit to a batch.
- Consider adding a **QR code fallback** on packaging or a card, for phones with NFC off.
- Keep a spreadsheet mapping **tag ID, product, URL, date programmed**.

---

## 6. Process Roadmap

### Phase 1: Content (Claude chat)
1. Use the prompt in Section 7.1 to expand each of the 12 recipes into the Section 4.3 data shape.
2. Review every recipe yourself for accuracy and taste. Verify measurements and history claims, since AI can get cocktail history wrong.
3. Save the output as one JSON file per cocktail.

### Phase 2: Design (Claude Design)
1. Gather inputs: the coaster artwork (approved Piña Colada image plus the other designs), your company name/logo, and the black-and-white engraved aesthetic.
2. Use the prompt in Section 7.2 to design the cocktail page template, mobile first, including the design system (type, colors, spacing, components).
3. Iterate on one cocktail page until it's right, then use the same template for all 12.
4. Export or hand off the design in whatever form Claude Design currently supports (code, assets, or a spec). Check its current export options when you get there.
5. Also design a simple home or landing page for the domain, since people will visit the root URL.

### Phase 3: Build (Claude Code)
1. Create an empty GitHub repo and a project folder.
2. Start Claude Code in the folder and give it the kickoff prompt in Section 7.3 plus the design export and the 12 JSON files.
3. Have it create a `CLAUDE.md` with the architecture rules from Section 4.2, so future sessions follow the same conventions.
4. Build in order: scaffold, design system, cocktail template, content loading, then all 12 pages.
5. Run locally and test on your actual phone (same Wi-Fi, or use a Vercel preview URL).

### Phase 4: Deploy (Claude Code + Vercel)
1. Push to GitHub.
2. In Vercel, import the repo. Framework preset: Next.js.
3. Resolve the plan question (Section 3.1) before launching publicly.
4. Add your custom domain and confirm HTTPS.
5. Use **preview deployments** for every change and promote to production when approved.
6. Optionally let Claude Code use the Vercel CLI (`vercel`, `vercel --prod`), or rely on GitHub auto-deploys.
7. Add `robots` and `sitemap` handling. Decide whether you want these pages indexed by search.

### Phase 5: NFC rollout
1. Program one tag, embed or stick it in a test coaster, tap with an iPhone and an Android phone.
2. Fix any speed or layout problems.
3. Program the rest and log them in your tracking sheet.
4. Do a final tap-test on every coaster before it ships.

---

## 7. Prompts

### 7.1 Content expansion prompt (Claude chat)

```
I'm building recipe pages for NFC cocktail coasters. For each cocktail below, expand the short coaster recipe into a full, accurate, in-depth recipe page, returned as JSON matching this TypeScript type exactly: [paste the Cocktail type from Section 4.3].

Requirements:
- Keep the coaster recipe's ingredient amounts exactly as given. Add notes, substitutions and tips on top of them, without changing the base spec.
- Write clear, friendly, expert instructions a home bartender can follow: 5 to 8 steps with short titles, technique explanations (how long to shake or stir, why), and a tip where useful.
- Include glassware, garnish, equipment, difficulty, prep time, pro tips, common mistakes, 2 to 4 variations, and sensible substitutions.
- Keep history short and only include facts you are confident about. If origin is disputed, say so.
- Keep the tone warm and confident, with no filler.
- Return one JSON object per cocktail, no extra commentary.

Cocktails and coaster recipes:
[paste the table from Section 2]
```

### 7.2 Design prompt (Claude Design)

```
Design a mobile-first web page template for a cocktail recipe, opened when someone taps an NFC cocktail coaster with their phone. Brand feel: classic vintage cocktail poster, like engraved black-and-white line art on slate. Palette: black, off-white, with one restrained accent color. Typography: a high-contrast serif for titles, a clean readable sans for body text.

Page content, top to bottom: drink name and three tags; a hero illustration area (black and white line art); a quick-facts row (difficulty, prep time, glass); ingredients with a servings selector (1, 2, 4); numbered step-by-step instructions with optional tips; pro tips; variations; a "more cocktails" grid; a footer with a responsible-drinking note.

Also design: a "cook mode" with large text for following steps hands-free, and a simple home page for the domain that lists all cocktails.

Constraints: one-handed phone use, fast loading, high contrast, accessible text sizes, a reusable design system (colors, type scale, spacing, buttons, cards) since other page types will be added to this site later.

Use the Old Fashioned recipe as sample content: [paste one JSON recipe]. Reference artwork: [attach coaster images].
```

### 7.3 Kickoff prompt (Claude Code)

```
Build a mobile-friendly Next.js (App Router, TypeScript) site to deploy on Vercel. It hosts NFC-linked pages for my company. The first page type is cocktail recipes, but the architecture must support additional page types later.

Requirements:
- Content-driven: each cocktail is a JSON file in /content/cocktails following the type in lib/schema.ts (validate with Zod). Adding a cocktail means adding one file.
- Static generation for all content pages via generateStaticParams.
- Route structure: /cocktails/[slug] for recipes, an optional /t/[tagId] redirect resolver driven by a config file (lib/tags.ts), and a home page listing all content.
- Shared design system in /components/ui built from the attached design export. Page-type-specific components in their own folders.
- Features: servings scaler, step-by-step view, cook mode, related cocktails, SEO metadata and Open Graph tags per page, a sitemap.
- Performance and accessibility: Lighthouse mobile 90+, no unnecessary client JS.
- Create a CLAUDE.md documenting the architecture, folder conventions, and how to add a new cocktail and a new page type.

Process: plan first and show me the plan, scaffold the project, implement the design system, build the cocktail template, load the 12 recipes, run lint, type-check and build, then help me deploy to Vercel via GitHub. I will handle the Vercel plan and domain setup myself.

Attached: design export and the 12 JSON recipe files.
```

---

## 8. Deployment Checklist (personal Vercel account)

- [ ] Decide on Vercel Pro (see Section 3.1) before public launch.
- [ ] GitHub repo created and connected to Vercel.
- [ ] Framework preset is Next.js, Node version matches local.
- [ ] Custom domain added, DNS configured, HTTPS active.
- [ ] Production branch set to `main`, preview deployments enabled.
- [ ] No secrets committed. Use Vercel environment variables if any are needed.
- [ ] Open Graph images and metadata present for every page.
- [ ] Test every cocktail URL on a real phone.
- [ ] `/t/<tag-id>` redirects tested, if used.
- [ ] 404 page designed, so a mistyped or retired tag lands somewhere helpful.
- [ ] Analytics enabled (optional).
- [ ] Final production URLs recorded in the NFC tracking sheet.

---

## 9. Future-Proofing for Other NFC Products

Because this site will serve other page types, design for it from day one:

- **Page types as modules:** each type gets its own content folder, schema, template and route.
- **Shared shell:** common header, footer, theme and components so everything feels like one brand.
- **Per-product tags:** every physical product gets a tag ID in `lib/tags.ts`, even if the destination is the same page for now.
- **Possible future types:** care instructions, warranty registration, menus, social links hubs, product stories, reorder pages, event pages.
- **If you later need a CMS or dynamic data** (for example editing recipes without code), add a headless CMS or a database like Supabase behind the same content types. The schema-first approach makes that migration easy.

---

## 10. Content and Compliance Notes

- Add a short **drink responsibly / 21+ (US)** note in the footer. Consider whether you want a simple age notice, since these are alcohol recipes.
- Don't make health claims.
- Check that any history and brand names (Aperol, Campari, Angostura) are used descriptively and accurately.
- Illustrations should be your own or AI-generated art you have the right to use commercially. Check the terms of the image tool you used.
- Add a simple privacy line if you enable analytics.

---

## 11. Suggested Next Steps (in order)

1. **Resolve the Vercel plan question** and buy your domain.
2. **Finish generating the remaining coaster designs** (in progress).
3. **Run the content prompt (7.1)** and review all 12 recipes.
4. **Run the design prompt (7.2) in Claude Design** with one cocktail first, then lock the template.
5. **Start Claude Code with the kickoff prompt (7.3)**, and let it plan before it builds.
6. **Deploy to a preview URL** and tap-test with a prototype coaster and a real NFC tag.
7. **Program all tags** once the production URLs are final, then lock them.
8. **Update the Etsy listings** to mention the NFC recipe feature, which is a strong selling point.
