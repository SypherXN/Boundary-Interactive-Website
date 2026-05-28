import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://sypherxn.github.io/Boundary-Interactive-Website";

const staticPaths = ["/", "/about/", "/contact/", "/devlog/", "/game/", "/press/"];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(path, lastmod) {
  const loc = path === "/" ? `${SITE}/` : `${SITE}${path}`;
  const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
  return `  <url><loc>${escapeXml(loc)}</loc>${lastmodTag}</url>`;
}

const devlogDir = join(process.cwd(), "src/content/devlogs");
const devlogFiles = readdirSync(devlogDir).filter((file) => file.endsWith(".md"));

const entries = [
  ...staticPaths.map((path) => urlEntry(path)),
  ...devlogFiles.map((file) => {
    const text = readFileSync(join(devlogDir, file), "utf8");
    const date = text.match(/^date:\s*(\S+)/m)?.[1];
    const slug = file.replace(/\.md$/, "");
    const lastmod = date ? new Date(date).toISOString() : undefined;
    return urlEntry(`/devlog/${slug}/`, lastmod);
  })
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

writeFileSync("public/sitemap.xml", sitemap, "utf8");
writeFileSync("public/robots.txt", robots, "utf8");

console.log(`Wrote public/sitemap.xml (${entries.length} URLs) and public/robots.txt`);
