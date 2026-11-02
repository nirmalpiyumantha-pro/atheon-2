"use client"

import { useEffect } from "react"

// Reveal each item as it enters the viewport, including on narrow screens.
// Unmarked sticky workflow panels retain their exact scroll geometry.
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
      { threshold: 0, rootMargin: "0px 0px -48px 0px" },
    )

    const positions = elements.map((element) => ({ element, rect: element.getBoundingClientRect() }))
    for (const { element, rect } of positions) {
      if (rect.bottom <= 0) continue
      if (rect.top < window.innerHeight - 48) {
        show(element)
      } else {
        element.dataset.revealState = "pending"
        observer.observe(element)
      }
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
