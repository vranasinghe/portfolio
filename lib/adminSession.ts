// Server-only session signing, separated from invite tokens by purpose.
import { readToken, signToken } from "@/lib/signedToken";
export const ADMIN_COOKIE = "vr_admin";
export const sessionCookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/", maxAge: 7 * 86400 };
export function createSessionCookieValue() { return signToken("admin:", { exp: Math.floor(Date.now() / 1000) + 7 * 86400 }); }
export function isAdmin(cookieValue: unknown) {
  const p = readToken("admin:", cookieValue);
  return !!p && typeof p.exp === "number" && Number.isSafeInteger(p.exp) && p.exp > Math.floor(Date.now() / 1000);
}
