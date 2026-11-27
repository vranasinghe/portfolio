// Server-only: never import this module from client components.
import { createHmac, timingSafeEqual } from "node:crypto";
export function signingSecret() {
  const secret = process.env.REVIEW_INVITE_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}
export function signToken(prefix: string, payload: object) {
  const secret = signingSecret();
  if (!secret) throw new Error("Signing is not configured.");
  const part = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return part + "." + createHmac("sha256", secret).update(prefix + part).digest("base64url");
}
export function readToken(prefix: string, token: unknown): Record<string, unknown> | null {
  try {
    const secret = signingSecret();
    if (!secret || typeof token !== "string" || token.length > 4096) return null;
    const parts = token.split(".");
    if (parts.length !== 2 || !parts.every(p => /^[A-Za-z0-9_-]+$/.test(p))) return null;
    const [part, signature] = parts;
    const expected = createHmac("sha256", secret).update(prefix + part).digest();
    const actual = Buffer.from(signature, "base64url");
    if (actual.toString("base64url") !== signature || actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const value = JSON.parse(Buffer.from(part, "base64url").toString("utf8"));
    return value && typeof value === "object" && !Array.isArray(value) ? value : null;
  } catch { return null; }
}
