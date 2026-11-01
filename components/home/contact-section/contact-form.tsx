"use client"

import { useState, useEffect, useRef, type FormEvent } from "react"
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react"
import { enquiryOptions, validInterest, type EnquiryInterest } from "@/lib/enquiry-options"

type Status = "idle" | "sending" | "success" | "error"
export function ContactForm({ className }: { className?: string }) {
  const [interest, setInterest] = useState<EnquiryInterest>("general")
  const [status, setStatus] = useState<Status>("idle")
  const [notice, setNotice] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const submissionId = useRef<string | null>(null)
  const sending = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const isSubmitting = status === "sending"
  function resetFeedback() {
    if (sending.current) return
    setStatus("idle")
    setNotice("")
    setErrors({})
    submissionId.current = null
  }
  function startAnotherMessage() {
    const message = formRef.current?.elements.namedItem("message")
    if (message instanceof HTMLTextAreaElement) {
      message.value = ""
      resetFeedback()
      message.focus()
    }
  }
  useEffect(() => {
    function sync() {
      setInterest(validInterest(new URL(window.location.href).searchParams.get("interest")))
      resetFeedback()
    }
    sync()
    window.addEventListener("atheon:enquiry", sync)
    window.addEventListener("popstate", sync)
    return () => {
      window.removeEventListener("atheon:enquiry", sync)
      window.removeEventListener("popstate", sync)
    }
  }, [])

  async function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending.current || status === "success") return
    const form = event.currentTarget
    const data = new FormData(form)
    sending.current = true
    setStatus("sending")
    setErrors({})
    setNotice("")
    submissionId.current ||= crypto.randomUUID()
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          interest,
          message: String(data.get("message") || ""),
          website: String(data.get("website") || ""),
          submissionId: submissionId.current,
        }),
        signal: AbortSignal.timeout(20000),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || result?.success !== true) {
        const fieldErrors: Record<string, string> = {}
        for (const key of ["name", "email", "interest", "message"]) {
          if (typeof result?.errors?.[key] === "string") fieldErrors[key] = result.errors[key]
        }
        setErrors(fieldErrors)
        setStatus("error")
        setNotice(typeof result?.error === "string" ? result.error : "Your message could not be sent. Please try again or email contact@atheonworks.com.")
        const first = Object.keys(fieldErrors)[0]
        if (first) requestAnimationFrame(() => {
          const input = form.elements.namedItem(first)
          if (input instanceof HTMLElement) input.focus()
        })
        return
      }
      setStatus("success")
      setNotice("Your message has been sent. We’ll reply to the email address you provided.")
    } catch {
      setStatus("error")
      setNotice("We couldn’t confirm sending. Please try again or email contact@atheonworks.com. Your message is still here.")
    } finally {
      sending.current = false
    }
  }
  const fieldError = (field: string) => errors[field] && (
    <p id={`contact-${field}-error`} className="field-error">{errors[field]}</p>
  )
  return (
    <form ref={formRef} className={`contact-form ${className || ""}`} onSubmit={sendRequest} onChange={resetFeedback} aria-busy={isSubmitting}>
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
        <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={255} placeholder="Your full name" required disabled={isSubmitting}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} />
        {fieldError("name")}
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email address</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" spellCheck={false} maxLength={254} placeholder="you@company.com" required disabled={isSubmitting}
          aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} />
        {fieldError("email")}
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">What would you like to improve?</label>
        <textarea id="contact-message" name="message" rows={4} maxLength={1024} placeholder="Describe the task, the tools you use and what you’d like to change…" required disabled={isSubmitting}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined} />
        {fieldError("message")}
      </div>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" autoComplete="off" tabIndex={-1} />
      </div>
      {status !== "success" && <button type="submit" className="button form-submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : interest === "demo" ? "Send demo request" : "Send message"}
        {isSubmitting ? <LoaderCircle size={17} className="spinner" aria-hidden="true" /> : <ArrowUpRight size={17} aria-hidden="true" />}
      </button>}
      {status === "error" && <p className="field-error" role="alert">{notice}</p>}
      <div role="status" aria-live="polite" aria-atomic="true">{status === "success" && (
        <div className="form-success">
          <span className="form-success-icon" aria-hidden="true"><Check size={21} strokeWidth={2.5} /></span>
          <div>
            <p className="form-success-title">Message sent successfully</p>
            <p className="form-success-description">Thanks for reaching out. We’ll reply to your email soon.</p>
          </div>
        </div>
      )}</div>
      {status === "success" && <button type="button" className="contact-send-another" onClick={startAnotherMessage}>Send another message</button>}
      <p className="preview-note">Your details are sent to Atheon so we can respond. <a href="/privacy" className="privacy-link">Privacy policy</a></p>
    </form>
  )
}
