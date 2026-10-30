"use client"

import Container from "@/components/container"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
import { Industry } from "@/components/home/who-we-help-section/industry"
import SectionHeading from "@/components/section-heading"
import { industriesData } from "@/lib/industires-data"
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
      id="who-we-help"
    >
      <SectionHeading
        tag=" Who We Help"
        heading=" Automation for the way your industry works"
        subHeading="We design automation systems around the unique workflows, requirements, and challenges of your specific industry."
        tagRef={tagRef}
        headingRef={headingRef}
        subHeadingRef={subHeadingRef}
      />

      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-12 w-full"
        ref={itemsRef}
      >
        {industriesData.map((industry) => (
          <Industry
            key={industry.id}
            title={industry.title}
            description={industry.description}
            icon={industry.icon}
          />
        ))}
      </div>
    </Container>
  )
}
