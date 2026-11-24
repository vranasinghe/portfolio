import { NextResponse } from "next/server";
import { Resend } from "resend";
import { makeReferenceId, ownerNotificationEmail, type ContactEmailData } from "@/lib/emailTemplates";
import { createThrottle, readSubmission, RequestError, textField } from "@/lib/requestSafety";
export const runtime = "nodejs";
const throttle = createThrottle(5);
export async function POST(request: Request) {
  try {
    const body = await readSubmission(request);
    const name = textField(body, "name", 100, true), email = textField(body, "email", 200, true), message = textField(body, "message", 5000, true);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new RequestError("Invalid email.", 400);
    throttle();
    const apiKey = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL;
    if (!apiKey || !to) return NextResponse.json({ error: "Email is not configured." }, { status: 503 });
    const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
    const data: ContactEmailData = { name, email, message, referenceId: makeReferenceId(), receivedAt: new Date() };
    const { error } = await new Resend(apiKey).emails.send({ from, to, replyTo: email, ...ownerNotificationEmail(data) });
    if (error) return NextResponse.json({ error: "Email delivery is temporarily unavailable." }, { status: 502 });
    // Only the configured owner receives mail. Arbitrary visitor addresses are never recipients.
    return NextResponse.json({ ok: true, referenceId: data.referenceId, confirmationSent: false });
  } catch (error) {
    return NextResponse.json({ error: error instanceof RequestError ? error.message : "Email delivery is temporarily unavailable." }, { status: error instanceof RequestError ? error.status : 502 });
  }
}
