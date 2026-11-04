import test from "node:test"
import assert from "node:assert/strict"
import { readFile, readdir } from "node:fs/promises"
import { handleContact } from "../worker/index.ts"
import { enquiryOptions } from "../lib/enquiry-options.ts"
import { submitContact } from "../lib/contact-action.ts"
import { initialState } from "../lib/email-schema.ts"
import type { EmailSender } from "../lib/server/email.ts"

const env = { RESEND_API_KEY: "re_test_only", FROM_EMAIL: "Atheon website <contact@atheonworks.com>" }
const valid = () => ({ name: "Test Customer", email: "customer@example.com", interest: "managed",
  message: "Please connect our CRM.\nWe need booking and email updates.", submissionId: crypto.randomUUID(), website: "" })
const request = (data: unknown = valid(), headers: Record<string, string> = {}) => new Request("https://atheon.example/api/contact", {
  method: "POST", headers: { "Content-Type": "application/json", Origin: "https://atheon.example", ...headers }, body: JSON.stringify(data),
})
const ok: EmailSender = async () => ({ data: { id: crypto.randomUUID() }, error: null })
const never: EmailSender = async () => { throw new Error("must not send") }

test("sends all form fields to the fixed mailbox with visitor reply-to and retry protection", async () => {
  const input = valid()
  let sent = false
  const response = await handleContact(request({ ...input, to: "other@example.com" }), env, async (email, options) => {
    sent = true
    assert.deepEqual(email.to, ["contact@atheonworks.com"])
    assert.equal(email.from, env.FROM_EMAIL)
    assert.equal(email.replyTo, input.email)
    for (const field of [input.name, input.email, input.message, "Atheon-managed subscription"]) assert.ok(email.text?.includes(field))
    assert.equal(options.idempotencyKey, `atheon-enquiry/${input.submissionId}`)
    return ok(email, options)
  })
  assert.equal(response.status, 200)
  assert.equal((await response.json()).success, true)
  assert.equal(sent, true)
})

test("every interest-menu choice reaches the email", async () => {
  for (const { value, label } of enquiryOptions) {
    const response = await handleContact(request({ ...valid(), interest: value }), env, async (email, options) => {
      assert.ok(email.text?.includes(`Interested in: ${label}`))
      if (value === "demo") assert.ok(email.subject?.startsWith("Demo request:"))
      return ok(email, options)
    })
    assert.equal(response.status, 200)
  }
})

test("validates required fields, unknown interests, whitespace and injected headers", async () => {
  let sends = 0
  for (const fields of [{ name: "" }, { name: "   " }, { name: "A\r\nB" }, { email: "bad" },
    { email: "a@example.com\nBcc:b@example.com" }, { message: "" }, { message: "x".repeat(1025) },
    { interest: "__proto__" }, { submissionId: "not-an-id" }, { website: "bot-filled" }]) {
    const response = await handleContact(request({ ...valid(), ...fields }), env, async (...args) => { sends++; return ok(...args) })
    assert.equal(response.status, 400, JSON.stringify(fields))
  }
  assert.equal(sends, 0)
})

test("missing configuration and provider errors never report success", async () => {
  assert.equal((await handleContact(request(), {}, never)).status, 503)
  for (const send of [async () => ({ error: { message: "denied" } }), async () => ({}), never]) {
    const response = await handleContact(request(), env, send)
    assert.equal(response.status, 502)
    assert.equal((await response.json()).success, false)
  }
})

test("rejects other origins, oversized and malformed bodies and non-POST requests", async () => {
  assert.equal((await handleContact(request(valid(), { Origin: "https://other.example" }), env, never)).status, 403)
  assert.equal((await handleContact(request({ message: "x".repeat(17000) }), env, never)).status, 413)
  assert.equal((await handleContact(request(null), env, never)).status, 400)
  assert.equal((await handleContact(new Request("https://atheon.example/api/contact"), env, never)).status, 405)
})

test("limits repeated requests without sending another message", async () => {
  const limited = { ...env, CONTACT_CLIENT_IP: crypto.randomUUID() }
  let sends = 0
  const send: EmailSender = async (...args) => { sends++; return ok(...args) }
  for (let i = 0; i < 5; i++) assert.equal((await handleContact(request(), limited, send)).status, 200)
  assert.equal((await handleContact(request(), limited, send)).status, 429)
  assert.equal(sends, 5)
})

test("client action handles validation, provider failure, retry and a second message", async (t) => {
  const data = new FormData()
  for (const [key, value] of Object.entries(valid())) data.set(key, value)
  const fetchMock = t.mock.method(globalThis, "fetch", async (_url: unknown, options: RequestInit) =>
    handleContact(request(JSON.parse(options.body as string)), env, ok))
  data.set("email", "bad")
  assert.ok((await submitContact(initialState, data)).errors.email)
  assert.equal(fetchMock.mock.callCount(), 0)
  data.set("email", "customer@example.com")
  fetchMock.mock.mockImplementationOnce(async () => Response.json({ error: "Try again" }, { status: 502 }))
  const failed = await submitContact(initialState, data)
  assert.equal(failed.success, false)
  assert.equal(failed.notice, "Try again")
  const sent = await submitContact(failed, data)
  assert.equal(sent.success, true)
  data.set("message", "A second request")
  data.set("submissionId", crypto.randomUUID())
  assert.equal((await submitContact(sent, data)).success, true)
})

test("packaged runtime preserves all exported pages and assets byte for byte", async () => {
  const source = await readFile("dist/server/index.js", "utf8")
  const { default: worker } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`)
  let checked = 0
  async function walk(dir: string, prefix = "") {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = `${prefix}/${entry.name}`
      if (entry.isDirectory()) await walk(`${dir}/${entry.name}`, path)
      else {
        const response = await worker.fetch(new Request(`https://atheon.example${path}`))
        assert.equal(response.status, 200, path)
        assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(`${dir}/${entry.name}`), path)
        checked++
      }
    }
  }
  await walk("out")
  assert.ok(checked > 50)
  assert.equal((await worker.fetch(new Request("https://atheon.example/"))).status, 200)
  assert.equal((await worker.fetch(new Request("https://atheon.example/privacy"))).status, 308)
  assert.equal((await worker.fetch(new Request("https://atheon.example/missing-page/"))).status, 404)
  assert.equal((await worker.fetch(request())).status, 503)
})

test("packaged Resend SDK sends the expected wire payload without exposing server credentials", async (t) => {
  const source = await readFile("dist/server/index.js", "utf8")
  const { default: worker } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`)
  let sends = 0
  t.mock.method(globalThis, "fetch", async (url: string, options: RequestInit) => {
    assert.equal(url, "https://api.resend.com/emails")
    const envelope = JSON.parse(options.body as string)
    assert.deepEqual(envelope.to, ["contact@atheonworks.com"])
    assert.equal(envelope.reply_to, "customer@example.com")
    assert.ok(envelope.text.includes("Atheon-managed subscription"))
    assert.ok(new Headers(options.headers).get("Idempotency-Key")?.startsWith("atheon-enquiry/"))
    sends++
    return Response.json({ id: crypto.randomUUID() })
  })
  const response = await worker.fetch(request(), env)
  assert.equal(response.status, 200)
  assert.equal((await response.json()).success, true)
  assert.equal(sends, 1)
})
