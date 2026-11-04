import { readFile, writeFile, readdir, mkdir, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { extname } from "node:path";
import { gzipSync } from "node:zlib";
import { build } from "esbuild";

const types: Record<string, string> = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".webm": "video/webm", ".json": "application/json" };
const files: Record<string, { type: string; body: string; etag: string }> = {};
async function walk(directory: string, prefix = "") {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const relative = `${prefix}/${item.name}`;
    if (item.isDirectory()) await walk(`${directory}/${item.name}`, relative);
    else if (item.isFile()) {
      const bytes = await readFile(`${directory}/${item.name}`);
      files[relative] = { type: types[extname(item.name)] || "application/octet-stream",
        body: bytes.toString("base64"), etag: `"${createHash("sha256").update(bytes).digest("hex")}"` };
    } else throw new Error("The website export must contain regular files only.");
  }
}
await walk("out");
if (!files["/index.html"]) throw new Error("Build the Next.js export first.");
const bundled = await build({
  entryPoints: ["worker/index.ts"], bundle: true, write: false,
  format: "esm", platform: "browser", target: "es2022", minify: true,
  define: { __STATIC_FILES__: JSON.stringify(JSON.stringify(files)) },
});
const source = bundled.outputFiles[0].text;
if (gzipSync(source).length > 9 * 1024 * 1024) throw new Error("Worker bundle exceeds the deployment size budget.");
await rm("dist", { recursive: true, force: true });
await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
await writeFile("dist/server/index.js", source);
await writeFile("dist/.openai/hosting.json", await readFile(".openai/hosting.json"));
const { default: worker } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
if (typeof worker.fetch !== "function") throw new Error("Invalid Worker entrypoint.");
console.log(`Built email-enabled site with ${Object.keys(files).length} unchanged exported assets.`);
