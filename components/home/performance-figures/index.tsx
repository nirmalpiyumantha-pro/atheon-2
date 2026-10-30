"use client"

import { useEffect, useState } from "react"
import Container from "@/components/container"
import { Figure } from "@/components/home/performance-figures/figure"
import { performanceFiguresData } from "@/lib/performance-figures-data"

const totals = performanceFiguresData.map((figure) => Number(figure.value))

export function Index() {
  // Real totals are available before JavaScript and to assistive technology.
  const [values, setValues] = useState(totals)
  useEffect(() => {
    const strip = document.getElementById("performance-stats")
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!strip || motion.matches || !("IntersectionObserver" in window)) return
    let frame = 0
    let finished = false
    const finish = () => {
      finished = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      setValues(totals)
    }
    const observer = new IntersectionObserver((entries) => {
      if (finished || !entries.some((entry) => entry.isIntersecting)) return
      observer.disconnect()
      let started: number | undefined
      const tick = (now: number) => {
        started ??= now
        const progress = Math.min((now - started) / 1600, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValues(totals.map((total) => Math.floor(total * eased)))
        if (progress < 1) frame = requestAnimationFrame(tick)
        else finish()
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.35 })
    setValues(totals.map(() => 0))
    observer.observe(strip)
    const onMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) finish()
    }
    motion.addEventListener("change", onMotionChange)
    return () => {
      finished = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      motion.removeEventListener("change", onMotionChange)
    }
  }, [])

  return (
    <Container id="performance-stats" className="performance-strip grid grid-cols-2 lg:grid-cols-4">
      {performanceFiguresData.map((performanceFigure, index) => (
        <Figure
          key={performanceFigure.id}
          title={performanceFigure.title}
          value={performanceFigure.value}
          displayValue={String(values[index])}
          suffix={performanceFigure.suffix}
        />
      ))}
    </Container>
  )
}
