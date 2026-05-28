import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("devlogs");
  return rss({
    title: "Boundary Interactive Devlog",
    description: "Development updates for Fly Exterminator.",
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.summary,
        link: `/devlog/${post.id}/`
      }))
  });
}
