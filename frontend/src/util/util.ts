export function printDate(date: string) {
  const formatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    minute: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  });

  return formatter.format(new Date(date));
}
