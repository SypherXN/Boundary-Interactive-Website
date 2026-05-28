import { copyFileSync, existsSync } from "node:fs";

const src = "dist/sitemap-0.xml";
const dest = "dist/sitemap.xml";

if (!existsSync(src)) {
  console.error("Missing dist/sitemap-0.xml — run astro build with BASE_PATH set first.");
  process.exit(1);
}

copyFileSync(src, dest);
console.log("Created dist/sitemap.xml for Search Console.");
