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

The `games` content collection only stores long-form timeline text for the game page. Devlogs stay in `src/content/devlogs/` (editorial content).

## SEO

- **Meta:** canonical, Open Graph (with image width/height/alt), Twitter Card, and article dates on devlog posts.
- **Copy:** page titles and descriptions live in `src/data/seo.ts`.
- **Structured data:** JSON-LD for `Organization` (home/about), `VideoGame` (game page), and `BlogPosting` (devlog posts) via `src/utils/jsonLd.ts`.
- **Social image:** `public/og-social.png` (1200×630) is the default share preview.
- **Sitemap:** `sitemap-index.xml` on build; devlog URLs use each post’s `date` as `lastmod`. `robots.txt` points crawlers to the sitemap.

**Images:** Run `npm run images:optimize` after adding PNGs to `public/` (creates WebP companions, regenerates `og-social.png` from hero art, and `apple-touch-icon.png`).

**Off-site backlinks:** `siteUrl` and a checklist live in `src/data/site.ts`; the Contact page lists where to paste the official URL (LinkedIn, YouTube, Meta).

## Google Analytics 4 + Search Console

Both are **free**. Full step-by-step setup: [docs/google-analytics-and-search-console.md](docs/google-analytics-and-search-console.md).

After creating your GA4 property and Search Console HTML-tag verification token, set GitHub Actions **Variables**:

| Variable | Purpose |
|----------|---------|
| `PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID (`G-...`) |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console meta tag `content` value only |

Redeploy `main`, verify ownership in Search Console, then submit  
`https://sypherxn.github.io/Boundary-Interactive-Website/sitemap-index.xml`.

## Deployment

Deployment runs from `.github/workflows/deploy.yml` on pushes to `main`.

Live site: `https://sypherxn.github.io/Boundary-Interactive-Website/`
