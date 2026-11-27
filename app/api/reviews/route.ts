import { NextResponse } from "next/server";
import { Resend } from "resend";
import { APPROVED_REVIEWS } from "@/data/reviews";
import { reviewNotificationEmail } from "@/lib/emailTemplates";
import { createThrottle, readSubmission, RequestError, textField, publicUrl } from "@/lib/requestSafety";
import { verifyInvite } from "@/lib/reviewInvite";
import { insertReview, listPublishedReviews, storageConfigured } from "@/lib/reviewStore";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const throttle = createThrottle(5);

/** Published reviews from Supabase, plus any reviews added by hand to data/approvedReviews.json. */
export async function GET() {
  let stored: Awaited<ReturnType<typeof listPublishedReviews>> = [];
  if (storageConfigured()) {
    try { stored = await listPublishedReviews(); } catch { /* fall back to the bundled reviews */ }
  }
  const ids = new Set(stored.map(r => r.id));
  const reviews = [...stored, ...APPROVED_REVIEWS.filter(r => !ids.has(r.id))];
  return NextResponse.json({ success: true, reviews }, { headers: { "Cache-Control": "no-store" } });
}

/** A valid invite link saves and publishes the review immediately (once per link). The owner is emailed a copy. */
export async function POST(request: Request) {
  try {
    const body = await readSubmission(request);
    const invite = verifyInvite(body.inviteToken);
    if (!invite.ok) return NextResponse.json({ success: false, error: "This review link is invalid or has expired." }, { status: 403 });
    const name = textField(body, "name", 100, true), comment = textField(body, "comment", 3000, true);
    const role = textField(body, "role", 120), company = textField(body, "company", 120), service = textField(body, "service", 120);
    const avatarUrl = publicUrl(textField(body, "avatarUrl", 2048)), linkedinUrl = publicUrl(textField(body, "linkedinUrl", 2048)), projectUrl = publicUrl(textField(body, "projectUrl", 2048));
    if (typeof body.rating !== "number" || !Number.isInteger(body.rating) || body.rating < 1 || body.rating > 5) throw new RequestError("Rating must be an integer from 1 to 5.", 400);
    throttle();
    const review = await insertReview(invite.payload.id, {
      name, comment, rating: body.rating,
      role: role || "Client", company: company || "", service: service || "Full-Stack Web App",
      verified: true,
      ...(avatarUrl && { avatarUrl }), ...(linkedinUrl && { linkedinUrl }), ...(projectUrl && { projectUrl }),
    });

    // Notify the owner. The review is already live, so an email failure must not fail the request.
    const apiKey = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL;
    if (apiKey && to) {
      const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Reviews <onboarding@resend.dev>";
      try { await new Resend(apiKey).emails.send({ from, to, ...reviewNotificationEmail(review, invite.payload) }); } catch { /* ignore */ }
    }
    return NextResponse.json({ success: true, published: true, review });
  } catch (error) {
    // Show client-facing errors; hide server configuration details behind a generic message.
    const visible = error instanceof RequestError && error.status < 500;
    const status = error instanceof RequestError ? error.status : 502;
    return NextResponse.json({ success: false, error: visible ? (error as RequestError).message : "Your review couldn't be saved right now. Please try again later." }, { status });
  }
}
