import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SLATE = { r: 31, g: 35, b: 38 }; // #1F2326
const CREAM = { r: 228, g: 222, b: 209 }; // #E4DED1
const CANVAS_W = 525;
const CANVAS_H = 590;

/** Isolated drink illustrations in Cocktail Designs/Only Drink/ */
const SOURCES = {
  "espresso-martini": "espresso-martini.png",
  mojito: "mojito.png",
  "moscow-mule": "moscow-mule.png",
  "whiskey-sour": "whiskey-sour.png",
  martini: "martini.png",
  negroni: "negroni.png",
  "aperol-spritz": "aperol-spritz.png",
  daiquiri: "daiquiri.png",
  manhattan: "manhattan.png",
  "pina-colada": "pina-colada.png",
  margarita: "margarita.png",
  "old-fashioned": "old-fashioned.png",
};

const ALTS = {
  margarita:
    "Engraved line illustration of a Margarita with a salted rim and a lime wheel",
  "old-fashioned":
    "Engraved line illustration of an Old Fashioned with a large ice cube, orange and cherry",
  "espresso-martini":
    "Engraved line illustration of an Espresso Martini in a coupe with foam and coffee beans",
  mojito:
    "Engraved line illustration of a Mojito in a highball glass with mint and lime",
  "moscow-mule":
    "Engraved line illustration of a Moscow Mule in a copper mug with lime and mint",
  "whiskey-sour":
    "Engraved line illustration of a Whiskey Sour with citrus and a cherry",
  martini: "Engraved line illustration of a Martini with an olive",
  negroni:
    "Engraved line illustration of a Negroni in a rocks glass with an orange slice",
  "aperol-spritz":
    "Engraved line illustration of an Aperol Spritz with an orange slice",
  "pina-colada":
    "Engraved line illustration of a Piña Colada with pineapple, cherry and umbrella",
  daiquiri: "Engraved line illustration of a Daiquiri in a coupe with lime",
  manhattan: "Engraved line illustration of a Manhattan in a coupe with a cherry",
};

/**
 * Keep the largest ink blob (the drink) plus nearby garnish blobs
 * (e.g. espresso beans) whose centers sit inside the drink's bounds.
 * Drops the decorative frame and corner dots outside that region.
 */
function keepDrinkInk(grey, width, height, threshold = 40) {
  const labels = new Int32Array(width * height);
  const sizes = [0];
  const sumX = [0];
  const sumY = [0];
  let label = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (grey[i] <= threshold || labels[i]) continue;
      label += 1;
      sizes[label] = 0;
      sumX[label] = 0;
      sumY[label] = 0;
      const stack = [i];
      labels[i] = label;
      while (stack.length) {
        const cur = stack.pop();
        sizes[label] += 1;
        const cx = cur % width;
        const cy = (cur - cx) / width;
        sumX[label] += cx;
        sumY[label] += cy;
        const coords = [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1],
        ];
        for (const [nx, ny] of coords) {
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const ni = ny * width + nx;
          if (grey[ni] > threshold && !labels[ni]) {
            labels[ni] = label;
            stack.push(ni);
          }
        }
      }
    }
  }

  if (label < 1) return Buffer.alloc(grey.length);

  let best = 1;
  for (let id = 2; id <= label; id++) {
    if (sizes[id] > sizes[best]) best = id;
  }

  // Bounding box of the main drink art
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let i = 0; i < labels.length; i++) {
    if (labels[i] !== best) continue;
    const x = i % width;
    const y = (i - x) / width;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  const padX = Math.round((maxX - minX) * 0.08);
  const padY = Math.round((maxY - minY) * 0.08);
  minX = Math.max(0, minX - padX);
  minY = Math.max(0, minY - padY);
  maxX = Math.min(width - 1, maxX + padX);
  maxY = Math.min(height - 1, maxY + padY);

  const keep = new Uint8Array(label + 1);
  keep[best] = 1;
  // Garnish only: small blobs over the drink. Skip large loops (frame).
  const maxGarnish = Math.max(80, Math.round(sizes[best] * 0.12));
  for (let id = 1; id <= label; id++) {
    if (id === best || sizes[id] === 0 || sizes[id] > maxGarnish) continue;
    const cx = sumX[id] / sizes[id];
    const cy = sumY[id] / sizes[id];
    if (cx >= minX && cx <= maxX && cy >= minY && cy <= maxY) {
      keep[id] = 1;
    }
  }

  const out = Buffer.alloc(grey.length);
  for (let i = 0; i < grey.length; i++) {
    if (keep[labels[i]]) out[i] = grey[i];
  }
  return out;
}

/** Trim to ink so we drop empty paper. */
function contentBounds(grey, width, height, threshold = 40) {
  let minX = width,
    minY = height,
    maxX = 0,
    maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grey[y * width + x] > threshold) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX <= minX || maxY <= minY) {
    return { left: 0, top: 0, width, height };
  }
  const pad = Math.round(Math.min(width, height) * 0.03);
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const right = Math.min(width, maxX + pad + 1);
  const bottom = Math.min(height, maxY + pad + 1);
  return { left, top, width: right - left, height: bottom - top };
}

function remapToSlate(greyBuffer) {
  const out = Buffer.alloc(greyBuffer.length * 3);
  for (let i = 0, j = 0; i < greyBuffer.length; i++, j += 3) {
    const t = Math.pow(greyBuffer[i] / 255, 1.1);
    const ink = t < 0.06 ? 0 : (t - 0.06) / 0.94;
    out[j] = Math.round(SLATE.r + ink * (CREAM.r - SLATE.r));
    out[j + 1] = Math.round(SLATE.g + ink * (CREAM.g - SLATE.g));
    out[j + 2] = Math.round(SLATE.b + ink * (CREAM.b - SLATE.b));
  }
  return out;
}

async function makeHero(srcPath, outPath) {
  const { data, info } = await sharp(srcPath)
    .greyscale()
    .normalize()
    .negate()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cleaned = keepDrinkInk(data, info.width, info.height);
  const bounds = contentBounds(cleaned, info.width, info.height);
  const trimmedGrey = Buffer.alloc(bounds.width * bounds.height);
  for (let y = 0; y < bounds.height; y++) {
    for (let x = 0; x < bounds.width; x++) {
      trimmedGrey[y * bounds.width + x] =
        cleaned[(y + bounds.top) * info.width + (x + bounds.left)];
    }
  }

  const remapped = remapToSlate(trimmedGrey);
  const artPng = await sharp(remapped, {
    raw: { width: bounds.width, height: bounds.height, channels: 3 },
  })
    .resize({ width: 400, height: 500, fit: "inside" })
    .png()
    .toBuffer();

  const artMeta = await sharp(artPng).metadata();
  const left = Math.max(0, Math.round((CANVAS_W - artMeta.width) / 2));
  const top = Math.max(0, Math.round((CANVAS_H - artMeta.height) / 2));

  const base = await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 3,
      background: SLATE,
    },
  })
    .png()
    .toBuffer();

  await sharp(base)
    .composite([{ input: artPng, left, top }])
    .webp({ quality: 90 })
    .toFile(outPath);
}

const outDir = "public/images";
const srcDir = path.join("Cocktail Designs", "Only Drink");
fs.mkdirSync(outDir, { recursive: true });

for (const [slug, file] of Object.entries(SOURCES)) {
  const src = path.join(srcDir, file);
  if (!fs.existsSync(src)) {
    console.error("missing", src);
    continue;
  }
  const out = path.join(outDir, `${slug}-hero.webp`);
  await makeHero(src, out);
  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log(`${file} → ${slug}-hero.webp (${kb}KB)`);

  const jsonPath = path.join("content/cocktails", `${slug}.json`);
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const ordered = {
    slug: data.slug,
    name: data.name,
    tags: data.tags,
    tagline: data.tagline,
    intro: data.intro,
    heroImage: `/images/${slug}-hero.webp`,
    heroAlt: ALTS[slug],
    difficulty: data.difficulty,
    prepTimeMinutes: data.prepTimeMinutes,
    servings: data.servings,
    glassware: data.glassware,
    garnish: data.garnish,
    ingredients: data.ingredients,
    equipment: data.equipment,
    steps: data.steps,
    tips: data.tips,
    variations: data.variations,
    substitutions: data.substitutions,
    flavorProfile: data.flavorProfile,
    history: data.history,
    relatedSlugs: data.relatedSlugs,
    seo: data.seo,
  };
  fs.writeFileSync(jsonPath, `${JSON.stringify(ordered, null, 2)}\n`);
}

console.log("done");
