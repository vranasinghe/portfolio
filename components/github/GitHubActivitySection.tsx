"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ActivityData, ContributionDay } from "@/lib/githubActivity";
import styles from "./GitHubActivity.module.css";

const ContributionSkyline = dynamic(() => import("./ReferenceSkyline"), { ssr: false });

export default function GitHubActivitySection() {
  const section = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<"2d" | "3d">("3d");
  const [days, setDays] = useState<ContributionDay[] | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, { rootMargin: "250px" });
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!ready) return;
    const controller = new AbortController();
    const year = new Date().getUTCFullYear();
    // Both calendars come from the official, server-authenticated GitHub API.
    // Fetch the preceding year too so the rolling calendar includes genuine partial weeks.
    Promise.all([year - 1, year].map(async selectedYear => {
      const response = await fetch(`/api/github-activity?year=${selectedYear}`, { signal: controller.signal });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "GitHub activity is temporarily unavailable.");
      return body as ActivityData;
    })).then(calendars => setDays(calendars.flatMap(calendar => calendar.days)))
      .catch(reason => { if (reason.name !== "AbortError") setError(reason.message); });
    return () => controller.abort();
  }, [ready]);
  return <section id="github-activity" tabIndex={-1} ref={section} className={styles.section} aria-labelledby="github-title">
    <div className={styles.wrap}>
      <h2 id="github-title" className={styles.heading}>GitHub Developer Activity</h2>
      <div className={styles.chart}>
        {days ? <ContributionSkyline data={days} view={view} onViewChange={setView} palette="github" title={null} bordered={false} className="p-0 shadow-none" />
          : <p className={styles.status} role="status">{error || "Loading GitHub contributions…"}</p>}

      </div>
    </div>
  </section>;
}
