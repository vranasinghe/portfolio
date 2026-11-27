// Server-only Supabase access for client reviews. Never import from client components:
// the secret key bypasses Row Level Security.
import type { Review } from "@/data/reviews";
import { RequestError, publicUrl } from "@/lib/requestSafety";

type ReviewRow = {
  id: string; invite_id: string; name: string; role: string; company: string; service: string;
  rating: number; comment: string; avatar_url: string | null; linkedin_url: string | null;
  project_url: string | null; verified: boolean; status: "published" | "hidden"; created_at: string;
};
export type NewReview = Omit<Review, "id" | "date" | "featured">;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function storageConfigured() {
  return Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY));
}
function config() {
  // Accept the project URL with or without a trailing /rest/v1/.
  const url = (process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
  const key = (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!url || !key) throw new RequestError("Review storage is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY on the server.", 503);
  if (!/^https:\/\/[^/\s]+$/.test(url)) throw new RequestError("SUPABASE_URL must be your project URL, like https://xyz.supabase.co.", 503);
  return { url, key };
}
async function rest(path: string, init: { method?: string; body?: object; prefer?: string } = {}) {
  const { url, key } = config();
  let response: Response;
  try {
    response = await fetch(url + "/rest/v1/" + path, {
      method: init.method || "GET", cache: "no-store", signal: AbortSignal.timeout(10000),
      headers: { apikey: key, Accept: "application/json", "Content-Type": "application/json", ...(init.prefer && { Prefer: init.prefer }) },
      ...(init.body && { body: JSON.stringify(init.body) }),
    });
  } catch { throw new RequestError("Review storage could not be reached. Please try again.", 502); }
  let data: unknown = null;
  try { data = await response.json(); } catch { /* empty body */ }
  if (!response.ok) {
    const code = data && typeof data === "object" && "code" in data ? String((data as { code: unknown }).code) : "";
    if (code === "23505") throw new RequestError("This review link has already been used.", 410);
    if (code === "PGRST205" || code === "42P01") throw new RequestError("The reviews table is missing. Run the reviews table SQL in Supabase.", 503);
    if (response.status === 401 || response.status === 403) throw new RequestError("Supabase rejected the server key. Check SUPABASE_SECRET_KEY.", 503);
    throw new RequestError("Review storage could not process this request. Please try again.", 502);
  }
  return data;
}

function safeUrl(value: unknown) {
  if (typeof value !== "string" || !value) return undefined;
  try { return publicUrl(value) || undefined; } catch { return undefined; }
}
function toReview(row: ReviewRow): Review {
  return {
    id: row.id, name: row.name, role: row.role, company: row.company, service: row.service,
    rating: row.rating, comment: row.comment, verified: row.verified,
    date: new Date(row.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "Asia/Colombo" }),
    ...(safeUrl(row.avatar_url) && { avatarUrl: safeUrl(row.avatar_url) }),
    ...(safeUrl(row.linkedin_url) && { linkedinUrl: safeUrl(row.linkedin_url) }),
    ...(safeUrl(row.project_url) && { projectUrl: safeUrl(row.project_url) }),
  };
}
function rows(data: unknown): ReviewRow[] {
  if (!Array.isArray(data)) throw new RequestError("Unexpected response from review storage.", 502);
  return data.filter((r): r is ReviewRow => !!r && typeof r === "object" && typeof r.id === "string" && typeof r.name === "string" && typeof r.comment === "string" && Number.isInteger(r.rating) && r.rating >= 1 && r.rating <= 5);
}

/** Published reviews, newest first, for the public Client Reviews section. */
export async function listPublishedReviews() {
  return rows(await rest("reviews?select=*&status=eq.published&order=created_at.desc&limit=200")).map(toReview);
}
/** Every review, including hidden ones, for the admin page. */
export async function listAllReviews() {
  return rows(await rest("reviews?select=*&order=created_at.desc&limit=500")).map(r => ({ ...toReview(r), status: r.status }));
}
/** Saves and publishes a review. invite_id is unique, so each invite link can be used once. */
export async function insertReview(inviteId: string, review: NewReview) {
  const created = rows(await rest("reviews", {
    method: "POST", prefer: "return=representation",
    body: {
      invite_id: inviteId, name: review.name, role: review.role, company: review.company, service: review.service,
      rating: review.rating, comment: review.comment, verified: review.verified, status: "published",
      avatar_url: review.avatarUrl ?? null, linkedin_url: review.linkedinUrl ?? null, project_url: review.projectUrl ?? null,
    },
  }));
  if (!created[0]) throw new RequestError("Review storage did not confirm the save.", 502);
  return toReview(created[0]);
}
/** Permanently removes a review. */
export async function deleteReview(id: string) {
  if (!UUID.test(id)) throw new RequestError("Invalid review id.", 400);
  const removed = rows(await rest("reviews?id=eq." + id, { method: "DELETE", prefer: "return=representation" }));
  if (!removed.length) throw new RequestError("This review no longer exists. Refresh the list.", 404);
  return { ok: true };
}
