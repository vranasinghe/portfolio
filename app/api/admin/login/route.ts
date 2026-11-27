import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { ADMIN_COOKIE, createSessionCookieValue, sessionCookieOptions } from "@/lib/adminSession";
import { signingSecret } from "@/lib/signedToken";
import { createThrottle, readSubmission, RequestError } from "@/lib/requestSafety";
export const runtime = "nodejs";
const throttle = createThrottle(5);
export async function POST(request: Request) {
  try {
    if (!process.env.ADMIN_PASSWORD || !signingSecret()) return NextResponse.json({ error: "Admin is not configured." }, { status: 503 });
    const body = await readSubmission(request);
    const hash = (s: string) => createHash("sha256").update(s).digest();
    const valid = timingSafeEqual(hash(typeof body.password === "string" ? body.password : ""), hash(process.env.ADMIN_PASSWORD));
    if (!valid) {
      throttle();
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json({ error: "Wrong password." }, { status: 401 });
    }
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, createSessionCookieValue(), sessionCookieOptions);
    return response;
  } catch (error) { return NextResponse.json({ error: error instanceof RequestError ? error.message : "Login failed." }, { status: error instanceof RequestError ? error.status : 500 }); }
}
