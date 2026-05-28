# Google Analytics 4 + Search Console setup

Use **one Google account** for both tools. Both are **free**.

**Live site URL:** `https://sypherxn.github.io/Boundary-Interactive-Website/`  
**Sitemap:** `https://sypherxn.github.io/Boundary-Interactive-Website/sitemap-index.xml`  
**GA4 measurement ID:** `G-21WBCSSXC4` (Boundary Interactive property)

Search Console verifies this site through **Google Analytics** — no HTML meta tag required.

---

## Step 1 — Deploy (GA tag is built in automatically)

The Google tag (`G-21WBCSSXC4`) is included on every page from `src/data/site.ts` — no GitHub variable required.

Push to `main` and wait for the **Deploy to GitHub Pages** workflow to finish.

Optional: set GitHub Actions variable `PUBLIC_GA_MEASUREMENT_ID` only if you need a different stream ID later.

After deploy, open the live site → **View page source** → search for `G-21WBCSSXC4` and `googletagmanager.com`.

---

## Step 2 — Verify Search Console with Google Analytics

Requirements (all must be true):

- The Google tag is on the live homepage (see Step 1).
- You are signed into Search Console with the **same Google account** that owns the GA4 property.
- Your account has **Administrator** role on that GA4 property (Analytics → Admin → Property access management).

Steps:

1. Open [Google Search Console](https://search.google.com/search-console).
2. **Add property** → **URL prefix**:
   ```
   https://sypherxn.github.io/Boundary-Interactive-Website/
   ```
3. On the verification screen, choose **Google Analytics** (not HTML tag).
4. Select the GA4 property that contains stream **G-21WBCSSXC4**.
5. Click **Verify**.

If verification fails:

| Cause | Fix |
|-------|-----|
| Tag missing on live site | Set `PUBLIC_GA_MEASUREMENT_ID` in GitHub Variables and redeploy. |
| Wrong Google account | Sign in with the account that administers GA4. |
| Not GA Administrator | Analytics → Admin → Property access management → add yourself as Administrator. |
| GA just deployed | Wait 5–10 minutes, then try Verify again. |
| URL mismatch | Property URL must match exactly (including trailing slash). |

---

## Step 3 — Submit sitemap

1. In Search Console, open the verified property.
2. **Sitemaps** → enter:
   ```
   sitemap-index.xml
   ```
   (or the full URL `https://sypherxn.github.io/Boundary-Interactive-Website/sitemap-index.xml`)
3. Submit. Status may take hours to show **Success**.

---

## Step 4 — Link GA4 and Search Console (optional reports)

After verification:

- **Analytics** → Admin → **Product links** → **Search Console links** → Link  
  or  
- **Search Console** → **Settings** → **Associations** → link Analytics property

---

## Checklist

- [ ] `PUBLIC_GA_MEASUREMENT_ID` = `G-21WBCSSXC4` in GitHub Actions variables
- [ ] Site redeployed; live HTML contains the gtag script
- [ ] Search Console property added (URL prefix)
- [ ] Verified via **Google Analytics** method
- [ ] Sitemap submitted
- [ ] GA4 ↔ Search Console associated (optional)

---

## Privacy note

GA4 uses cookies and collects usage data. For EU visitors you may eventually need a cookie notice; fine to launch without one for a small indie site, but revisit if you target EU marketing heavily.
