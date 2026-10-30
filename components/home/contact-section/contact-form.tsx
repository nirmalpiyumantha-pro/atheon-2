"use client"

import { useState, useEffect, type FormEvent } from "react"
import { ArrowUpRight, Mail } from "lucide-react"
import {
  enquiryOptions,
  validInterest,
  type EnquiryInterest,
} from "@/lib/enquiry-options"

export function ContactForm({ className }: { className?: string }) {
  const [draft, setDraft] = useState("")
  const [interest, setInterest] = useState<EnquiryInterest>("general")
  useEffect(() => {
    function sync() {
      setInterest(
        validInterest(
          new URL(window.location.href).searchParams.get("interest"),
        ),
      )
      setDraft("")
    }
    sync()
    window.addEventListener("atheon:enquiry", sync)
    window.addEventListener("popstate", sync)
    return () => {
      window.removeEventListener("atheon:enquiry", sync)
      window.removeEventListener("popstate", sync)
    }
  }, [])
  const selectedLabel = enquiryOptions.find(
    (option) => option.value === interest,
  )!.label
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") || "").trim()
    const email = String(data.get("email") || "").trim()
    const message = String(data.get("message") || "").trim()
    const body = `Hi Atheon,\n\nInterested in: ${selectedLabel}\n\n${message}\n\nName: ${name}\nEmail: ${email}`
    setDraft(
      `mailto:contact@atheonworks.com?subject=${encodeURIComponent(`${interest === "demo" ? "Demo request" : "Project enquiry"}: ${selectedLabel} — ${name}`)}&body=${encodeURIComponent(body)}`,
    )
  }
  return (
    <form
      className={`contact-form ${className || ""}`}
      onSubmit={prepareEmail}
      onChange={() => setDraft("")}
    >
      <div className="enquiry-intro" aria-live="polite">
        <h3>
          {interest === "demo"
            ? "Let’s arrange your demo"
            : "Tell us about your project"}
        </h3>
        <p>
          {interest === "demo"
            ? "Tell us what you’d like to see. We’ll arrange a time by email."
            : "Choose what you’re interested in, then tell us a little about your business."}
        </p>
      </div>
      <div className="form-field">
        <label htmlFor="contact-interest">I’m interested in</label>
        <select
          id="contact-interest"
          name="interest"
          value={interest}
          onChange={(event) => {
            setInterest(validInterest(event.target.value))
            setDraft("")
            const url = new URL(window.location.href)
            url.searchParams.set("interest", event.target.value)
            window.history.replaceState(null, "", url)
          }}
        >
          {enquiryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="selection-help">
          You can change this selection at any time.
        </p>
      </div>
      <div className="form-field">
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={255}
          placeholder="Your full name"
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email address</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="you@company.com"
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">What would you like to improve?</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          maxLength={1024}
          placeholder="Describe the task, the tools you use and what you’d like to change…"
          required
        />
      </div>
      <button type="submit" className="button form-submit">
        {interest === "demo" ? "Prepare demo request" : "Prepare enquiry email"}{" "}
        <ArrowUpRight size={17} aria-hidden="true" />
      </button>
      <p className="preview-note">
        Review and send your enquiry through your email app.{" "}
        <a href="/privacy" className="privacy-link">
          Privacy policy
        </a>
      </p>
      <div aria-live="polite">
        {draft && (
          <div className="enquiry-draft">
            <p>Your draft is ready. Nothing has been sent yet.</p>
            <a href={draft} className="button button-outline">
              <Mail size={17} aria-hidden="true" />
              Open email draft
            </a>
            <p>
              No email app set up? Email{" "}
              <a href="mailto:contact@atheonworks.com">
                contact@atheonworks.com
              </a>{" "}
              directly.
            </p>
          </div>
        )}
      </div>
    </form>
  )
}
