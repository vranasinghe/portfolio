"use client";
import { useEffect, useState } from "react";
async function post(path: string, body: object) {
  const response = await fetch("/api/admin/" + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Please try again.");
  return data;
}
const button = "min-h-12 px-4 py-3 btn-outline disabled:opacity-50";
export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return <form className="space-y-5" onSubmit={async e => { e.preventDefault(); setBusy(true); setError(""); try { await post("login", { password }); window.location.reload(); } catch (e) { setError(e instanceof Error ? e.message : "Login failed."); setBusy(false); } }}>
    <label className="block">Password<input className="input-neon w-full mt-2 p-3" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
    {error && <p role="alert">{error}</p>}<button className="btn-accent w-full min-h-12 p-3" disabled={busy}>{busy ? "Logging in…" : "Log in"}</button>
  </form>;
}
type LinkRecord = { url: string; expiresAt: number; name: string; project: string; days: number };
export function InviteCreator() {
  const [name, setName] = useState(""); const [project, setProject] = useState(""); const [days, setDays] = useState(30);
  const [links, setLinks] = useState<LinkRecord[]>([]); const [current, setCurrent] = useState<LinkRecord | null>(null);
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false); const [copied, setCopied] = useState(""); const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(typeof navigator.share === "function"), []);
  async function copy(url: string) { try { await navigator.clipboard.writeText(url); setCopied(url); setTimeout(() => setCopied(""), 2500); } catch { setError("Could not copy. Select the link and copy it manually."); } }
  const message = (link: LinkRecord) => "Hi " + link.name + ", thank you for working with me on " + (link.project || "your project") + "! I'd really appreciate a short review: " + link.url + " (link valid for " + link.days + " days)";
  return <div className="space-y-6">
    {error && <p role="alert">{error}</p>}
    {!current ? <form className="space-y-5" onSubmit={async e => { e.preventDefault(); setBusy(true); setError(""); try { const data = await post("review-invite", { name, project, days }); const link = { ...data, name: name.trim(), project: project.trim(), days }; setCurrent(link); setLinks(previous => [link, ...previous]); } catch (e) { setError(e instanceof Error ? e.message : "Could not create link."); } finally { setBusy(false); } }}>
      <label className="block">Client name (required)<input required maxLength={100} autoComplete="name" className="input-neon w-full p-3 mt-2" value={name} onChange={e => setName(e.target.value)} /></label>
      <label className="block">Project (optional)<input maxLength={120} className="input-neon w-full p-3 mt-2" value={project} onChange={e => setProject(e.target.value)} /></label>
      <label className="block">Valid for<select className="input-neon w-full p-3 mt-2" value={days} onChange={e => setDays(Number(e.target.value))}>{[7,14,30,60].map(d => <option key={d} value={d}>{d} days</option>)}</select></label>
      <button disabled={busy} className="btn-accent w-full min-h-12 p-3">{busy ? "Creating…" : "Create link"}</button>
    </form> : <div className="space-y-4">
      <label className="block">Review link for {current.name}<textarea aria-label="Generated review link" readOnly value={current.url} className="input-neon w-full p-3 mt-2 break-all" rows={4} onFocus={e => e.target.select()} /></label>
      <a href={current.url} target="_blank" rel="noopener noreferrer" className={button + " flex items-center justify-center"}>Open review link</a>
      <p className="text-sm text-[var(--text-muted)]">Expires {new Date(current.expiresAt * 1000).toLocaleDateString()}</p>
      <div className="flex flex-col gap-3"><button className={button} onClick={() => copy(current.url)}>{copied === current.url ? "Copied!" : "Copy"}</button><a className="btn-accent min-h-12 px-4 py-3 text-center" href={"https://wa.me/?text=" + encodeURIComponent(message(current))} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
      {canShare && <button className={button} onClick={async () => { try { await navigator.share({ text: message(current) }); } catch (e) { if (!(e instanceof Error && e.name === "AbortError")) setError("Sharing failed. Try Copy or WhatsApp."); } }}>Share</button>}
      <button className={button} onClick={() => { setCurrent(null); setName(""); setProject(""); setDays(30); setError(""); }}>Create another</button></div>
    </div>}
    {!!links.length && <section className="border-t border-[var(--border-color)] pt-5"><h2 className="font-bold mb-2">Created this session</h2><p className="text-sm text-[var(--text-muted)] mb-3">This list clears when you reload or log out.</p><ul className="space-y-3">{links.map(link => <li key={link.url} className="flex items-center justify-between gap-3"><a href={link.url} target="_blank" rel="noopener noreferrer" className="min-w-0 break-words text-[var(--accent-color)] underline underline-offset-4 py-3" aria-label={"Open review link for " + link.name}>{link.name}{link.project && " · " + link.project}</a><button className={button + " shrink-0"} onClick={() => copy(link.url)}>{copied === link.url ? "Copied!" : "Copy"}</button></li>)}</ul></section>}
    <p className="sr-only" role="status">{copied ? "Copied!" : ""}</p><button className={button + " text-sm"} onClick={async () => { setError(""); try { await post("logout", {}); window.location.reload(); } catch { setError("Could not log out. Please try again."); } }}>Log out</button>
  </div>;
}
