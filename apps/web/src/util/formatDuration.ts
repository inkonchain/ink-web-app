export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (remainingSeconds > 0 || parts.length === 0)
    parts.push(
      `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`
    );

  return parts.join(", ");
}
