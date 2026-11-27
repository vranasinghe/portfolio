// Server-only: cryptographic signing must stay out of client components.
import { randomBytes } from "node:crypto";
import { readToken, signToken } from "@/lib/signedToken";
import { publicUrl } from "@/lib/requestSafety";
export type InvitePayload = { id: string; name: string; project?: string; projectUrl?: string; exp: number };
export function createInvite({ name, project, projectUrl, days = 30 }: { name: string; project?: string; projectUrl?: string; days?: number }) {
  if (typeof name !== "string" || !name.trim() || name.length > 100 || (project !== undefined && (typeof project !== "string" || project.length > 120)) || !Number.isInteger(days) || days < 1 || days > 90) throw new Error("Invalid invite details.");
  if (projectUrl !== undefined && (typeof projectUrl !== "string" || projectUrl.length > 2048)) throw new Error("Invalid project URL.");
  const url = publicUrl(projectUrl || "");
  return signToken("invite:", { id: randomBytes(4).toString("hex"), name: name.trim(), ...(project?.trim() && { project: project.trim() }), ...(url && { projectUrl: url }), exp: Math.floor(Date.now() / 1000) + days * 86400 });
}
export function verifyInvite(token: unknown): { ok: true; payload: InvitePayload } | { ok: false; reason: "invalid" | "expired" } {
  const p = readToken("invite:", token);
  if (!p || typeof p.id !== "string" || !/^[a-f0-9]{8}$/.test(p.id) || typeof p.name !== "string" || !p.name.trim() || p.name.length > 100 || (p.project !== undefined && (typeof p.project !== "string" || p.project.length > 120)) || typeof p.exp !== "number" || !Number.isSafeInteger(p.exp)) return { ok: false, reason: "invalid" };
  if (p.projectUrl !== undefined) {
    if (typeof p.projectUrl !== "string" || p.projectUrl.length > 2048) return { ok: false, reason: "invalid" };
    try { if (!publicUrl(p.projectUrl)) return { ok: false, reason: "invalid" }; } catch { return { ok: false, reason: "invalid" }; }
  }
  if (p.exp <= Math.floor(Date.now() / 1000)) return { ok: false, reason: "expired" };
  return { ok: true, payload: p as InvitePayload };
}
