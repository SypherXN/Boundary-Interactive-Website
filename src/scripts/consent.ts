/**
 * GDPR / EU cookie consent for Google Analytics (Consent Mode v2).
 * Preference stored in localStorage; dispatches events for ga-events.ts.
 */

export const CONSENT_STORAGE_KEY = "bi_cookie_consent";
export type ConsentChoice = "granted" | "denied";

export function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    /* private browsing */
  }
  return null;
}

export function writeConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* ignore */
  }
  applyConsent(choice);
  window.dispatchEvent(new CustomEvent("bi-consent-change", { detail: { choice } }));
}

export function hasAnalyticsConsent(): boolean {
  return readConsent() === "granted";
}

export function applyConsent(choice: ConsentChoice) {
  if (typeof window.gtag !== "function") return;

  const granted = choice === "granted";
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied"
  });

  if (granted) {
    window.gtag("config", getMeasurementId(), {
      send_page_view: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    window.gtag("event", "page_view");
  }
}

function getMeasurementId(): string {
  return document.body?.dataset.gaId ?? "G-21WBCSSXC4";
}

export function initConsentFromStorage() {
  const saved = readConsent();
  if (saved) applyConsent(saved);
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
