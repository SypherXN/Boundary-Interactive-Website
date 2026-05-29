/** Client-side tag filtering on the devlog index. */

function initDevlogFilter() {
  const root = document.querySelector<HTMLElement>("[data-devlog-filter]");
  if (!root) return;

  const chips = root.querySelectorAll<HTMLButtonElement>("[data-devlog-tag]");
  const items = root.querySelectorAll<HTMLElement>("[data-devlog-item]");
  const empty = root.querySelector<HTMLElement>("[data-devlog-empty]");
  let activeTag = "all";

  const apply = () => {
    let visible = 0;
    items.forEach((item) => {
      const tags = (item.dataset.devlogTags ?? "").split(",").map((t) => t.trim());
      const show = activeTag === "all" || tags.includes(activeTag);
      item.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible > 0;

    chips.forEach((chip) => {
      const isActive = chip.dataset.devlogTag === activeTag;
      chip.classList.toggle("is-active", isActive);
      chip.setAttribute("aria-pressed", String(isActive));
    });
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      activeTag = chip.dataset.devlogTag ?? "all";
      apply();
    });
  });

  apply();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDevlogFilter);
} else {
  initDevlogFilter();
}
