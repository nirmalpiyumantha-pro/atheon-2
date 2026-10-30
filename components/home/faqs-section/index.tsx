"use client"

import Container from "@/components/container"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
import Faq from "@/components/home/faqs-section/faq"
import SectionHeading from "@/components/section-heading"
import { faqsData } from "@/lib/faqs-data"
import { useSectionAnimation } from "@/hooks/use-section-animation"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Index() {
  const tagRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subHeadingRef = useRef<HTMLParagraphElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useSectionAnimation({
    tagRef,
    headingRef,
    subHeadingRef,
    itemsRef,
  })

  return (
    <Container
      className="max-w-[1760px] py-10 md:py-20 flex flex-col justify-center items-center"
      id="faqs"
    >
      <SectionHeading
        tag="FAQs"
        heading="Frequently Asked Questions"
        subHeading="Everything you need to know about our automation services, process, delivery, and ongoing business support."
        tagRef={tagRef}
        headingRef={headingRef}
        subHeadingRef={subHeadingRef}
      />

      <div
        className="grid grid-cols-1 gap-2 md:gap-4 mt-6 md:mt-12 w-full max-w-3xl"
        ref={itemsRef}
      >
        {faqsData.map((faq) => (
          <Faq key={faq.id} title={faq.title} description={faq.description} />
        ))}
      </div>
    </Container>
  )
}
