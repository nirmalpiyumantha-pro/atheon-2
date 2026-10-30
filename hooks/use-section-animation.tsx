import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
import type { RefObject } from "react"
gsap.registerPlugin(ScrollTrigger, useGSAP)
type Refs = {
  tagRef?: RefObject<HTMLElement | null>
  headingRef?: RefObject<HTMLElement | null>
  subHeadingRef?: RefObject<HTMLElement | null>
  itemsRef?: RefObject<HTMLElement | null>
}
export function useSectionAnimation({
  tagRef,
  headingRef,
  subHeadingRef,
  itemsRef,
}: Refs) {
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const headings = [
        tagRef?.current,
        headingRef?.current,
        subHeadingRef?.current,
      ].filter(Boolean)
      gsap.from(headings, {
        y: 14,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: headings[0], start: "top 95%", once: true },
      })
      const items = itemsRef?.current
      if (items)
        gsap.from(items.children, {
          y: 16,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: { trigger: items, start: "top 92%", once: true },
        })
    })
    return () => media.revert()
  })
}
