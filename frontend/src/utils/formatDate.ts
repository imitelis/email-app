export function formatDate(dateString: string): string {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateString);

  date.setHours(date.getHours() - 5);

  return date.toLocaleDateString(
    undefined,
    options as Intl.DateTimeFormatOptions,
  );
}
