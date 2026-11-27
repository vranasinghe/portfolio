import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdmin } from "@/lib/adminSession";
import { createInvite, verifyInvite } from "@/lib/reviewInvite";
import { readSubmission, textField, publicUrl, RequestError } from "@/lib/requestSafety";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  if (!isAdmin(request.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  try {
    const body = await readSubmission(request);
    const name = textField(body, "name", 100, true), project = textField(body, "project", 120);
    const projectUrl = publicUrl(textField(body, "projectUrl", 2048));
    const days = body.days === undefined ? 30 : body.days;
    if (typeof days !== "number" || !Number.isInteger(days) || days < 1 || days > 90) throw new RequestError("Valid for must be 1 to 90 days.", 400);
    const token = createInvite({ name, project, projectUrl, days });
    const invite = verifyInvite(token);
    if (!invite.ok) throw new Error();
    return NextResponse.json({ url: new URL("/review?invite=" + token, request.url).href, expiresAt: invite.payload.exp });
  } catch (error) { return NextResponse.json({ error: error instanceof RequestError ? error.message : "Could not create a link." }, { status: error instanceof RequestError ? error.status : 500 }); }
}
