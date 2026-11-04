import { spawn } from "node:child_process"
import { handleContact } from "../worker/index.ts"
import { createRuntime, loadEnvironment } from "./http-runtime.ts"
loadEnvironment()
const args = process.argv
  .slice(2)
  .filter((arg) => arg !== "--strictPort")
  .map((arg) => (arg === "--host" ? "--hostname" : arg))
const portIndex = args.findIndex((arg) => arg === "--port" || arg === "-p")
const publicPort = portIndex >= 0 ? args[portIndex + 1] : "3000"
const api = createRuntime(handleContact, {
  ...process.env,
  CONTACT_ALLOWED_ORIGINS: [`http://localhost:${publicPort}`, `http://127.0.0.1:${publicPort}`, `http://terminal.local:${publicPort}`].join(","),
})
await new Promise<void>((resolve) => api.listen(0, "127.0.0.1", () => resolve()))
const apiPort = (api.address() as import("node:net").AddressInfo).port
const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", "--webpack", ...args],
  { stdio: "inherit", env: { ...process.env, CONTACT_DEV_PORT: String(apiPort) } },
)
child.on("exit", (code) => { api.close(); process.exit(code ?? 1) })
for (const signal of ["SIGINT", "SIGTERM"] as const)
  process.on(signal, () => child.kill(signal))
