/**
 * Bundle press kit PNG/SVG assets into public/press-kit.zip for journalists.
 */
import { createWriteStream, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import archiver from "archiver";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const outZip = join(publicDir, "press-kit.zip");

/** Keep in sync with local asset paths in src/data/site.ts pressKitAssets */
const assetPaths = [
  "brand/icon/transparent.svg",
  "brand/icon/charcoal.png",
  "brand/wordmark/transparent.svg",
  "brand/wordmark/charcoal.png",
  "images/game/fly-exterminator-hero-art.png",
  "images/game/fly-exterminator-cover-wide.png",
  "images/game/fly-exterminator-ui.png",
  "images/game/fly-exterminator-logo.png",
  "images/game/meta-quest-room-scanning.png"
];

const readme = `Fly Exterminator / Boundary Interactive — press kit assets
https://sypherxn.github.io/Boundary-Interactive-Website/press/

Includes logos, key art, UI screenshot, and room-scan image.
Trailer: https://www.youtube.com/watch?v=pCl-uN2TTYY
Press: flyexterminatorgame@gmail.com
`;

const output = createWriteStream(outZip);
const archive = archiver("zip", { zlib: { level: 9 } });

archive.pipe(output);
archive.append(readme, { name: "README.txt" });

let added = 0;
for (const relative of assetPaths) {
  const filePath = join(publicDir, relative);
  if (!existsSync(filePath)) {
    console.warn(`Skip missing: ${relative}`);
    continue;
  }
  archive.file(filePath, { name: relative.replace(/\//g, "-") });
  added += 1;
}

if (added === 0) {
  throw new Error("No press kit files found under public/");
}

await new Promise((resolve, reject) => {
  output.on("close", () => {
    console.log(`Wrote public/press-kit.zip (${archive.pointer()} bytes, ${added} assets)`);
    resolve(undefined);
  });
  archive.on("error", reject);
  archive.finalize();
});
