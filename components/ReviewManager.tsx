"use client";
import { useEffect, useState } from "react";
import type { Review } from "@/data/reviews";
type Snapshot = { reviews: Review[]; sha: string; branch: string };
export default function ReviewManager() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  async function refresh() {
    setLoading(true); setError(""); setConfirm(null);
    try {
      const response = await fetch("/api/admin/reviews", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load reviews.");
      setSnapshot(data);
    } catch (e) { setSnapshot(null); setError(e instanceof Error ? e.message : "Could not load reviews."); }
    finally { setLoading(false); }
  }
  useEffect(() => { void refresh(); }, []);
  async function remove(id: string) {
    if (!snapshot || busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/reviews", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, sha: snapshot.sha }) });
      const data = await response.json();
      if (!response.ok) { setConfirm(null); throw new Error(data.error || "Could not delete review."); }
      setNotice("Review removed from GitHub on branch " + data.branch + ". It will disappear from the site after a successful deployment. You can restore it from Git history.");
      await refresh();
    } catch (e) { setError(e instanceof Error ? e.message : "Could not delete review."); }
    finally { setBusy(false); }
  }
  return <div className="space-y-6">
    <button disabled={loading || busy} onClick={() => void refresh()} className="btn-outline min-h-12 px-5 py-3 disabled:opacity-50">{loading ? "Loading reviews…" : "Refresh reviews"}</button>
    {error && <p role="alert" className="border border-red-400/50 p-4 text-red-200">{error}</p>}
    {notice && <p role="status" className="border border-emerald-400/50 p-4 text-emerald-200">{notice}</p>}
    {snapshot && <><p className="text-sm text-[var(--text-muted)] break-words">Managing branch: {snapshot.branch}. Pending email submissions are not published here.</p>
    {!snapshot.reviews.length && <p className="py-8">No approved reviews to manage.</p>}
    <ul className="space-y-5">{snapshot.reviews.map(review => <li key={review.id} className="border border-[var(--border-color)] bg-[var(--card-bg)] p-5 sm:p-6 space-y-4">
      <div><h2 className="text-xl font-bold break-words">{review.name}</h2><p className="text-sm text-[var(--text-muted)] break-words">{review.company || review.role} · {review.rating}/5 · {review.date}</p></div>
      <p className="break-words whitespace-pre-wrap">{review.comment}</p>
      {confirm === review.id ? <div className="border-t border-[var(--border-color)] pt-4 space-y-4"><p>Delete this review by {review.name}? This commits its removal to GitHub and triggers your normal deployment.</p><div className="flex flex-wrap gap-3"><button disabled={busy} onClick={() => void remove(review.id)} className="min-h-12 px-5 py-3 bg-red-700 text-white font-semibold disabled:opacity-50">{busy ? "Deleting…" : "Confirm delete"}</button><button disabled={busy} onClick={() => setConfirm(null)} className="btn-outline min-h-12 px-5 py-3">Cancel</button></div></div> : <button disabled={busy || loading} onClick={() => { setConfirm(review.id); setError(""); }} className="btn-outline min-h-12 px-5 py-3 text-red-200">Delete review</button>}
    </li>)}</ul></>}
  </div>;
}
