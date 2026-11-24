"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { getStats, type ActivityData } from "@/lib/githubActivity";
import styles from "./GitHubActivity.module.css";
const ContributionSkyline = dynamic(() => import("./ReferenceSkyline"), { ssr: false });
export default function GitHubActivitySection() {
  const section = useRef<HTMLElement>(null), requestId = useRef(0);
  const [ready, setReady] = useState(false), [dark, setDark] = useState(false);
  const [view, setView] = useState<"2d" | "3d">("3d");
  const currentYear = new Date().getUTCFullYear();
  const year = currentYear;
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(false), [error, setError] = useState(""), [retry, setRetry] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 639px)").matches) setView("2d");
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setReady(true); observer.disconnect(); } }, { rootMargin: "250px" });
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!ready) return;
    const controller = new AbortController(), id = ++requestId.current;
    setLoading(true); setError(""); setActivity(null);
    fetch('/api/github-activity?year=' + year, { signal: controller.signal }).then(async response => {
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "GitHub activity is temporarily unavailable.");
      if (id === requestId.current && !controller.signal.aborted) setActivity(body as ActivityData);
    }).catch(reason => { if (id === requestId.current && !controller.signal.aborted) setError(reason.message); })
    .finally(() => { if (id === requestId.current && !controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [ready, year, retry]);
  const stats = activity ? getStats(activity.days, year === currentYear) : null;
  return <section id="github-activity" tabIndex={-1} ref={section} className={styles.section} data-theme={dark ? "dark" : "light"} aria-labelledby="github-title">
    <div className={styles.wrap}>
      <h2 id="github-title" className={styles.heading}>GitHub Developer Activity</h2>
      <div className={styles.controls}>
        <button type="button" aria-pressed={dark} onClick={() => setDark(value => !value)}>Dark GitHub theme</button>
      </div>
      <div className={styles.chart} aria-busy={loading}>
        {activity && stats ? <>
          <dl className={styles.stats}>{[['Contributions', stats.total], ['Active days', stats.active], [year === currentYear ? 'Current streak' : 'Year-end streak', stats.current], ['Longest streak', stats.longest]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <ContributionSkyline key={year + '-' + dark} data={activity.days} startDate={year + '-01-01'} endDate={activity.days.at(-1)?.date} view={view} onViewChange={setView} palette="github" title={null} showStats={false} bordered={false} className="p-0 shadow-none" />
          {activity.stale && <p className={styles.note} role="status">Showing cached data; GitHub is temporarily unavailable.</p>}
          {activity.stale && <button type="button" onClick={() => setRetry(value => value + 1)}>Retry GitHub</button>}
        </> : <p className={styles.status} role="status">{error || (ready ? "Loading GitHub contributions…" : "Activity loads as you approach this section.")}</p>}
        {error && <button type="button" onClick={() => setRetry(value => value + 1)}>Retry GitHub</button>}
      </div>
    </div>
  </section>;
}
