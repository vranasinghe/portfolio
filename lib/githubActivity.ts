export type ContributionDay = { date: string; count: number; level: number; weekday: number };
export type ActivityData = { year: number; username: string; days: ContributionDay[]; updatedAt: string; stale: boolean };

export function getStats(days: ContributionDay[], allowTodayGrace = true) {
  let longest = 0, run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // A streak remains current through the day after the last contribution.
  let i = days.length - 1;
  if (allowTodayGrace && i >= 0 && days[i].count === 0) i--;
  let current = 0;
  while (i >= 0 && days[i--].count > 0) current++;
  const total = days.reduce((sum, day) => sum + day.count, 0);
  return { total, active: days.filter(day => day.count > 0).length, current, longest,
    average: days.length ? total / days.length : 0,
    mostActive: days.reduce<ContributionDay | null>((best, day) => !best || day.count > best.count ? day : best, null) };
}

export function describeDay(day: ContributionDay) {
  const date = new Date(`${day.date}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric", year: "numeric" });
  return `${date}: ${day.count} contribution${day.count === 1 ? "" : "s"}, ${["no", "low", "moderate", "high", "very high"][day.level]} activity`;
}
