"use client"
import type { MouseEvent, ReactNode } from "react"
import type { EnquiryInterest } from "@/lib/enquiry-options"
export function EnquiryLink({
  interest,
  className,
  children,
}: {
  interest: EnquiryInterest
  className?: string
  children: ReactNode
}) {
  function selectInterest(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    event.preventDefault()
    const url = new URL(window.location.href)
    url.searchParams.set("interest", interest)
    url.hash = "contact-us"
    window.history.pushState(null, "", url)
    window.dispatchEvent(
      new CustomEvent("atheon:enquiry", { detail: interest }),
    )
    document
      .getElementById("contact-us")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      })
    document.getElementById("contact-interest")?.focus({ preventScroll: true })
  }
  return (
    <a
      href={`/?interest=${interest}#contact-us`}
      className={className}
      onClick={selectInterest}
    >
      {children}
    </a>
  )
}
