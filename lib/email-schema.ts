import * as v from "valibot"

export const emailSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty("Name is required."),
    v.maxLength(255, "Name must be 255 characters or less."),
  ),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Email is required."),
    v.email("Please enter a valid email address."),
  ),
  message: v.pipe(
    v.string(),
    v.nonEmpty("Message is required."),
    v.maxLength(1024, "Message must be 1024 characters or less."),
  ),
})

export type EmailSchema = v.InferInput<typeof emailSchema>
