# Boundary Interactive Website

Official website for Boundary Interactive and Fly Exterminator, built with Astro and deployed to GitHub Pages.

## Local Development

```bash
npm install
cp .env.example .env   # optional: analytics
npm run dev
```

## Build

```bash
npm run build
```

Production builds use `BASE_PATH=/Boundary-Interactive-Website` in CI (see deploy workflow).

## Single source of truth

Launch copy, store links, team info, press kit assets, and social URLs live in `src/data/site.ts`. Update `game.status`, `game.releaseWindow`, `links.*`, and `pressKitAssets` there when anything changes for the store or marketing.

**Brand logos:** `public/brand/` (`icon/`, `wordmark/`). Regenerate with `npm run brand:export`.

**Static assets (`public/`):**

| Path | Contents |
|------|----------|
| `brand/` | Studio icon + wordmark (transparent + charcoal) |
| `images/game/` | Fly Exterminator marketing art (hero, cover, UI, logo, room scan) |
| `images/team/` | Team headshots |
| `devlog/` | Images referenced from devlog posts only |
| Root | `og-social.png`, `apple-touch-icon.png`, `robots.txt`, `sitemap.xml` |

Page image paths are defined in `src/data/images.ts`. Devlog markdown uses the same `/images/...` and `/devlog/...` paths.

The `games` content collection only stores long-form timeline text for the game page. Devlogs stay in `src/content/devlogs/` (editorial content).

## SEO

- **Meta:** canonical, Open Graph (with image width/height/alt), Twitter Card, and article dates on devlog posts.
- **Copy:** page titles and descriptions live in `src/data/seo.ts`.
- **Structured data:** JSON-LD for `Organization` (home/about), `VideoGame` (game page), and `BlogPosting` (devlog posts) via `src/utils/jsonLd.ts`.
- **Social image:** `public/og-social.png` (1200×630) is the default share preview.
- **Sitemap:** `sitemap-index.xml` on build; devlog URLs use each post’s `date` as `lastmod`. `robots.txt` points crawlers to the sitemap.

**Images:** Run `npm run images:optimize` after adding PNGs to `public/` (creates WebP companions, regenerates `og-social.png` from hero art, and refreshes `apple-touch-icon.png` from the charcoal studio icon).

**Off-site backlinks:** `siteUrl` and a checklist live in `src/data/site.ts`; the Contact page lists where to paste the official URL (LinkedIn, YouTube, Meta).

## Google Analytics 4 + Search Console

Both are **free**. Full step-by-step setup: [docs/google-analytics-and-search-console.md](docs/google-analytics-and-search-console.md).

Set GitHub Actions **Variable** `PUBLIC_GA_MEASUREMENT_ID` to `G-21WBCSSXC4`, redeploy, then verify Search Console using **Google Analytics** (same Google account, Administrator on the GA property). The tag is also baked into `src/data/site.ts` so it ships on every deploy. Details: [docs/google-analytics-and-search-console.md](docs/google-analytics-and-search-console.md).

## Deployment

Deployment runs from `.github/workflows/deploy.yml` on pushes to `main`.

Live site: `https://sypherxn.github.io/Boundary-Interactive-Website/`
