import { createServer } from "node:http";
import { Readable } from "node:stream";

export function loadEnvironment() {
  for (const path of [".env.local", ".env"]) {
    try { process.loadEnvFile(path); }
    catch (error) { if (error.code !== "ENOENT") throw error; }
  }
}

export function createRuntime(fetchHandler, env = process.env) {
  return createServer(async (incoming, outgoing) => {
    try {
      const headers = new Headers();
      for (const [key, value] of Object.entries(incoming.headers)) {
        if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
      }
      const origin = env.PUBLIC_BASE_URL || `http://${incoming.headers.host || "localhost"}`;
      const request = new Request(new URL(incoming.url || "/", origin), {
        method: incoming.method, headers,
        ...(!["GET", "HEAD"].includes(incoming.method) ? { body: Readable.toWeb(incoming), duplex: "half" } : {}),
      });
      const response = await fetchHandler(request, { ...env, CONTACT_CLIENT_IP: incoming.socket.remoteAddress });
      outgoing.writeHead(response.status, Object.fromEntries(response.headers));
      if (response.body) Readable.fromWeb(response.body).pipe(outgoing);
      else outgoing.end();
    } catch {
      outgoing.writeHead(500, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      outgoing.end(JSON.stringify({ error: "Unable to process this request. Please try again." }));
    }
  });
}
