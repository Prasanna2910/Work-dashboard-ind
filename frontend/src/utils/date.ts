export function formatDateForInput(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function formatReadableDate(value: string): string {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  });
}

export function isDateInCurrentWeek(value: string): boolean {
  const now = new Date();
  const currentDay = now.getDay();
  const diffToMonday = (currentDay + 6) % 7;

  const start = new Date(now);
  start.setDate(now.getDate() - diffToMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  const target = new Date(`${value}T00:00:00`);
  return target >= start && target <= end;
}
