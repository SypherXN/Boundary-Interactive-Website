# Google Analytics 4 + Search Console setup

Use **one Google account** for both tools. Both are **free** for a studio site like this.

**Live site URL:** `https://sypherxn.github.io/Boundary-Interactive-Website/`  
**Sitemap:** `https://sypherxn.github.io/Boundary-Interactive-Website/sitemap-index.xml`

---

## Part A — Google Analytics 4 (GA4)

1. Open [Google Analytics](https://analytics.google.com/) → **Admin** (gear).
2. **Create account** (e.g. `Boundary Interactive`) if you do not have one.
3. **Create property** (e.g. `Boundary Interactive Website`).
   - Time zone and currency: your preference.
   - Industry: Games; size: Small.
4. **Data stream** → **Web** → enter:
   - URL: `https://sypherxn.github.io/Boundary-Interactive-Website`
   - Stream name: `GitHub Pages`
5. Copy the **Measurement ID** (`G-XXXXXXXXXX`).

The site loads GA4 only when `PUBLIC_GA_MEASUREMENT_ID` is set at build time (`src/components/Analytics.astro`).

---

## Part B — Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console).
2. **Add property** → choose **URL prefix** (not Domain):
   ```
   https://sypherxn.github.io/Boundary-Interactive-Website/
   ```
3. Under **Verify ownership**, pick **HTML tag**.
4. Google shows something like:
   ```html
   <meta name="google-site-verification" content="AbCdEf123..." />
   ```
5. Copy **only** the `content` value (`AbCdEf123...`) — not the whole tag.

The site emits that meta tag when `PUBLIC_GOOGLE_SITE_VERIFICATION` is set (`src/layouts/Layout.astro`).

---

## Part C — Add secrets to GitHub (production)

1. Repo → **Settings** → **Secrets and variables** → **Actions** → **Variables** tab.
2. Add:

   | Name | Value |
   |------|--------|
   | `PUBLIC_GA_MEASUREMENT_ID` | Your `G-...` ID |
   | `PUBLIC_GOOGLE_SITE_VERIFICATION` | Your verification token |

3. Push to `main` (or run the deploy workflow) so a new build includes both values.
4. Wait for GitHub Pages to finish deploying (~1–2 minutes).

**Local testing:** copy `.env.example` to `.env`, fill in both values, run `npm run dev` and view page source for the meta tag / gtag script.

---

## Part D — Finish Search Console (after deploy)

1. In Search Console, click **Verify** on the property.
2. If verification fails:
   - Hard-refresh the live homepage.
   - Confirm view-source shows `google-site-verification` and `googletagmanager.com` (if GA is set).
   - Ensure the URL prefix matches exactly (trailing slash as above).
3. **Sitemaps** (left menu) → add:
   ```
   https://sypherxn.github.io/Boundary-Interactive-Website/sitemap-index.xml
   ```
4. Submit and check status becomes “Success” after Google crawls (can take hours).

---

## Part E — Link GA4 and Search Console (recommended)

1. In **Google Analytics** → Admin → **Product links** → **Search Console links**.
2. Click **Link**, choose your Search Console property, confirm.
3. You can then see some search query data inside Analytics reports.

Alternatively in Search Console: **Settings** → **Associations** → link to your Analytics property.

---

## Checklist

- [ ] GA4 property + web stream created
- [ ] `PUBLIC_GA_MEASUREMENT_ID` set in GitHub Actions variables
- [ ] Search Console URL-prefix property added
- [ ] `PUBLIC_GOOGLE_SITE_VERIFICATION` set in GitHub Actions variables
- [ ] Site redeployed from `main`
- [ ] Search Console ownership verified
- [ ] Sitemap submitted
- [ ] GA4 ↔ Search Console linked

---

## Privacy note

GA4 uses cookies and collects usage data. For EU visitors you may eventually need a cookie notice; fine to launch without one for a small indie site, but revisit if you target EU marketing heavily.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| GA not firing | Check live HTML for `gtag/js?id=G-`; variable must be set **before** build in CI. |
| Verification failed | Token must match exactly; redeploy after changing the variable. |
| Sitemap “Couldn’t fetch” | Open the sitemap URL in a browser; confirm `robots.txt` lists it. |
| No search data yet | Normal for new sites; allow days–weeks after indexing. |
