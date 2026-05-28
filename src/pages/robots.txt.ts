import type { APIRoute } from "astro";
import { absoluteUrl } from "../utils/absoluteUrl";

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = absoluteUrl("/sitemap.xml", site ?? import.meta.env.SITE);

  const body = ["User-agent: *", "Allow: /", "", `Sitemap: ${sitemapUrl}`].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};
