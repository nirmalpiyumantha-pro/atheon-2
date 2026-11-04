import * as v from "valibot"
import { enquiryOptions } from "./enquiry-options.ts"

// One schema for the form and server, based on the supplied email-schema.ts.
export const emailSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.nonEmpty("Name is required."),
    v.maxLength(255, "Name must be 255 characters or less."),
    v.check((name) => !/[\r\n]/.test(name), "Please enter your name on one line.")),
  email: v.pipe(v.string(), v.trim(), v.nonEmpty("Email is required."),
    v.email("Please enter a valid email address."), v.maxLength(254)),
  interest: v.picklist(enquiryOptions.map((option) => option.value), "Choose an area of interest."),
  message: v.pipe(v.string(), v.trim(), v.nonEmpty("Message is required."),
    v.maxLength(1024, "Message must be 1024 characters or less.")),
})

export type EmailSchema = v.InferOutput<typeof emailSchema>
export type State = {
  success: boolean
  timestamp: number
  errors: Partial<Record<keyof EmailSchema, string[]>>
  notice?: string
}
export const initialState: State = { success: false, timestamp: 0, errors: {} }
