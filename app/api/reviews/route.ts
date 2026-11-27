import { NextResponse } from "next/server";
import { Resend } from "resend";
import { APPROVED_REVIEWS, type Review } from "@/data/reviews";
import { reviewNotificationEmail } from "@/lib/emailTemplates";
import { createThrottle, readSubmission, RequestError, textField, publicUrl } from "@/lib/requestSafety";
export const runtime = "nodejs";
const throttle = createThrottle(5);

/** Published reviews come only from data/reviews.ts, which you edit after approving a submission. */
export async function GET() {
  return NextResponse.json({ success: true, reviews: APPROVED_REVIEWS });
}

/** Submissions are emailed to the owner for approval. Nothing is published automatically. */
export async function POST(request: Request) {
  try {
    const body = await readSubmission(request);
    const name = textField(body, "name", 100, true), comment = textField(body, "comment", 3000, true);
    const role = textField(body, "role", 120), company = textField(body, "company", 120), service = textField(body, "service", 120);
    const avatarUrl = publicUrl(textField(body, "avatarUrl", 2048)), linkedinUrl = publicUrl(textField(body, "linkedinUrl", 2048)), projectUrl = publicUrl(textField(body, "projectUrl", 2048));
    if (typeof body.rating !== "number" || !Number.isInteger(body.rating) || body.rating < 1 || body.rating > 5) throw new RequestError("Rating must be an integer from 1 to 5.", 400);
    throttle();
    const apiKey = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL;
    if (!apiKey || !to) return NextResponse.json({ success: false, error: "Reviews can't be received right now. Please try again later." }, { status: 503 });
    const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Reviews <onboarding@resend.dev>";
    const id = `review-${Date.now().toString(36)}`;
    const review: Review = {
      id, name, comment, rating: body.rating,
      role: role || "Client", company: company || "", service: service || "Full-Stack Web App",
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "Asia/Colombo" }),
      verified: true,
      ...(avatarUrl && { avatarUrl }), ...(linkedinUrl && { linkedinUrl }), ...(projectUrl && { projectUrl }),
    };
    const { error } = await new Resend(apiKey).emails.send({ from, to, ...reviewNotificationEmail(review) });
    if (error) return NextResponse.json({ success: false, error: "Your review couldn't be sent. Please try again later." }, { status: 502 });
    return NextResponse.json({ success: true, pending: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof RequestError ? error.message : "Your review couldn't be sent. Please try again later." }, { status: error instanceof RequestError ? error.status : 502 });
  }
}
