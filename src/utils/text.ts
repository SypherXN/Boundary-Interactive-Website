/** Truncate long copy for cards and previews (word-safe). */
export function truncateSummary(text: string, maxLength = 120): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  const slice = trimmed.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > 60 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trimEnd()}…`;
}
