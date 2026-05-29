import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const devlogs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/devlogs" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()),
    /** Path under /public for page-specific social preview (see devlogShareImages). */
    ogImage: z.string().optional()
  })
});

export const collections = { devlogs };
