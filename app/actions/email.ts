"use server"

import { emailSchema } from "@/lib/email-schema"
import * as v from "valibot"
import { Resend } from "resend"

export type State = {
  success: boolean
  timestamp: number
  errors: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
}

export async function sendEmail(prevState: State, formData: FormData) {
  const emailData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  }

  const result = v.safeParse(emailSchema, emailData)

  if (!result.success) {
    const errors = v.flatten(result.issues).nested

    return {
      success: false,
      timestamp: Date.now(),
      errors: {
        name: errors?.name,
        email: errors?.email,
        message: errors?.message,
      }
    }
  }

  const { name, email, message } = result.output

  try {
    const resend = new Resend(process.env.RESEND_API_KEY!)

    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      replyTo: email,
      subject: `Atheon Works: New message from ${name}`,
      text: message,
    })

    if (error) {
      return {
        success: false,
        timestamp: Date.now(),
        errors: {},
      }
    }

    return {
      success: true,
      timestamp: Date.now(),
      errors: {},
    }
  } catch {
    return {
      success: false,
      timestamp: Date.now(),
      errors: {},
    }
  }
}
