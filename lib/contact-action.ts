import { emailSchema, type State } from "./email-schema.ts"
import * as v from "valibot"

// The current static export uses a same-origin endpoint rather than Next Server Actions.
// This adapter keeps the supplied useActionState/FormData flow and secrets on the server.
export async function submitContact(_previous: State, data: FormData): Promise<State> {
  const result = v.safeParse(emailSchema, Object.fromEntries(data))
  if (!result.success) return {
    success: false, timestamp: Date.now(), errors: v.flatten(result.issues).nested ?? {},
  }
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...result.output, website: data.get("website"), submissionId: data.get("submissionId") }),
      signal: AbortSignal.timeout(20000),
    })
    const state = await response.json()
    if (response.ok && state.success === true) return { success: true, timestamp: Date.now(), errors: {} }
    return { success: false, timestamp: Date.now(), errors: state.errors ?? {},
      notice: state.error ?? "Your message could not be sent. Please try again or email contact@atheonworks.com." }
  } catch {
    return { success: false, timestamp: Date.now(), errors: {},
      notice: "We couldn’t confirm sending. Please try again or email contact@atheonworks.com. Your message is still here." }
  }
}
