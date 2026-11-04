"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { EnquiryLink } from "@/components/enquiry-link"
import { ArrowUpRight } from "lucide-react"
import { BookingScene } from "./booking-scene"
import { PromoPlayer } from "./promo-player"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Index() {
  const hero = useRef<HTMLDivElement>(null)
  const entrance = useRef<gsap.core.Tween | null>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          entrance.current = gsap.from("[data-hero-copy] > *", {
            opacity: 0,
            y: 24,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: "[data-hero-copy]",
              start: "top 88%",
              once: true,
            },
          })
          return () => {
            entrance.current = null
          }
        },
        hero,
      )
      return () => media.revert()
    },
    { scope: hero },
  )

  return (
    <div
      ref={hero}
      className="overflow-hidden border-b border-[#e3edfc] bg-(--surface-blue)"
    >
      <section
        id="home"
        className="mx-auto grid w-full min-w-0 max-w-(--site-width) grid-cols-1 items-center gap-[30px] px-(--site-gutter) pt-[34px] pb-[35px] md:gap-10 md:py-[55px] min-[62.5625rem]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] min-[62.5625rem]:gap-[35px] min-[70rem]:gap-(--layout-gap) min-[70rem]:pt-[70px] min-[70rem]:pb-[60px]"
      >
        <div
          data-hero-copy
          className="relative md:max-[62.5625rem]:max-w-[650px]"
          onFocusCapture={(event) => {
            if (event.target.matches(":focus-visible")) {
              entrance.current?.progress(1)
            }
          }}
        >
          <span className="mb-[17px] inline-block text-xs font-[550] tracking-[0.02em] text-(--brand) md:mb-[23px]">
            AI agents & business automation
          </span>
          <h1 className="max-w-[600px] text-[clamp(33px,8.9vw,48px)] leading-[1.13] font-bold tracking-[-0.045em] text-(--ink) max-[22.5rem]:text-[33px] md:max-w-[670px] md:text-[48px] md:leading-[1.12] min-[70rem]:text-[clamp(40px,4.3vw,61px)]">
            Upgrade your Business with{" "}
            <span className="text-(--brand)">Intelligent Automations</span>
          </h1>
          <p className="mt-5 max-w-[550px] text-[15px] leading-[1.75] text-(--muted) max-[22.5rem]:text-sm md:mt-[25px] md:max-w-[520px] md:text-base md:leading-[1.85]">
            Atheon designs, builds and maintains custom AI agents and business
            automations
          </p>
          <div className="mt-6 grid grid-cols-1 gap-2.5 md:mt-[29px] md:flex md:flex-wrap md:gap-[13px]">
            <EnquiryLink
              className="group inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-[15px] rounded-[10px] border border-(--brand) bg-(--brand) px-[19px] py-[11px] text-sm leading-normal font-[550] text-white shadow-[0_4px_9px_#0069ff13] hover:border-(--brand-hover) hover:bg-(--brand-hover) hover:shadow-[0_5px_15px_#0069ff25] md:w-auto md:gap-[17px] md:px-[23px] md:py-3 [&>svg]:motion-safe:transition-transform [&>svg]:motion-safe:group-hover:translate-x-1 [&>svg]:motion-safe:group-hover:-translate-y-1"
              interest="demo"
            >
              Book a demo <ArrowUpRight size={17} aria-hidden="true" />
            </EnquiryLink>
            <PromoPlayer />
          </div>
        </div>
        <BookingScene />
      </section>
    </div>
  )
}
