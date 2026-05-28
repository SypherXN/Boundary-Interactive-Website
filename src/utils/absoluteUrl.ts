import { withBase } from "./withBase";

/** Absolute URL for SEO tags (Open Graph, canonical, JSON-LD). */
export function absoluteUrl(path: string, site: URL | string): string {
  return new URL(withBase(path), site).href;
}
