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
 * Keep only the largest ink blob (the drink).
 * Drops the decorative frame, which is a separate thin connected component.
 */
function keepLargestInkBlob(grey, width, height, threshold = 40) {
  const labels = new Int32Array(width * height);
  const sizes = [0];
  let label = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (grey[i] <= threshold || labels[i]) continue;
      label += 1;
      sizes[label] = 0;
      const stack = [i];
      labels[i] = label;
      while (stack.length) {
        const cur = stack.pop();
        sizes[label] += 1;
        const cx = cur % width;
        const cy = (cur - cx) / width;
        const neighbors = [
          cur + 1,
          cur - 1,
          cur + width,
          cur - width,
        ];
        const coords = [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1],
        ];
        for (let n = 0; n < 4; n++) {
          const [nx, ny] = coords[n];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const ni = neighbors[n];
          if (grey[ni] > threshold && !labels[ni]) {
            labels[ni] = label;
            stack.push(ni);
          }
        }
      }
    }
  }

  let best = 1;
  for (let id = 2; id <= label; id++) {
    if (sizes[id] > sizes[best]) best = id;
  }

  const out = Buffer.alloc(grey.length);
  for (let i = 0; i < grey.length; i++) {
    if (labels[i] === best) out[i] = grey[i];
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

  const cleaned = keepLargestInkBlob(data, info.width, info.height);
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
