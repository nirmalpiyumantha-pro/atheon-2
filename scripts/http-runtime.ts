import { createServer } from "node:http";
import { Readable } from "node:stream";
import type { ReadableStream as NodeReadableStream } from "node:stream/web";
import type { EmailEnvironment } from "../lib/server/email.ts";
type RuntimeEnvironment = EmailEnvironment & { PUBLIC_BASE_URL?: string };

export function loadEnvironment() {
  for (const path of [".env.local", ".env"]) {
    try { process.loadEnvFile(path); }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
  }
}

export function createRuntime(fetchHandler: (request: Request, env: EmailEnvironment) => Promise<Response>, env: RuntimeEnvironment = { ...process.env } as RuntimeEnvironment) {
  return createServer(async (incoming, outgoing) => {
    try {
      const headers = new Headers();
      for (const [key, value] of Object.entries(incoming.headers)) {
        if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
      }
      const origin = env.PUBLIC_BASE_URL || `http://${incoming.headers.host || "localhost"}`;
      const request = new Request(new URL(incoming.url || "/", origin), {
        method: incoming.method, headers,
        ...(!["GET", "HEAD"].includes((incoming.method || "GET")) ? { body: Readable.toWeb(incoming) as ReadableStream<Uint8Array>, duplex: "half" } : {}),
      } as RequestInit);
      const response = await fetchHandler(request, { ...env, CONTACT_CLIENT_IP: incoming.socket.remoteAddress });
      outgoing.writeHead(response.status, Object.fromEntries(response.headers));
      if (response.body) Readable.fromWeb(response.body as NodeReadableStream<Uint8Array>).pipe(outgoing);
      else outgoing.end();
    } catch {
      outgoing.writeHead(500, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      outgoing.end(JSON.stringify({ error: "Unable to process this request. Please try again." }));
    }
  });
}
