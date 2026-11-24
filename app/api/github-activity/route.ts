import { NextRequest, NextResponse } from "next/server";
import type { ActivityData, ContributionDay } from "@/lib/githubActivity";

export const dynamic = "force-dynamic";
const cache = new Map<number, ActivityData>();
const HOUR = 60 * 60 * 1000;
const levels: Record<string, number> = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
const query = `query($login:String!, $from:DateTime!, $to:DateTime!) { user(login:$login) { contributionsCollection(from:$from, to:$to) { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel weekday } } } } } }`;

export async function GET(request: NextRequest) {
  const currentYear = new Date().getUTCFullYear();
  const year = Number(request.nextUrl.searchParams.get("year") || currentYear);
  if (!Number.isInteger(year) || year < 2008 || year > currentYear) return NextResponse.json({ error: "Choose a valid year." }, { status: 400 });
  const previous = cache.get(year);
  if (previous && Date.now() - Date.parse(previous.updatedAt) < HOUR) return NextResponse.json(previous);
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "vranasinghe";
  const fail = (message: string, status = 503) => previous
    ? NextResponse.json({ ...previous, stale: true })
    : NextResponse.json({ error: message }, { status });
  if (!token) return fail("GitHub activity is not configured yet.");
  if (!/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(username)) return fail("GitHub activity configuration is invalid.");
  try {
    const now = new Date();
    const end = year === currentYear ? now.toISOString() : `${year}-12-31T23:59:59Z`;
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "portfolio-github-activity" },
      body: JSON.stringify({ query, variables: { login: username, from: `${year}-01-01T00:00:00Z`, to: end } }), cache: "no-store", signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return fail(response.status === 403 || response.status === 429 ? "GitHub's rate limit has been reached. Please try again later." : "GitHub activity is temporarily unavailable.");
    const body = await response.json();
    if (body.errors?.length) return fail(body.errors.some((e: { type?: string }) => e.type === "RATE_LIMITED") ? "GitHub's rate limit has been reached. Please try again later." : "GitHub activity is temporarily unavailable.");
    const calendar = body.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar || !Array.isArray(calendar.weeks) || !Number.isInteger(calendar.totalContributions)) return fail("GitHub returned an invalid activity calendar.");
    const raw = calendar.weeks.flatMap((week: { contributionDays?: unknown }) => Array.isArray(week.contributionDays) ? week.contributionDays : []);
    const days: ContributionDay[] = [];
    for (const item of raw) {
      if (typeof item.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(item.date) || !Number.isInteger(item.contributionCount) || item.contributionCount < 0 || !(item.contributionLevel in levels) || !Number.isInteger(item.weekday) || item.weekday < 0 || item.weekday > 6) return fail("GitHub returned an invalid activity calendar.");
      if (item.date.startsWith(`${year}-`) && item.date <= end.slice(0, 10)) days.push({ date: item.date, count: item.contributionCount, level: levels[item.contributionLevel], weekday: item.weekday });
    }
    days.sort((a, b) => a.date.localeCompare(b.date));
    const expectedDays = Math.floor((Date.parse(`${end.slice(0, 10)}T00:00:00Z`) - Date.parse(`${year}-01-01T00:00:00Z`)) / 86400000) + 1;
    const continuous = days.every((day, i) => day.date === new Date(Date.UTC(year, 0, i + 1)).toISOString().slice(0, 10) && day.weekday === new Date(`${day.date}T00:00:00Z`).getUTCDay());
    if (days.length !== expectedDays || !continuous || days.reduce((sum, d) => sum + d.count, 0) !== calendar.totalContributions) return fail("GitHub returned an incomplete activity calendar.");
    const data: ActivityData = { year, username, days, updatedAt: new Date().toISOString(), stale: false };
    cache.set(year, data);
    return NextResponse.json(data);
  } catch { return fail("Could not connect to GitHub. Please try again later."); }
}
