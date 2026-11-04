"use client"

import { startTransition, useActionState, useState, useEffect, useRef } from "react"
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react"
import { enquiryOptions, validInterest, type EnquiryInterest } from "@/lib/enquiry-options"

import { submitContact } from "@/lib/contact-action"
import { initialState } from "@/lib/email-schema"
export function ContactForm({ className }: { className?: string }) {
  const [interest, setInterest] = useState<EnquiryInterest>("general")
  const [state, formAction, isSubmitting] = useActionState(submitContact, initialState)
  const [dismissed, setDismissed] = useState(0)
  const [values, setValues] = useState({ name: "", email: "", message: "" })
  const [submissionId, setSubmissionId] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  const feedback = state.timestamp > dismissed
  const success = feedback && state.success
  const errors = feedback ? state.errors : {}
  function resetFeedback() {
    if (isSubmitting) return
    setDismissed(state.timestamp)
    setSubmissionId(crypto.randomUUID())
  }
  function startAnotherMessage() {
    setValues((current) => ({ ...current, message: "" }))
    resetFeedback()
    formRef.current?.querySelector<HTMLTextAreaElement>("textarea")?.focus()
  }
  useEffect(() => {
    function sync() {
      setInterest(validInterest(new URL(window.location.href).searchParams.get("interest")))
      setDismissed(Date.now())
      setSubmissionId(crypto.randomUUID())
    }
    sync()
    window.addEventListener("atheon:enquiry", sync)
    window.addEventListener("popstate", sync)
    return () => {
      window.removeEventListener("atheon:enquiry", sync)
      window.removeEventListener("popstate", sync)
    }
  }, [])

  const fieldError = (field: keyof typeof values | "interest") => errors[field]?.[0] && (
    <p id={`contact-${field}-error`} className="field-error">{errors[field]?.[0]}</p>
  )
  return (
    <form ref={formRef} className={`contact-form ${className || ""}`} onSubmit={(event) => {
      event.preventDefault()
      if (isSubmitting || success) return
      const data = new FormData(event.currentTarget)
      startTransition(() => formAction(data))
    }} onChange={resetFeedback} aria-busy={isSubmitting}>
      <input type="hidden" name="submissionId" value={submissionId} />
      <div className="enquiry-intro">
        <h3>{interest === "demo" ? "Let’s arrange your demo" : "Tell us about your project"}</h3>
        <p>{interest === "demo" ? "Tell us what you’d like to see. We’ll arrange a time by email." : "Choose what you’re interested in, then tell us a little about your business."}</p>
      </div>
      <div className="form-field">
        <label htmlFor="contact-interest">I’m interested in</label>
        <select id="contact-interest" name="interest" value={interest} disabled={isSubmitting}
          aria-invalid={!!errors.interest} aria-describedby={errors.interest ? "contact-interest-error" : undefined}
          onChange={(event) => {
            setInterest(validInterest(event.target.value))
            const url = new URL(window.location.href)
            url.searchParams.set("interest", event.target.value)
            window.history.replaceState(null, "", url)
          }}>
          {enquiryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        {fieldError("interest")}
        <p className="selection-help">You can change this selection at any time.</p>
      </div>
      <div className="form-field">
        <label htmlFor="contact-name">Your name</label>
        <input id="contact-name" name="name" value={values.name} onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))} type="text" autoComplete="name" maxLength={255} placeholder="Your full name" required disabled={isSubmitting}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} />
        {fieldError("name")}
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email address</label>
        <input id="contact-email" name="email" value={values.email} onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))} type="email" autoComplete="email" spellCheck={false} maxLength={254} placeholder="you@company.com" required disabled={isSubmitting}
          aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} />
        {fieldError("email")}
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">What would you like to improve?</label>
        <textarea id="contact-message" name="message" value={values.message} onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))} rows={4} maxLength={1024} placeholder="Describe the task, the tools you use and what you’d like to change…" required disabled={isSubmitting}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined} />
        {fieldError("message")}
      </div>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" autoComplete="off" tabIndex={-1} />
      </div>
      {!success && <button type="submit" className="button form-submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : interest === "demo" ? "Send demo request" : "Send message"}
        {isSubmitting ? <LoaderCircle size={17} className="spinner" aria-hidden="true" /> : <ArrowUpRight size={17} aria-hidden="true" />}
      </button>}
      {feedback && !state.success && state.notice && <p className="field-error" role="alert">{state.notice}</p>}
      <div role="status" aria-live="polite" aria-atomic="true">{success && (
        <div className="form-success">
          <span className="form-success-icon" aria-hidden="true"><Check size={21} strokeWidth={2.5} /></span>
          <div>
            <p className="form-success-title">Message sent successfully</p>
            <p className="form-success-description">Thanks for reaching out. We’ll reply to your email soon.</p>
          </div>
        </div>
      )}</div>
      {success && <button type="button" className="contact-send-another" onClick={startAnotherMessage}>Send another message</button>}
      <p className="preview-note">Your details are sent to Atheon so we can respond. <a href="/privacy" className="privacy-link">Privacy policy</a></p>
    </form>
  )
}
