"use client"

import Container from "@/components/container"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
import Feature from "@/components/home/why-it-matters-section/feature"
import { featuresData } from "@/lib/features-data"
import SectionHeading from "@/components/section-heading"
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
      id="why-it-matters"
    >
      <SectionHeading
        tag="Why It Matters"
        heading="We automate the work that slows your business down"
        subHeading="Automate repetitive tasks, reduce operating costs, and keep your business moving faster with fewer mistakes."
        tagRef={tagRef}
        headingRef={headingRef}
        subHeadingRef={subHeadingRef}
      />

      <div
        ref={itemsRef}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-12"
      >
        {featuresData.map((feature) => (
          <Feature
            key={feature.id}
            image={{ src: feature.image.src, alt: feature.image.alt }}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </Container>
  )
}
