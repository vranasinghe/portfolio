import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  makeReferenceId,
  ownerNotificationEmail,
  visitorConfirmationEmail,
  type ContactEmailData,
} from "@/lib/emailTemplates";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  let body: { name?: unknown; email?: unknown; message?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || name.length > 100 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
  const data: ContactEmailData = { name, email, message, referenceId: makeReferenceId(), receivedAt: new Date() };

  const owner = ownerNotificationEmail(data);
  const { error } = await resend.emails.send({ from, to, replyTo: email, ...owner });

  if (error) {
    console.error("Resend error", error);
    return NextResponse.json({ error: "Failed to send." }, { status: 502 });
  }

  // Confirmation copy to the address the visitor entered in the form.
  // A failure here is logged but doesn't fail the request — the owner already has the message.
  const confirmation = visitorConfirmationEmail(data);
  const { error: confirmError } = await resend.emails.send({ from, to: email, replyTo: to, ...confirmation });
  if (confirmError) console.error("Resend confirmation error", confirmError);

  return NextResponse.json({ ok: true, referenceId: data.referenceId, confirmationSent: !confirmError });
}
