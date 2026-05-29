import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const C = { frame: "#ffffff", teal: "#22d3c5", white: "#ffffff", holo: "#7ee3ff" };

// Final brand variants (folderName -> fill, or null = transparent).
const backgrounds = {
  charcoal: "#2a3140",
  transparent: null
};

const brandDir = path.resolve("public/brand");
const round = (n) => Math.round(n * 1000) / 1000;

const bytes = await readFile(path.resolve("scripts/assets/Audiowide.ttf"));
const font = opentype.parse(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
const unitsPerEm = font.unitsPerEm;
const cache = new Map();
const glyphData = (ch) => {
  if (!cache.has(ch)) {
    const g = font.charToGlyph(ch);
    cache.set(ch, { commands: g.getPath(0, 0, unitsPerEm).commands.map((c) => ({ ...c })), advanceWidth: g.advanceWidth });
  }
  return cache.get(ch);
};
function renderText(text, ox, by, fontSize, tr = 0) {
  const scale = fontSize / unitsPerEm;
  const tracking = tr * fontSize;
  let penX = ox;
  const parts = [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const chars = [...text];
  chars.forEach((ch, i) => {
    const { commands, advanceWidth } = glyphData(ch);
    for (const c of commands) {
      const map = (x, y) => [round(x * scale + penX), round(y * scale + by)];
      const track = (x, y) => { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; };
      if (c.type === "M") { const [x, y] = map(c.x, c.y); track(x, y); parts.push(`M${x} ${y}`); }
      else if (c.type === "L") { const [x, y] = map(c.x, c.y); track(x, y); parts.push(`L${x} ${y}`); }
      else if (c.type === "Q") { const [x1, y1] = map(c.x1, c.y1); const [x, y] = map(c.x, c.y); track(x, y); parts.push(`Q${x1} ${y1} ${x} ${y}`); }
      else if (c.type === "C") { const [x1, y1] = map(c.x1, c.y1); const [x2, y2] = map(c.x2, c.y2); const [x, y] = map(c.x, c.y); track(x, y); parts.push(`C${x1} ${y1} ${x2} ${y2} ${x} ${y}`); }
      else if (c.type === "Z") parts.push("Z");
    }
    penX += advanceWidth * scale + (i < chars.length - 1 ? tracking : 0);
  });
  return { d: parts.join(""), x1: minX, y1: minY, x2: maxX, y2: maxY, width: maxX - minX, height: maxY - minY };
}
function centered(text, cx, cy, maxW, maxH = Infinity, tr = 0) {
  const m = renderText(text, 0, 0, 100, tr);
  const scale = Math.min(maxW / m.width, maxH / m.height);
  const fs = 100 * scale;
  const m2 = renderText(text, 0, 0, fs, tr);
  return renderText(text, cx - (m2.x1 + m2.width / 2), cy - (m2.y1 + m2.height / 2), fs, tr);
}

const dash = (w = 10) => `stroke="${C.frame}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="26 20" fill="none"`;

// connect1up icon (final params), bg = color or null for transparent.
function iconSvg(bg) {
  const S = 512, cx = S / 2;
  const maxW = 268, maxH = 200, pad = 6, frontHalf = 212, depth = 150, boxLift = 85, fillOpacity = 0.35;
  const bi = centered("BI", cx, S / 2, maxW, maxH);
  const baseY = bi.y2 - boxLift;
  const blX = bi.x1 - pad, brX = bi.x2 + pad;
  const flX = cx - frontHalf, frX = cx + frontHalf;
  const frontY = baseY + depth;
  const floorPath = `M${blX} ${baseY}L${brX} ${baseY}L${frX} ${frontY}L${flX} ${frontY}Z`;
  const sides = `<path d="M${blX} ${baseY}L${flX} ${frontY}" ${dash()}/><path d="M${brX} ${baseY}L${frX} ${frontY}" ${dash()}/>`;
  const front = `<path d="M${flX} ${frontY}L${frX} ${frontY}" ${dash()}/>`;
  const base = `<path d="M${blX} ${baseY}L${brX} ${baseY}" ${dash()}/>`;
  const shadow = `<ellipse cx="${cx}" cy="${round(bi.y2 + 8)}" rx="${round(bi.width / 2 + 18)}" ry="24" fill="#000000" opacity="0.7" filter="url(#sh)"/>`;
  const bgRect = bg ? `<rect width="${S}" height="${S}" rx="112" fill="${bg}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}"><defs><filter id="sh" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter></defs>${bgRect}<path d="${floorPath}" fill="${C.holo}" fill-opacity="${fillOpacity}"/>${sides}${front}${base}${shadow}<path d="${bi.d}" fill="${C.teal}"/></svg>`;
}

// wide Audiowide wordmark, bg = color or null for transparent.
function wideSvg(bg) {
  const W = 1200, H = 420, inset = 40, fw = W - inset * 2, frameR = 44, sidePad = 120;
  const maxLineW = fw - sidePad * 2, cx = W / 2;
  const topD = centered("BOUNDARY", cx, H / 2 - 56, maxLineW, 128).d;
  const botD = centered("INTERACTIVE", cx, H / 2 + 64, maxLineW, 64, 0.18).d;
  const bgRect = bg ? `<rect x="0" y="0" width="${W}" height="${H}" rx="64" ry="64" fill="${bg}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${bgRect}
  <rect x="${inset}" y="${inset}" width="${fw}" height="${H - inset * 2}" rx="${frameR}" ry="${frameR}" fill="none" stroke="${C.frame}" stroke-width="7" stroke-linecap="round" stroke-dasharray="24 18"/>
  <path d="${topD}" fill="${C.white}"/>
  <path d="${botD}" fill="${C.teal}"/>
</svg>`;
}

for (const [name, bg] of Object.entries(backgrounds)) {
  await mkdir(path.join(brandDir, "icon"), { recursive: true });
  await mkdir(path.join(brandDir, "wordmark"), { recursive: true });
  const icon = iconSvg(bg), wide = wideSvg(bg);
  await writeFile(path.join(brandDir, "icon", `${name}.svg`), icon, "utf8");
  await writeFile(path.join(brandDir, "wordmark", `${name}.svg`), wide, "utf8");
  await sharp(Buffer.from(icon), { density: 384 }).resize(512, 512).png().toFile(path.join(brandDir, "icon", `${name}.png`));
  await sharp(Buffer.from(wide), { density: 300 }).resize({ width: 1200 }).png().toFile(path.join(brandDir, "wordmark", `${name}.png`));
  console.log("rendered", name);
}
