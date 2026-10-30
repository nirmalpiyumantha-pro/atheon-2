"use client"

import Container from "@/components/container"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
import SectionHeading from "@/components/section-heading"
import Image from "next/image"
import contactUs from "@/assets/images/contact-us.jpg"
import { ContactForm } from "@/components/home/contact-section/contact-form"
import { useSectionAnimation } from "@/hooks/use-section-animation"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Index() {
  const tagRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subHeadingRef = useRef<HTMLParagraphElement>(null)

  useSectionAnimation({
    tagRef,
    headingRef,
    subHeadingRef,
  })

  return (
    <Container
      className="max-w-[1760px] py-10 md:py-20 flex flex-col justify-center items-center"
      id="contact-us"
    >
      <SectionHeading
        tag="Contact Us"
        heading="Get in Touch"
        subHeading="Connect with our team to discuss your needs and discover how we can help your business."
        tagRef={tagRef}
        headingRef={headingRef}
        subHeadingRef={subHeadingRef}
      />

      <div className="contact-layout">
        <div className="contact-panel">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold text-gray-900">
              Start a Conversation
            </h3>
            <p className="text-sm text-gray-700">
              You can reach us anytime via{" "}
              <a className="email-link" href="mailto:contact@atheonworks.com">
                contact@atheonworks.com
              </a>
            </p>
          </div>

          <ContactForm className="mt-12" />
        </div>
        <div className="contact-image">
          <Image
            src={contactUs}
            alt="Contact us"
            sizes="(max-width: 1023px) 100vw, 600px"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </Container>
  )
}
