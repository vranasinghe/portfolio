import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Review } from "@/data/reviews";
import { createThrottle, readSubmission, RequestError, textField, publicUrl } from "@/lib/requestSafety";
export const runtime = "nodejs";
const file = path.join(process.cwd(), "data", "user_reviews.json");
const throttle = createThrottle(5);
function read(): Review[] {
  if (!fs.existsSync(file)) return [];
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(data)) throw new Error("Invalid review storage");
  return data;
}
export async function GET() {
  if (process.env.NODE_ENV === "production") return NextResponse.json({ success: true, reviews: [], unavailable: true });
  try { return NextResponse.json({ success: true, reviews: read() }); }
  catch { return NextResponse.json({ success: false, error: "Reviews are temporarily unavailable." }, { status: 503 }); }
}
export async function POST(request: Request) {
  try {
    const body = await readSubmission(request);
    const name = textField(body, "name", 100, true), comment = textField(body, "comment", 3000, true);
    const role = textField(body, "role", 120), company = textField(body, "company", 120), service = textField(body, "service", 120);
    const avatarUrl = publicUrl(textField(body, "avatarUrl", 2048)), linkedinUrl = publicUrl(textField(body, "linkedinUrl", 2048)), projectUrl = publicUrl(textField(body, "projectUrl", 2048));
    if (typeof body.rating !== "number" || !Number.isInteger(body.rating) || body.rating < 1 || body.rating > 5) throw new RequestError("Rating must be an integer from 1 to 5.", 400);
    if (process.env.NODE_ENV === "production") throw new RequestError("Review submissions are unavailable until durable storage is configured.", 503);
    throttle();
    const review: Review = { id: randomUUID(), name, comment, role: role || "Visitor", company: company || "", service: service || "Software Development", rating: body.rating, date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }), verified: false, featured: false, avatarUrl, linkedinUrl, projectUrl };
    const reviews = [review, ...read()];
    const temporary = file + ".tmp";
    try { fs.writeFileSync(temporary, JSON.stringify(reviews, null, 2), "utf8"); fs.renameSync(temporary, file); }
    catch { throw new RequestError("Your review could not be saved. Please try again later.", 503); }
    return NextResponse.json({ success: true, review, reviews });
  } catch (error) { return NextResponse.json({ success: false, error: error instanceof RequestError ? error.message : "Review storage is temporarily unavailable." }, { status: error instanceof RequestError ? error.status : 503 }); }
}
