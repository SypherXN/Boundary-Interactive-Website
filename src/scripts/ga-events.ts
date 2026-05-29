/**
 * Client-side GA4 event tracking (click delegation + engagement).
 * Runs only after analytics consent (Consent Mode v2).
 */

import { hasAnalyticsConsent } from "./consent";

type EventParams = Record<string, string | number | boolean | undefined>;

function track(eventName: string, params: EventParams = {}) {
  if (!hasAnalyticsConsent()) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

function pagePath(): string {
  const base = document.body?.dataset.gaBase ?? "";
  const path = window.location.pathname;
  if (base && path.startsWith(base)) {
    return path.slice(base.length) || "/";
  }
  return path;
}

function linkLabel(anchor: HTMLAnchorElement): string {
  return (
    anchor.getAttribute("data-ga-label") ||
    anchor.getAttribute("aria-label") ||
    anchor.textContent?.trim().replace(/\s+/g, " ").slice(0, 100) ||
    anchor.href
  );
}

function ctaType(anchor: HTMLAnchorElement): string {
  if (anchor.classList.contains("button") && !anchor.classList.contains("secondary")) {
    return "primary_button";
  }
  if (anchor.classList.contains("button")) return "secondary_button";
  if (anchor.classList.contains("footer-icon-link")) return "footer_icon";
  if (anchor.closest('nav[aria-label="Main navigation"]')) return "main_nav";
  if (anchor.closest("header")) return "header";
  if (anchor.closest("footer")) return "footer";
  if (anchor.closest(".devlog-entry")) return "devlog_body";
  return "text_link";
}

function anchorPath(anchor: HTMLAnchorElement): string {
  try {
    return new URL(anchor.href, window.location.origin).pathname;
  } catch {
    return "";
  }
}

function normalizeHrefPath(path: string): string {
  const base = document.body?.dataset.gaBase ?? "";
  if (base && path.startsWith(base)) {
    return path.slice(base.length) || "/";
  }
  return path;
}

function isMetaStore(href: string): boolean {
  return href.includes("meta.com/experiences/fly-exterminator");
}

function isYouTubeTrailer(href: string): boolean {
  return /youtube\.com\/watch|youtu\.be\//i.test(href);
}

function isYouTube(href: string): boolean {
  return /youtube\.com|youtu\.be/i.test(href);
}

function isLinkedIn(href: string): boolean {
  return href.includes("linkedin.com");
}

function isDiscord(href: string): boolean {
  return /discord\.gg|discord\.com\/invite/i.test(href);
}

function isTeamSite(href: string): boolean {
  return href.includes("matthewgtran.com") || href.includes("notion.site");
}

function isFileDownload(href: string): boolean {
  return /\.(png|webp|svg|jpe?g|pdf|zip)(\?|#|$)/i.test(href);
}

const internalPageEvents: Record<string, string> = {
  "/game": "game_page_click",
  "/press": "press_page_click",
  "/devlog": "devlog_index_click",
  "/about": "about_page_click",
  "/contact": "contact_page_click"
};

function onLinkClick(event: MouseEvent) {
  const anchor = (event.target as HTMLElement).closest("a");
  if (!anchor?.href) return;

  const href = anchor.href;
  const label = linkLabel(anchor);
  const cta = ctaType(anchor);
  const path = pagePath();
  const destPath = normalizeHrefPath(anchorPath(anchor));

  const customEvent = anchor.getAttribute("data-ga-event");
  if (customEvent) {
    track(customEvent, {
      link_url: href,
      link_text: label,
      cta_type: cta,
      page_path: path
    });
    return;
  }

  if (href.startsWith("mailto:")) {
    track("email_click", { link_text: label, cta_type: cta, page_path: path });
    return;
  }

  if (isMetaStore(href)) {
    track("meta_store_click", { link_text: label, cta_type: cta, page_path: path });
    return;
  }

  if (isYouTube(href)) {
    track(isYouTubeTrailer(href) ? "trailer_click" : "youtube_channel_click", {
      link_text: label,
      cta_type: cta,
      link_url: href,
      page_path: path
    });
    return;
  }

  if (isLinkedIn(href)) {
    track("linkedin_click", { link_text: label, cta_type: cta, link_url: href, page_path: path });
    return;
  }

  if (isDiscord(href)) {
    track("discord_click", { link_text: label, cta_type: cta, link_url: href, page_path: path });
    return;
  }

  if (isTeamSite(href)) {
    track("team_website_click", { link_text: label, link_url: href, page_path: path, cta_type: cta });
    return;
  }

  const devlogPostMatch = destPath.match(/^\/devlog\/([^/]+)\/?$/);
  if (devlogPostMatch && !pagePath().startsWith(`/devlog/${devlogPostMatch[1]}`)) {
    track("devlog_post_click", {
      content_id: devlogPostMatch[1],
      link_text: label,
      cta_type: cta,
      page_path: path
    });
    return;
  }

  if (path.startsWith("/press") && isFileDownload(href)) {
    const fileName = href.split("/").pop()?.split("?")[0] ?? href;
    track("file_download", {
      file_name: fileName,
      link_text: label,
      page_path: path
    });
    return;
  }

  if (path.startsWith("/press")) {
    const panel = anchor.closest("section.panel");
    const heading = panel?.querySelector("h2");
    if (heading?.textContent?.includes("Press Assets")) {
      track("press_asset_click", {
        link_text: label,
        link_url: href,
        page_path: path
      });
      return;
    }
  }

  try {
    const url = new URL(href);
    if (url.origin === window.location.origin) {
      const internalEvent = internalPageEvents[destPath];
      if (internalEvent && destPath !== pagePath()) {
        track(internalEvent, { link_text: label, cta_type: cta, page_path: path });
        return;
      }
    }
  } catch {
    /* ignore invalid URLs */
  }

  if (href.startsWith("http") && !href.startsWith(window.location.origin)) {
    track("outbound_click", { link_url: href, link_text: label, cta_type: cta, page_path: path });
  }
}

function initScrollDepth() {
  const thresholds = [25, 50, 75, 90];
  const fired = new Set<number>();

  const check = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const percent = Math.round((window.scrollY / docHeight) * 100);
    for (const threshold of thresholds) {
      if (percent >= threshold && !fired.has(threshold)) {
        fired.add(threshold);
        track("scroll_depth", { percent_scrolled: threshold, page_path: pagePath() });
      }
    }
  };

  window.addEventListener("scroll", check, { passive: true });
  check();
}

function initDevlogPageView() {
  const match = pagePath().match(/^\/devlog\/([^/]+)\/?$/);
  if (!match) return;
  track("devlog_view", { content_id: match[1], page_path: pagePath() });
}

function initTrailerSectionView() {
  const iframe = document.querySelector(".video-embed iframe");
  if (!iframe) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          track("trailer_section_view", { page_path: pagePath() });
          observer.disconnect();
          break;
        }
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(iframe);
}

let trackingStarted = false;

function init() {
  if (trackingStarted || !hasAnalyticsConsent()) return;
  trackingStarted = true;
  document.addEventListener("click", onLinkClick);
  initScrollDepth();
  initDevlogPageView();
  initTrailerSectionView();
}

function boot() {
  init();
  window.addEventListener("bi-consent-change", () => init());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
