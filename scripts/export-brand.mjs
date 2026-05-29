/**
 * Regenerate studio brand assets under public/brand/.
 * - transparent: site UI + favicon SVG (white lines, no background)
 * - charcoal: opaque PNG/SVG for iOS, JSON-LD, press
 */
import { copyFile, readFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import sharp from "sharp";

const publicDir = path.resolve("public");
const brandDir = path.resolve("public/brand");

function run(script) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.resolve("scripts", script)], {
      stdio: "inherit",
      cwd: path.resolve(".")
    });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${script} exited ${code}`))));
  });
}

await run("bg-tests.mjs");

const iconOpaqueSvg = await readFile(path.join(brandDir, "icon", "charcoal.svg"), "utf8");
for (const { name, size } of [
  { name: "charcoal-180.png", size: 180 },
  { name: "charcoal-32.png", size: 32 },
  { name: "charcoal-512.png", size: 512 }
]) {
  await sharp(Buffer.from(iconOpaqueSvg), { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(brandDir, "icon", name));
}

await copyFile(path.join(brandDir, "icon", "charcoal-180.png"), path.join(publicDir, "apple-touch-icon.png"));

console.log("Brand export complete (transparent + charcoal only).");
