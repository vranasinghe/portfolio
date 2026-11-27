import { NextResponse } from "next/server";
import { ADMIN_COOKIE, sessionCookieOptions } from "@/lib/adminSession";
import { readSubmission, RequestError } from "@/lib/requestSafety";
export async function POST(request: Request) {
  try {
    await readSubmission(request);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
    return response;
  } catch (error) { return NextResponse.json({ error: "Request not allowed." }, { status: error instanceof RequestError ? error.status : 400 }); }
}
