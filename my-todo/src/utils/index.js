export function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function getWeekOf() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(now.setDate(diff)).toISOString().split("T")[0];
}

export function truncate(str, n = 28) {
  return str.length > n ? str.slice(0, n) + "…" : str;
}

export function minsToLabel(mins) {
  if (mins >= 60) return `${(mins / 60).toFixed(1)}h`;
  if (mins > 0)   return `${mins}m`;
  return null;
}

export const TIME_MINS = {
  "15 min": 15,
  "30 min": 30,
  "1 hr":   60,
  "2 hr":   120,
  "3 hr+":  180,
};
