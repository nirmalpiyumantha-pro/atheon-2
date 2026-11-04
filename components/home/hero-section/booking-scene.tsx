"use client"

import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import logo from "@/assets/images/logo.png"
import { Check, MessageSquare } from "lucide-react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

// The face and tail are a single stroked path. Both depth and shadow follow
// that same silhouette, so there is no join or independently shaded tail.
function BubbleSurface({
  tail = false,
  right = false,
}: {
  tail?: boolean
  right?: boolean
}) {
  const svg = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState({ width: 440, height: 180 })
  useEffect(() => {
    const bubble = svg.current?.parentElement
    if (!bubble) return
    const observer = new ResizeObserver(() => {
      setSize({ width: bubble.offsetWidth, height: bubble.offsetHeight })
    })
    observer.observe(bubble)
    return () => observer.disconnect()
  }, [])
  const w = Math.max(60, size.width) - 1
  const h = Math.max(60, size.height) - 1
  const r = 24
  const bottom = tail
    ? `H52 C43 ${h} 38 ${h + 10} 24 ${h + 12} C28 ${h + 7} 29 ${h + 3} 29 ${h} H${r}`
    : `H${r}`
  const outline = `M${r} .5 H${w - r} Q${w} .5 ${w} ${r} V${h - r} Q${w} ${h} ${w - r} ${h} ${bottom} Q.5 ${h} .5 ${h - r} V${r} Q.5 .5 ${r} .5 Z`
  return (
    <svg
      ref={svg}
      className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-visible drop-shadow-[0_var(--depth,3px)_0_var(--edge)] data-[right=true]:-scale-x-100"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      data-right={right}
    >
      <path
        className="fill-(--face) stroke-(--border) stroke-1 [stroke-linejoin:round]"
        d={outline}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function AtheonHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] leading-normal font-semibold @max-[320px]:gap-1.5">
      <span className="inline-flex items-center gap-[7px] text-base font-[650] text-[#0069ff] @max-[320px]:gap-1.5 [&_img]:h-7 [&_img]:w-[25px] [&_img]:object-contain">
        <Image src={logo} alt="" width={25} height={28} />
        <span>Atheon</span>
      </span>
      <span className="inline-flex items-center gap-[5px] rounded-full border px-2 py-1 text-[13px] font-medium @max-[320px]:px-1.5 @max-[320px]:text-xs border-[#c7daf5] bg-[#eaf2ff] text-[#354f70]">
        Booking assistant
      </span>
    </div>
  )
}

export function BookingScene() {
  const scene = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          // The HTML starts in its completed state for reduced motion and no JS.
          // ScrollTrigger starts the sequence only when the scene enters view.
          gsap.set("[data-pending]", { autoAlpha: 1 })
          gsap.set("[data-done]", { autoAlpha: 0 })
          const timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: scene.current,
              start: "top 88%",
              once: true,
            },
          })
          timeline
            .from(
              "[data-message='request']",
              { opacity: 0, y: 26, scale: 0.98, duration: 0.75 },
              0,
            )
            .from(
              "[data-message='working']",
              { opacity: 0, y: 30, scale: 0.98, duration: 0.8 },
              0.7,
            )
            .to(
              "[data-pending='availability']",
              { autoAlpha: 0, duration: 0.25 },
              2,
            )
            .to(
              "[data-done='availability']",
              { autoAlpha: 1, duration: 0.3 },
              2,
            )
            .to(
              "[data-pending='technician']",
              { autoAlpha: 0, duration: 0.25 },
              3,
            )
            .to("[data-done='technician']", { autoAlpha: 1, duration: 0.3 }, 3)
            .from(
              "[data-message='confirmation']",
              { opacity: 0, y: 30, scale: 0.98, duration: 0.85 },
              3.6,
            )
            .from(
              "[data-outcome]",
              { opacity: 0, y: 4, duration: 0.45, stagger: 0.4 },
              4.4,
            )
            .to(
              "[data-spinner]",
              { rotation: 2160, duration: 5.4, ease: "none" },
              0,
            )
        },
        scene,
      )
      return () => media.revert()
    },
    { scope: scene },
  )
  return (
    <figure
      ref={scene}
      className="@container mx-auto w-full max-w-[525px] min-w-0"
      aria-label="Example of a customer request becoming a confirmed service visit"
    >
      <figcaption className="sr-only">
        Illustrative booking workflow: a customer requests an AC service for
        Tuesday. Atheon checks availability and matches a technician. A visit
        with Daniel Silva is confirmed for Tuesday at 2:00 PM, the calendar is
        updated, and a confirmation is sent.
      </figcaption>
      <div className="relative">
        <div
          className="isolate flex flex-col items-start gap-8 px-2 pt-[14px] pb-[25px] max-md:pt-2 @max-[420px]:gap-[30px] @max-[420px]:px-1"
          aria-hidden="true"
        >
          <div
            data-message="request"
            className="relative min-w-0 shrink-0 [--face:#fff] [--edge:#d7e3f2] [--border:#d6e2f2] drop-shadow-[0_12px_12px_#1e477a20] w-[84%] @max-[420px]:w-[91%] @max-[320px]:w-[95%]"
          >
            <BubbleSurface tail />
            <div className="relative px-[22px] py-5 @max-[420px]:p-[18px] @max-[320px]:px-4 @max-[320px]:py-[17px]">
              <div className="flex items-center gap-2 text-[13px] leading-normal font-medium text-[#405774]">
                <span className="grid size-6 place-items-center rounded-full bg-[#eef3fb] text-[#52749d]">
                  <MessageSquare size={15} />
                </span>
                <span>Customer</span>
                <span className="ml-auto text-[13px] font-normal text-[#405774]">
                  Just now
                </span>
              </div>
              <p className="mt-2.5 mb-0 text-[17px] leading-[1.6] font-medium tracking-[-0.02em] text-[#193250] @max-[420px]:text-base">
                Can I book an AC service for Tuesday?
              </p>
            </div>
          </div>

          <div
            data-message="working"
            className="relative min-w-0 shrink-0 [--face:#fff] [--edge:#d7e3f2] [--border:#d6e2f2] drop-shadow-[0_12px_12px_#1e477a20] w-[91%] self-end @max-[420px]:w-[96%] @max-[320px]:w-[98%]"
          >
            <BubbleSurface tail right />
            <div className="relative px-[22px] py-5 @max-[420px]:p-[18px] @max-[320px]:px-4 @max-[320px]:py-[17px]">
              <AtheonHeader />
              <p className="mt-[14px] mb-3 text-base leading-[1.55] font-medium tracking-[-0.02em] text-[#244264]">
                Let me arrange that for you.
              </p>
              <div className="flex min-h-[30px] items-center gap-[9px] py-1 text-sm leading-normal text-[#354f70] @max-[420px]:text-[13px]">
                <span className="grid min-w-0 [&>span]:col-start-1 [&>span]:row-start-1 [&>span]:flex [&>span]:items-center [&>span]:gap-1.5 [&_svg]:shrink-0 [&_svg]:text-[#127946]">
                  <span
                    data-pending="availability"
                    className="invisible opacity-0"
                  >
                    <span
                      data-spinner
                      className="block size-[13px] shrink-0 rounded-full border-[1.5px] border-[#ccdef8] border-t-[#0069ff]"
                    />
                    Checking availability
                  </span>
                  <span
                    data-done="availability"
                    className="visible opacity-100"
                  >
                    <Check size={16} />
                    Tuesday at 2:00 PM available
                  </span>
                </span>
              </div>
              <div className="flex min-h-[30px] items-center gap-[9px] py-1 text-sm leading-normal text-[#354f70] @max-[420px]:text-[13px]">
                <span className="grid min-w-0 [&>span]:col-start-1 [&>span]:row-start-1 [&>span]:flex [&>span]:items-center [&>span]:gap-1.5 [&_svg]:shrink-0 [&_svg]:text-[#127946]">
                  <span
                    data-pending="technician"
                    className="invisible opacity-0"
                  >
                    <span
                      data-spinner
                      className="block size-[13px] shrink-0 rounded-full border-[1.5px] border-[#ccdef8] border-t-[#0069ff]"
                    />
                    Matching a technician
                  </span>
                  <span data-done="technician" className="visible opacity-100">
                    <Check size={16} />
                    Daniel Silva matched
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div
            data-message="confirmation"
            className="relative min-w-0 w-[91%] shrink-0 self-end text-white [--face:#0069ff] [--edge:#005bdc] [--border:#0061eb] [--depth:1px] drop-shadow-[0_12px_12px_#1e477a20] @max-[420px]:w-[96%] @max-[320px]:w-[98%]"
          >
            <BubbleSurface />
            <div className="relative px-[22px] py-5 @max-[420px]:p-[18px] @max-[320px]:px-4 @max-[320px]:py-[17px]">
              <div className="mb-[14px] flex items-center justify-between gap-3">
                <p className="m-0 min-w-0 text-[21px] leading-[1.35] font-[550] tracking-[-0.025em] text-pretty text-white @max-[420px]:text-xl @max-[320px]:text-[19px]">
                  Your AC service is booked.
                </p>
                <span className="inline-flex items-center gap-[5px] rounded-full border px-2 py-1 text-[13px] @max-[320px]:px-1.5 @max-[320px]:text-xs shrink-0 border-[#b7e5c8] bg-[#ecfdf3] font-semibold text-[#116b3b]">
                  Booked
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm leading-[1.7] [&>strong]:font-medium">
                <strong>Tuesday at 2:00 PM</strong>
              </div>
              <p className="mt-[5px] mb-0 text-sm leading-[1.6] text-white">
                Daniel Silva will handle your visit.
              </p>
              <div className="mt-[14px] flex flex-wrap gap-x-4 gap-y-1.5 @max-[420px]:flex-col @max-[420px]:gap-[5px] [&_svg]:shrink-0 [&_svg]:stroke-[2.5] [&_svg]:text-[#a5f37a]">
                <span
                  data-outcome
                  className="flex items-center gap-[5px] text-[13px] leading-[1.6] text-white"
                >
                  <Check size={16} />
                  Calendar updated
                </span>
                <span
                  data-outcome
                  className="flex items-center gap-[5px] text-[13px] leading-[1.6] text-white"
                >
                  <Check size={16} />
                  Confirmation sent
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}
