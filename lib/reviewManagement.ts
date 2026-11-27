// Server-only GitHub access. Never import from client components.
import type { Review } from "@/data/reviews";
import { RequestError, publicUrl } from "@/lib/requestSafety";
const repository = "vranasinghe/portfolio";
const filePath = "data/approvedReviews.json";
const endpoint = "https://api.github.com/repos/" + repository + "/contents/" + filePath;
function config() {
  const token = process.env.REVIEW_GITHUB_TOKEN, branch = process.env.REVIEW_GITHUB_BRANCH;
  if (!token || !branch) throw new RequestError("Review management is not configured. Set REVIEW_GITHUB_TOKEN and REVIEW_GITHUB_BRANCH on the server.", 503);
  return { token, branch };
}
export function validateApprovedReviews(value: unknown): Review[] {
  if (!Array.isArray(value) || value.length > 1000) throw new RequestError("The approved reviews file is invalid. No changes were made.", 502);
  const ids = new Set<string>();
  for (const r of value) {
    if (!r || typeof r !== "object" || Array.isArray(r)) throw new RequestError("Invalid review data.", 502);
    for (const key of ["id", "name", "role", "company", "comment", "service", "date"]) {
      if (typeof r[key] !== "string" || r[key].length > 3000) throw new RequestError("Invalid review data.", 502);
    }
    if (!r.id || !r.name || ids.has(r.id) || !Number.isInteger(r.rating) || r.rating < 1 || r.rating > 5 || typeof r.verified !== "boolean" || (r.featured !== undefined && typeof r.featured !== "boolean")) throw new RequestError("Invalid review data.", 502);
    for (const key of ["avatarUrl", "linkedinUrl", "projectUrl"]) {
      if (r[key] !== undefined) {
        if (typeof r[key] !== "string" || r[key].length > 2048) throw new RequestError("Invalid review URL.", 502);
        try { publicUrl(r[key]); } catch { throw new RequestError("Invalid review URL.", 502); }
      }
    }
    ids.add(r.id);
  }
  return value as Review[];
}
async function github(method: string, body?: object) {
  const { token, branch } = config();
  let response: Response;
  try {
    response = await fetch(endpoint + (method === "GET" ? "?ref=" + encodeURIComponent(branch) : ""), {
      method, cache: "no-store", signal: AbortSignal.timeout(15000),
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
      ...(body && { body: JSON.stringify({ ...body, branch }) }),
    });
  } catch { throw new RequestError("GitHub could not be reached. Please try again.", 502); }
  if (!response.ok) {
    if ([409, 422].includes(response.status)) throw new RequestError("Reviews changed or the branch rejected the update. Refresh and try again; check branch protection if it continues.", 409);
    if ([401, 403].includes(response.status)) throw new RequestError("GitHub denied access. Check the review token permissions and branch protection.", 503);
    if (response.status === 404) throw new RequestError("Review file or branch not found. Deploy the approvedReviews.json migration to the configured branch first.", 503);
    throw new RequestError("GitHub could not process this request. Please try again.", 502);
  }
  try { return await response.json(); } catch { throw new RequestError("Invalid response from GitHub.", 502); }
}
export async function getManagedReviews() {
  const file = await github("GET");
  if (file.type !== "file" || file.encoding !== "base64" || typeof file.sha !== "string" || !/^[a-f0-9]{40,64}$/.test(file.sha) || typeof file.content !== "string" || file.content.length > 1500000) throw new RequestError("Invalid approved reviews file.", 502);
  let parsed: unknown;
  try { parsed = JSON.parse(Buffer.from(file.content, "base64").toString("utf8")); } catch { throw new RequestError("The approved reviews JSON is invalid. No changes were made.", 502); }
  return { reviews: validateApprovedReviews(parsed), sha: file.sha, branch: config().branch };
}
export async function deleteManagedReview(id: string, expectedSha: string) {
  const current = await getManagedReviews();
  if (current.sha !== expectedSha) throw new RequestError("Reviews have changed. Refresh the list before deleting.", 409);
  if (!current.reviews.some(r => r.id === id)) throw new RequestError("This review no longer exists. Refresh the list.", 404);
  const remaining = current.reviews.filter(r => r.id !== id);
  const result = await github("PUT", { message: "Remove approved client review " + id.replace(/[\r\n]/g, " ").slice(0, 100), sha: current.sha, content: Buffer.from(JSON.stringify(remaining, null, 2) + "\n").toString("base64") });
  if (typeof result.commit?.sha !== "string") throw new RequestError("GitHub returned an unexpected result. Refresh the list to confirm the deletion.", 502);
  return { ok: true, commit: result.commit.sha, branch: current.branch };
}
