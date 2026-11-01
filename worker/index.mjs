// The build injects the unchanged Next.js export here so this single Worker
// can serve the website and its private email credentials on the same origin.
const staticFiles = /* STATIC_FILES */ {};
const recipient = "contact@atheonworks.com";
const interests = {
  general: "Help me choose / general enquiry", demo: "Book a demo",
  managed: "Atheon-managed subscription", infrastructure: "Deployment on my infrastructure",
  agent: "Custom AI agent", knowledge: "Company knowledge & search",
  invoices: "Invoice processing", scheduling: "Service scheduling",
  support: "Customer support automation",
};
const attempts = new Map();
const emailPattern = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const json = (body, status = 200) => Response.json(body, {
  status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
});

async function readBody(request) {
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

export async function handleContact(request, env = {}, send = fetch) {
  if (request.method !== "POST") return json({ error: "Use POST to send an enquiry." }, 405);
  const origin = request.headers.get("origin");
  const allowedOrigins = new Set([new URL(request.url).origin,
    ...String(env.CONTACT_ALLOWED_ORIGINS || "").split(",").filter(Boolean)]);
  if (!origin || !allowedOrigins.has(origin)) return json({ error: "Please send this form from the Atheon website." }, 403);
  if (!(request.headers.get("content-type") || "").includes("application/json")) return json({ error: "Invalid request format." }, 415);
  let input;
  try { input = await readBody(request); }
  catch (error) { return json({ error: error.message === "large" ? "Your message is too large." : "Please check the form and try again." }, error.message === "large" ? 413 : 400); }
  if (!input || typeof input !== "object" || Array.isArray(input)) return json({ error: "Invalid enquiry." }, 400);
  if (input.website) return json({ error: "Unable to send this enquiry." }, 400);
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const interest = typeof input.interest === "string" ? input.interest : "";
  const errors = {};
  if (!name || name.length > 255 || /[\r\n]/.test(name)) errors.name = "Enter your name (up to 255 characters).";
  if (!emailPattern.test(email) || email.length > 254 || /[\r\n]/.test(email)) errors.email = "Enter a valid email address.";
  if (!message || message.length > 1024) errors.message = "Enter a message of up to 1,024 characters.";
  if (!Object.hasOwn(interests, interest)) errors.interest = "Choose an area of interest.";
  if (!uuidPattern.test(String(input.submissionId || ""))) errors.form = "Please refresh the page and try again.";
  if (Object.keys(errors).length) return json({ error: "Please check the highlighted fields.", errors }, 400);

  const key = String(env.RESEND_API_KEY || "").trim();
  const from = String(env.FROM_EMAIL || "").trim();
  const senderAddress = from.match(/<([^<>]+)>$/)?.[1] || from;
  if (!key || !emailPattern.test(senderAddress) || /[\r\n]/.test(from)) {
    return json({ error: "Online sending is temporarily unavailable. Please email contact@atheonworks.com directly." }, 503);
  }
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
  const label = interests[interest];
  const text = ["New Atheon website enquiry", "",
    `Name: ${name}`, `Email: ${email}`, `Interested in: ${label}`,
    `Received (UTC): ${new Date().toISOString()}`, `Website: ${new URL(request.url).origin}`,
    "", "Message:", message].join("\n");
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json",
        "Idempotency-Key": `atheon-enquiry/${input.submissionId}` },
      body: JSON.stringify({ from, to: [recipient], reply_to: email,
        subject: `${interest === "demo" ? "Demo request" : "Project enquiry"}: ${label} — ${name}`, text }),
      signal: AbortSignal.timeout(12000),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || typeof result?.id !== "string" || !result.id) {
      return json({ error: "Your message could not be sent. Please try again or email contact@atheonworks.com directly." }, 502);
    }
    return json({ success: true });
  } catch {
    return json({ error: "We couldn’t confirm sending. Please try again; your message is still here." }, 502);
  }
}

export default {
  async fetch(request, env = {}) {
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
