import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const rasterExt = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (rasterExt.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

/** Branded OG card and iOS icon from existing game art. */
async function createBrandedAssets() {
  const hero = path.join(publicDir, "fly-exterminator-hero-art.png");
  const studioIconOpaque = path.join(publicDir, "brand/icon/charcoal.svg");

  await sharp(hero)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(publicDir, "og-social.png"));

  await sharp(hero)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .webp({ quality: 85 })
    .toFile(path.join(publicDir, "og-social.webp"));

  await sharp(studioIconOpaque, { density: 384 })
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, "brand/icon/charcoal-180.png"));

  await sharp(studioIconOpaque, { density: 384 })
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
}

/** WebP companions for smaller transfers (PNG originals kept for compatibility). */
async function createWebpCompanion(filePath) {
  const webpPath = filePath.replace(/\.(png|jpe?g)$/i, ".webp");
  await sharp(filePath).webp({ quality: 82 }).toFile(webpPath);
}

const files = await walk(publicDir);
await createBrandedAssets();

for (const file of files) {
  await createWebpCompanion(file);
}

console.log(`Created WebP companions for ${files.length} images and refreshed branded assets.`);
