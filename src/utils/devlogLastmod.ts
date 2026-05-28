import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/** Map devlog content id → ISO lastmod for sitemap generation. */
export function getDevlogLastmodMap(rootDir = process.cwd()) {
  const dir = join(rootDir, "src/content/devlogs");
  const map = new Map<string, string>();

  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".md")) continue;

    const text = readFileSync(join(dir, file), "utf8");
    const date = text.match(/^date:\s*(\S+)/m)?.[1];
    const id = file.replace(/\.md$/, "");

    if (date) {
      map.set(id, new Date(date).toISOString());
    }
  }

  return map;
}
