import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const games = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/games" }),
  schema: z.object({
    title: z.string(),
    platform: z.string(),
    releaseWindow: z.string(),
    status: z.string(),
    timeline: z.string()
  })
});

const devlogs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/devlogs" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string())
  })
});

const pressAssets = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pressAssets" }),
  schema: z.object({
    label: z.string(),
    url: z.string(),
    type: z.string()
  })
});

export const collections = { games, devlogs, pressAssets };
