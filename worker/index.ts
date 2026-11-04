import { sendEmail, type EmailEnvironment, type EmailSender } from "../lib/server/email.ts";
import { initialState } from "../lib/email-schema.ts";
declare const __STATIC_FILES__: string;
// The build injects the unchanged Next.js export here so this single Worker
// can serve the website and its private email credentials on the same origin.
type StaticFile = { type: string; body: string; etag: string };
const staticFiles: Record<string, StaticFile> = JSON.parse(typeof __STATIC_FILES__ === "undefined" ? "{}" : __STATIC_FILES__);
const attempts = new Map<string, { count: number; until: number }>();
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const json = (body: unknown, status = 200) => Response.json(body, {
  status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
});

async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > 16384) throw new Error("large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid");
  const decoder = new TextDecoder();
  let text = "", bytes = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16384) { await reader.cancel(); throw new Error("large"); }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally { reader.releaseLock(); }
}

export async function handleContact(request: Request, env: EmailEnvironment = {}, send?: EmailSender) {
  if (request.method !== "POST") return json({ error: "Use POST to send an enquiry." }, 405);
  const origin = request.headers.get("origin");
  const allowedOrigins = new Set([new URL(request.url).origin,
    ...String(env.CONTACT_ALLOWED_ORIGINS || "").split(",").filter(Boolean)]);
  if (!origin || !allowedOrigins.has(origin)) return json({ error: "Please send this form from the Atheon website." }, 403);
  if (!(request.headers.get("content-type") || "").includes("application/json")) return json({ error: "Invalid request format." }, 415);
  let input;
  try { input = await readBody(request); }
  catch (error) { return json({ error: error instanceof Error && error.message === "large" ? "Your message is too large." : "Please check the form and try again." }, error instanceof Error && error.message === "large" ? 413 : 400); }
  if (!input || typeof input !== "object" || Array.isArray(input)) return json({ error: "Invalid enquiry." }, 400);
  if (input.website) return json({ error: "Unable to send this enquiry." }, 400);
  if (!uuidPattern.test(String(input.submissionId || ""))) return json({ error: "Please refresh the page and try again." }, 400);
  // Best-effort abuse control per running instance; no persistent visitor data.
  const ip = env.CONTACT_CLIENT_IP || request.headers.get("cf-connecting-ip");
  if (ip) {
    const now = Date.now();
    for (const [address, entry] of attempts) if (entry.until < now) attempts.delete(address);
    const entry = attempts.get(ip) || { count: 0, until: now + 600000 };
    if (entry.count >= 5) return json({ error: "Too many attempts. Please wait a few minutes or email us directly." }, 429);
    entry.count += 1;
    attempts.set(ip, entry);
  }
  const data = new FormData();
  for (const [name, value] of Object.entries(input)) if (typeof value === "string") data.set(name, value);
  const result = await sendEmail(initialState, data, env, send);
  return json({ success: result.success, errors: result.errors, error: result.notice }, result.status);
}

export default {
  async fetch(request: Request, env: EmailEnvironment = {}) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact" || url.pathname === "/api/contact/") return handleContact(request, env);
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405 });
    let path;
    try { path = decodeURIComponent(url.pathname); }
    catch { return new Response("Bad request", { status: 400 }); }
    let entry = staticFiles[path];
    if (!entry && !path.endsWith("/") && staticFiles[`${path}/index.html`]) {
      url.pathname += "/";
      return Response.redirect(url.toString(), 308);
    }
    entry ||= staticFiles[`${path}${path.endsWith("/") ? "" : "/"}index.html`];
    const status = entry ? 200 : 404;
    entry ||= staticFiles["/404.html"];
    if (!entry) return new Response("Not found", { status: 404 });
    const headers = new Headers({ "Content-Type": entry.type, ETag: entry.etag,
      "X-Content-Type-Options": "nosniff", "Cache-Control": path.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache" });
    if (status === 200 && request.headers.get("if-none-match") === entry.etag) return new Response(null, { status: 304, headers });
    const bytes = Uint8Array.from(atob(entry.body), c => c.charCodeAt(0));
    headers.set("Content-Length", String(bytes.length));
    return new Response(request.method === "HEAD" ? null : bytes, { status, headers });
  },
};
