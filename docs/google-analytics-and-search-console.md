# Google Analytics 4 + Search Console setup

Use **one Google account** for both tools. Both are **free**.

**Live site URL:** `https://sypherxn.github.io/Boundary-Interactive-Website/`  
**Sitemap:** `https://sypherxn.github.io/Boundary-Interactive-Website/sitemap.xml`  
**GA4 measurement ID:** `G-21WBCSSXC4` (Boundary Interactive property)

Search Console verifies this site through **Google Analytics** — no HTML meta tag required.

---

## Cookie consent (EU / GDPR baseline)

The site ships with:

- **Consent Mode v2** defaults in `src/components/Analytics.astro` (`analytics_storage: denied` until accept).
- A **cookie banner** (`src/components/CookieConsent.astro`) with Accept / Decline.
- A **privacy notice** at `/privacy/` (also linked in the footer).
- **Custom GA events** (`src/scripts/ga-events.ts`) that only run after the user accepts analytics.

Declining cookies leaves the gtag snippet on the page (for Search Console verification) but does not store analytics cookies or send page views until the user accepts.

To change copy or behavior, edit `CookieConsent.astro`, `src/scripts/consent.ts`, and `src/pages/privacy.astro`.

---

## Step 1 — Deploy (GA tag is built in automatically)

The Google tag (`G-21WBCSSXC4`) is included on every page from `src/data/site.ts`.

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
| Tag missing on live site | Redeploy from `main`; confirm `Analytics.astro` is in the layout. |
| Wrong Google account | Sign in with the account that administers GA4. |
| Not GA Administrator | Analytics → Admin → Property access management → add yourself as Administrator. |
| GA just deployed | Wait 5–10 minutes, then try Verify again. |
| URL mismatch | Property URL must match exactly (including trailing slash). |

---

## Step 3 — Submit sitemap

1. In Search Console, open the verified property.
2. **Sitemaps** → enter **`sitemap.xml`** (not `sitemap-index.xml`).
3. Property must be **URL prefix**: `https://sypherxn.github.io/Boundary-Interactive-Website/` (not a Domain property).
4. Submit.

**How long?** Google fetching the sitemap is usually **a few minutes to 1 hour** once the URL returns 200. Indexing all pages can take **days to weeks** (normal for a new site).

**If status is “Couldn’t fetch”:** open  
https://sypherxn.github.io/Boundary-Interactive-Website/sitemap.xml  
in your browser — you should see a `<urlset>` list of pages. Delete old sitemap rows in Search Console, wait 5 minutes, and submit **`sitemap.xml`** again.

---

## Step 4 — Link GA4 and Search Console (optional reports)

After verification:

- **Analytics** → Admin → **Product links** → **Search Console links** → Link  
  or  
- **Search Console** → **Settings** → **Associations** → link Analytics property

---

## Checklist

- [ ] Site redeployed; live HTML contains the gtag script
- [ ] Cookie banner and `/privacy/` page reviewed
- [ ] Search Console property added (URL prefix)
- [ ] Verified via **Google Analytics** method
- [ ] Sitemap submitted
- [ ] GA4 ↔ Search Console associated (optional)

---

## GA4 custom events (after consent)

The site tracks engagement via `src/scripts/ga-events.ts` (no manual tagging on each link). Events fire **only if the visitor accepted analytics cookies**.

| Event | When it fires |
|-------|----------------|
| `meta_store_click` | Meta Quest store / wishlist links |
| `trailer_click` | YouTube trailer URL |
| `youtube_channel_click` | YouTube channel links |
| `trailer_section_view` | Game page trailer scrolled into view |
| `linkedin_click` | LinkedIn links |
| `email_click` | `mailto:` links |
| `devlog_post_click` | Click from another page into a devlog post |
| `devlog_view` | Devlog article page load |
| `file_download` | Press kit image/file links (.png, .webp, etc.) |
| `press_asset_click` | Links under Press Assets on the press page |
| `team_website_click` | Team member personal sites |
| `game_page_click` / `press_page_click` / etc. | Navigation to key internal pages |
| `outbound_click` | Other external links |
| `scroll_depth` | 25%, 50%, 75%, 90% scroll on any page |

Event parameters include `link_text`, `cta_type` (`primary_button`, `footer_icon`, `main_nav`, …), `page_path`, and `content_id` for devlogs.

In GA4 → **Admin** → **Custom definitions**, you can register event parameters (e.g. `cta_type`, `content_id`) as custom dimensions for easier reporting.

Override on any link: `data-ga-event="my_event"` and optional `data-ga-label="Readable label"`.

---

## Privacy note

EU/EEA visitors see a consent banner before analytics cookies are enabled. Keep the privacy notice accurate if you add more trackers or embeds. This is not legal advice—consult a professional if you run paid campaigns in the EU.
