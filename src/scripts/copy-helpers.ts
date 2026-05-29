/** Copy-to-clipboard buttons with brief success feedback. */

function showCopied(button: HTMLButtonElement) {
  const previous = button.textContent;
  button.textContent = "Copied!";
  button.disabled = true;
  window.setTimeout(() => {
    button.textContent = previous;
    button.disabled = false;
  }, 1800);
}

async function copyText(text: string, button: HTMLButtonElement) {
  try {
    await navigator.clipboard.writeText(text);
    showCopied(button);
  } catch {
    button.textContent = "Copy failed";
    window.setTimeout(() => {
      button.textContent = button.dataset.copyDefault ?? "Copy";
    }, 1800);
  }
}

export function initCopyButtons() {
  document.querySelectorAll<HTMLButtonElement>("[data-copy-text]").forEach((button) => {
    const text = button.dataset.copyText;
    if (!text) return;
    button.dataset.copyDefault = button.textContent ?? "Copy";
    button.addEventListener("click", () => copyText(text, button));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCopyButtons);
} else {
  initCopyButtons();
}
