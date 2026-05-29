/** Mobile navigation toggle for the site header. */

function initMobileNav() {
  const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
  const nav = document.querySelector<HTMLElement>(".main-nav");
  if (!toggle || !nav) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  window.matchMedia("(min-width: 721px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMobileNav);
} else {
  initMobileNav();
}
