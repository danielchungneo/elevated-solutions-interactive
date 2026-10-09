/**
 * Build coffee hero WebPs from assets/Coffee Designs/Drink Only/.
 * Strips poster scraps, keeps the drink, and pads generously on cream.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_FILES = {
  espresso: "Espresso.png",
  americano: "Americano.png",
  cappuccino: "Cappuccino.png",
  latte: "Latte.png",
  "flat-white": "Flat White.png",
  mocha: "Mocha.png",
  "espresso-macchiato": "Espresso Macchiato.png",
  "iced-latte": "Iced Latte.png",
  "cold-brew": "Cold Brew.png",
  affogato: "Affogato.png",
  "irish-coffee": "Irish Coffee.png",
  "vietnamese-iced-coffee": "Vietnamese Iced Coffee.png",
};

/** Extra shrink for drinks that felt cramped in the card art tile. */
const FIT_SCALE = {
  espresso: 0.62,
  americano: 0.68,
  cappuccino: 0.68,
  mocha: 0.7,
  latte: 0.7,
  "iced-latte": 0.68,
  "irish-coffee": 0.68,
  "vietnamese-iced-coffee": 0.68,
  default: 0.72,
};

const CREAM = { r: 251, g: 246, b: 236 };
const BROWN = { r: 74, g: 56, b: 44 };
const CANVAS_W = 525;
const CANVAS_H = 468;

function labelComponents(grey, width, height, threshold = 40) {
  const labels = new Int32Array(width * height);
  const sizes = [0];
  const sumX = [0];
  const sumY = [0];
  const minX = [0];
  const minY = [0];
  const maxX = [0];
  const maxY = [0];
  let label = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (grey[i] <= threshold || labels[i]) continue;
      label += 1;
      sizes[label] = 0;
      sumX[label] = 0;
      sumY[label] = 0;
      minX[label] = x;
      minY[label] = y;
      maxX[label] = x;
      maxY[label] = y;
      const stack = [i];
      labels[i] = label;
      while (stack.length) {
        const cur = stack.pop();
        sizes[label] += 1;
        const cx = cur % width;
        const cy = (cur - cx) / width;
        sumX[label] += cx;
        sumY[label] += cy;
        if (cx < minX[label]) minX[label] = cx;
        if (cy < minY[label]) minY[label] = cy;
        if (cx > maxX[label]) maxX[label] = cx;
        if (cy > maxY[label]) maxY[label] = cy;
        for (const [nx, ny] of [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1],
        ]) {
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

  return { labels, sizes, sumX, sumY, minX, minY, maxX, maxY, label };
}

/** Keep the main drink; drop poster scraps and thin floating lines. */
function keepDrinkInk(grey, width, height, threshold = 40) {
  const { labels, sizes, sumX, sumY, minX, minY, maxX, maxY, label } =
    labelComponents(grey, width, height, threshold);

  if (label < 1) return Buffer.alloc(grey.length);

  let best = 1;
  for (let id = 2; id <= label; id++) {
    if (sizes[id] > sizes[best]) best = id;
  }

  const drinkW = maxX[best] - minX[best] + 1;
  const drinkH = maxY[best] - minY[best] + 1;
  const padX = Math.round(drinkW * 0.06);
  const padY = Math.round(drinkH * 0.04);
  const region = {
    minX: Math.max(0, minX[best] - padX),
    minY: Math.max(0, minY[best] - padY),
    maxX: Math.min(width - 1, maxX[best] + padX),
    maxY: Math.min(height - 1, maxY[best] + padY),
  };

  const keep = new Uint8Array(label + 1);
  keep[best] = 1;
  const maxGarnish = Math.max(60, Math.round(sizes[best] * 0.1));

  for (let id = 1; id <= label; id++) {
    if (id === best || sizes[id] === 0) continue;
    if (sizes[id] > maxGarnish) continue;

    const cx = sumX[id] / sizes[id];
    const cy = sumY[id] / sizes[id];
    const bw = maxX[id] - minX[id] + 1;
    const bh = maxY[id] - minY[id] + 1;
    const aspect = bw / Math.max(bh, 1);

    // Floating scraps above the drink (poster leftovers)
    if (maxY[id] < minY[best] - Math.round(drinkH * 0.02)) continue;
    // Flat horizontal dashes
    if (bh <= 6 || aspect >= 6) continue;
    // Specks near the very top of the canvas
    if (cy < height * 0.08 && sizes[id] < sizes[best] * 0.02) continue;
    // Must sit over/near the drink body
    if (
      cx < region.minX ||
      cx > region.maxX ||
      cy < region.minY ||
      cy > region.maxY
    ) {
      continue;
    }

    keep[id] = 1;
  }

  const out = Buffer.alloc(grey.length);
  for (let i = 0; i < grey.length; i++) {
    if (keep[labels[i]]) out[i] = grey[i];
  }
  return out;
}

function contentBounds(grey, width, height, threshold = 40) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
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
  // Tight trim — canvas padding is applied later via FIT_SCALE
  const pad = Math.round(Math.min(width, height) * 0.01);
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const right = Math.min(width, maxX + pad + 1);
  const bottom = Math.min(height, maxY + pad + 1);
  return { left, top, width: right - left, height: bottom - top };
}

function remapToCream(greyBuffer) {
  const out = Buffer.alloc(greyBuffer.length * 3);
  for (let i = 0, j = 0; i < greyBuffer.length; i++, j += 3) {
    const t = Math.pow(greyBuffer[i] / 255, 1.05);
    const ink = t < 0.05 ? 0 : (t - 0.05) / 0.95;
    out[j] = Math.round(CREAM.r + ink * (BROWN.r - CREAM.r));
    out[j + 1] = Math.round(CREAM.g + ink * (BROWN.g - CREAM.g));
    out[j + 2] = Math.round(CREAM.b + ink * (BROWN.b - CREAM.b));
  }
  return out;
}

async function makeHero(srcPath, outPath, slug) {
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

  const remapped = remapToCream(trimmedGrey);
  const fit = FIT_SCALE[slug] ?? FIT_SCALE.default;
  const maxW = Math.round(CANVAS_W * fit);
  const maxH = Math.round(CANVAS_H * fit);

  const artPng = await sharp(remapped, {
    raw: { width: bounds.width, height: bounds.height, channels: 3 },
  })
    .resize({ width: maxW, height: maxH, fit: "inside" })
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
      background: CREAM,
    },
  })
    .png()
    .toBuffer();

  await sharp(base)
    .composite([{ input: artPng, left, top }])
    .webp({ quality: 90 })
    .toFile(outPath);
}

const heroOut = "public/images/coffee";
const srcDir = path.join("assets", "Coffee Designs", "Drink Only");
fs.mkdirSync(heroOut, { recursive: true });

for (const [slug, file] of Object.entries(SOURCE_FILES)) {
  const src = path.join(srcDir, file);
  if (!fs.existsSync(src)) {
    console.error("missing", src);
    continue;
  }
  const out = path.join(heroOut, `${slug}-hero.webp`);
  await makeHero(src, out, slug);
  console.log(
    `${file} → ${slug}-hero.webp (${Math.round(fs.statSync(out).size / 1024)}KB)`,
  );
}

console.log("done");
