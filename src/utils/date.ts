const formatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC"
});

export function formatDateUTC(date: Date): string {
  return formatter.format(date);
}
