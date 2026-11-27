import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdmin } from "@/lib/adminSession";
import { listAllReviews, deleteReview } from "@/lib/reviewStore";
import { readSubmission, textField, RequestError } from "@/lib/requestSafety";
export const runtime = "nodejs";
const json = (data: object, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
const failure = (error: unknown) => json({ error: error instanceof RequestError ? error.message : "Review management is temporarily unavailable." }, error instanceof RequestError ? error.status : 502);
export async function GET(request: NextRequest) {
  if (!isAdmin(request.cookies.get(ADMIN_COOKIE)?.value)) return json({ error: "Please log in." }, 401);
  try { return json({ reviews: await listAllReviews() }); } catch (error) { return failure(error); }
}
export async function DELETE(request: NextRequest) {
  if (!isAdmin(request.cookies.get(ADMIN_COOKIE)?.value)) return json({ error: "Please log in." }, 401);
  try {
    const body = await readSubmission(request);
    return json(await deleteReview(textField(body, "id", 64, true)));
  } catch (error) { return failure(error); }
}
