"use client"

import { useEffect } from "react"

// Content stays visible without JavaScript. Only groups below the first
// viewport are prepared for a single reveal; sticky workflow panels never move.
export function ScrollMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("#main-content [data-reveal]"),
    )
    const show = (element: HTMLElement) => {
      element.dataset.revealState = "visible"
      observer.unobserve(element)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) show(entry.target as HTMLElement)
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 72px 0px" },
    )

    // Batch measurements before writing attributes to avoid layout thrashing.
    const positions = elements.map((element) => ({
      element,
      belowFold: element.getBoundingClientRect().top > window.innerHeight + 72,
    }))
    for (const { element, belowFold } of positions) {
      if (!belowFold) continue
      element.dataset.revealState = "pending"
      observer.observe(element)
    }

    // Keyboard navigation should never land on visually hidden content.
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return
      const group = event.target.closest<HTMLElement>("[data-reveal]")
      if (group?.dataset.revealState === "pending") {
        observer.unobserve(group)
        delete group.dataset.revealState
      }
    }
    const onMotionChange = () => {
      if (!reducedMotion.matches) return
      observer.disconnect()
      for (const element of elements) delete element.dataset.revealState
    }
    document.addEventListener("focusin", onFocus)
    reducedMotion.addEventListener("change", onMotionChange)
    return () => {
      observer.disconnect()
      document.removeEventListener("focusin", onFocus)
      reducedMotion.removeEventListener("change", onMotionChange)
      for (const element of elements) delete element.dataset.revealState
    }
  }, [])

  return null
}
