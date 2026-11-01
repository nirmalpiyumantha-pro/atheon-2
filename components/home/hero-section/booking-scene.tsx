"use client"

import { useEffect, useId, useRef, useState } from "react"
import Image from "next/image"
import logo from "@/assets/images/logo.png"
import {
  Check,
  MessageSquare,
  Pause,
  Play,
} from "lucide-react"
import s from "./booking-scene.module.css"

// The face and tail are a single stroked path. Both depth and shadow follow
// that same silhouette, so there is no join or independently shaded tail.
function BubbleSurface({ tail = false, right = false }: { tail?: boolean; right?: boolean }) {
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
  const outline = `M${r} .5 H${w-r} Q${w} .5 ${w} ${r} V${h-r} Q${w} ${h} ${w-r} ${h} ${bottom} Q.5 ${h} .5 ${h-r} V${r} Q.5 .5 ${r} .5 Z`
  return (
    <svg ref={svg} className={s.surface} width={size.width} height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none" aria-hidden="true"
      data-right={right}>
      <path className={s.face} d={outline} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function AtheonHeader() {
  return (
    <div className={s.workHeading}>
      <span className={s.brandIdentity}>
        <Image src={logo} alt="" width={25} height={28} />
        <span>Atheon</span>
      </span>
      <span className={s.workLabel}>Booking assistant</span>
    </div>
  )
}

export function BookingScene() {
  const pauseId = useId()
  return (
    <figure
      className={s.scene}
      aria-label="Example of a customer request becoming a confirmed service visit"
    >
      <figcaption className={s.srOnly}>
        Illustrative booking workflow: a customer requests an AC service for
        Tuesday. Atheon checks availability and matches a technician. A visit
        with Daniel Silva is confirmed for Tuesday at 2:00 PM, the calendar is
        updated, and a confirmation is sent.
      </figcaption>
      <div className={s.player}>
        <input
          id={pauseId}
          type="checkbox"
          className={s.pauseInput}
          aria-label="Pause animation"
        />
        <div className={s.canvas} aria-hidden="true">
          <div className={s.request}>
            <BubbleSurface tail />
            <div className={s.bubbleBody}>
              <div className={s.sender}>
                <span className={s.customerIcon}>
                  <MessageSquare size={15} />
                </span>
                <span>Customer</span>
                <span className={s.messageTime}>Just now</span>
              </div>
              <p>Can I book an AC service for Tuesday?</p>
            </div>
          </div>

          <div className={s.working}>
            <BubbleSurface tail right />
            <div className={s.bubbleBody}>
              <AtheonHeader />
              <p className={s.workTitle}>Let me arrange that for you.</p>
              <div className={s.task}>
                <span className={s.taskText}>
                  <span className={s.pendingFirst}>
                    <span className={s.spinner} />
                    Checking availability
                  </span>
                  <span className={s.doneFirst}>
                    <Check size={16} />
                    Tuesday at 2:00 PM available
                  </span>
                </span>
              </div>
              <div className={s.task}>
                <span className={s.taskText}>
                  <span className={s.pendingSecond}>
                    <span className={s.spinner} />
                    Matching a technician
                  </span>
                  <span className={s.doneSecond}>
                    <Check size={16} />
                    Daniel Silva matched
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className={s.confirmation}>
            <BubbleSurface />
            <div className={s.bubbleBody}>
              <div className={s.confirmationHeading}>
                <p className={s.serviceTitle}>Your AC service is booked.</p>
                <span className={`${s.workLabel} ${s.bookedLabel}`}>Booked</span>
              </div>
              <div className={s.appointment}>
                <strong>Tuesday at 2:00 PM</strong>
              </div>
              <p className={s.technician}>
                Daniel Silva will handle your visit.
              </p>
              <div className={s.outcomes}>
                <span className={s.calendarOutcome}>
                  <Check size={16} />
                  Calendar updated
                </span>
                <span className={s.emailOutcome}>
                  <Check size={16} />
                  Confirmation sent
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={s.sceneFooter}>
          <div className={s.controls}>
            <label htmlFor={pauseId} className={s.pauseControl}>
              <span className={s.pauseLabel}>
                <Pause size={12} />
                Pause
              </span>
              <span className={s.resumeLabel}>
                <Play size={12} />
                Resume
              </span>
            </label>
          </div>
        </div>
      </div>
    </figure>
  )
}
