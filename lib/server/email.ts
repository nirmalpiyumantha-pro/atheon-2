import * as v from "valibot"
import { Resend, type CreateEmailOptions, type CreateEmailRequestOptions } from "resend"
import { emailSchema, type State } from "../email-schema.ts"
import { enquiryOptions } from "../enquiry-options.ts"

export type EmailEnvironment = {
  RESEND_API_KEY?: string
  FROM_EMAIL?: string
  CONTACT_ALLOWED_ORIGINS?: string
  CONTACT_CLIENT_IP?: string
}
export type EmailSender = (email: CreateEmailOptions, options: CreateEmailRequestOptions) =>
  Promise<{ data?: { id: string } | null; error?: unknown }>
export type EmailResult = State & { status: number }

// Adapted from the supplied email.ts. Imported only by the server endpoint.
export async function sendEmail(_previous: State, formData: FormData, env: EmailEnvironment, send?: EmailSender): Promise<EmailResult> {
  const result = v.safeParse(emailSchema, Object.fromEntries(formData))
  const failure = (status: number, notice: string, errors: State["errors"] = {}): EmailResult =>
    ({ success: false, timestamp: Date.now(), errors, notice, status })
  if (!result.success) return failure(400, "Please check the highlighted fields.", v.flatten(result.issues).nested ?? {})
  if (!env.RESEND_API_KEY || !env.FROM_EMAIL) return failure(503,
    "Online sending is temporarily unavailable. Please email contact@atheonworks.com directly.")

  const { name, email, message, interest } = result.output
  const label = enquiryOptions.find((option) => option.value === interest)!.label
  try {
    const resend = send ? null : new Resend(env.RESEND_API_KEY)
    const deliver: EmailSender = send ?? ((email, options) => resend!.emails.send(email, options))
    const { data, error } = await deliver({
      from: env.FROM_EMAIL,
      to: ["contact@atheonworks.com"],
      replyTo: email,
      subject: `${interest === "demo" ? "Demo request" : "Project enquiry"}: ${label} | ${name}`,
      text: ["New Atheon website enquiry", "", `Name: ${name}`, `Email: ${email}`,
        `Interested in: ${label}`, `Received (UTC): ${new Date().toISOString()}`, "", "Message:", message].join("\n"),
    }, { idempotencyKey: `atheon-enquiry/${formData.get("submissionId")}`, signal: AbortSignal.timeout(12000) })
    if (error || !data?.id) return failure(502, "Your message could not be sent. Please try again or email contact@atheonworks.com directly.")
    return { success: true, timestamp: Date.now(), errors: {}, status: 200 }
  } catch {
    return failure(502, "We couldn’t confirm sending. Please try again; your message is still here.")
  }
}
