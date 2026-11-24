export class RequestError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

/** Process-local protection only; configure provider quotas for distributed hosting. */
export function createThrottle(maximum: number, duration = 60000) {
  let start = 0, count = 0;
  return () => {
    if (Date.now() - start >= duration) { start = Date.now(); count = 0; }
    if (++count > maximum) throw new RequestError("Too many requests. Please try again later.", 429);
  };
}

export async function readSubmission(request: Request, limit = 16384): Promise<Record<string, unknown>> {
  const origin = request.headers.get("origin");
  if ((origin && origin !== new URL(request.url).origin) || request.headers.get("sec-fetch-site") === "cross-site") throw new RequestError("Request not allowed.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) throw new RequestError("Send JSON content.", 415);
  if (Number(request.headers.get("content-length")) > limit) throw new RequestError("Request is too large.", 413);
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError("Invalid request.", 400);
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const part = await reader.read();
    if (part.done) break;
    size += part.value.byteLength;
    if (size > limit) { await reader.cancel(); throw new RequestError("Request is too large.", 413); }
    chunks.push(part.value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try {
    const body = JSON.parse(new TextDecoder().decode(bytes));
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
    return body;
  } catch { throw new RequestError("Invalid request.", 400); }
}

export function textField(body: Record<string, unknown>, key: string, max: number, required = false) {
  const value = body[key];
  if (value === undefined && !required) return "";
  if (typeof value !== "string" || value.length > max || (required && !value.trim())) throw new RequestError(`Invalid ${key}.`, 400);
  return value.trim();
}

export function publicUrl(value: string) {
  if (!value) return undefined;
  try { const url = new URL(value); if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error(); return url.href; }
  catch { throw new RequestError("Links must use http or https without credentials.", 400); }
}
