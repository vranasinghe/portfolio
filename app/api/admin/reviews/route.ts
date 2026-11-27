import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdmin } from "@/lib/adminSession";
import { getManagedReviews, deleteManagedReview } from "@/lib/reviewManagement";
import { readSubmission, textField, RequestError } from "@/lib/requestSafety";
export const runtime = "nodejs";
const json = (data: object, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
const failure = (error: unknown) => json({ error: error instanceof RequestError ? error.message : "Review management is temporarily unavailable." }, error instanceof RequestError ? error.status : 502);
export async function GET(request: NextRequest) {
  if (!isAdmin(request.cookies.get(ADMIN_COOKIE)?.value)) return json({ error: "Please log in." }, 401);
  try { return json(await getManagedReviews()); } catch (error) { return failure(error); }
}
export async function DELETE(request: NextRequest) {
  if (!isAdmin(request.cookies.get(ADMIN_COOKIE)?.value)) return json({ error: "Please log in." }, 401);
  try {
    const body = await readSubmission(request);
    const id = textField(body, "id", 3000, true), sha = textField(body, "sha", 64, true);
    if (!/^[a-f0-9]{40,64}$/.test(sha)) throw new RequestError("Invalid review version. Refresh the list.", 400);
    return json(await deleteManagedReview(id, sha));
  } catch (error) { return failure(error); }
}
