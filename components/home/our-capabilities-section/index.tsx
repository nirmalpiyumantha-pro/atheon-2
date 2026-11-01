"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import Image from "next/image"
import { EnquiryLink } from "@/components/enquiry-link"
import { ArrowUpRight, Maximize2 } from "lucide-react"
import Container from "@/components/container"
import { capabilitiesData } from "@/lib/capabilities-data"
import s from "./scroll-showcase.module.css"

const examples = [
  {
    label: "Company knowledge",
    title: "Answers your team can trace back to the source.",
    text: "An employee asks a question. Your agent checks approved policies and documents, then brings back a clear answer with references.",
    outcome: "Less searching. A clear next step.",
    tools: "Slack · Google Drive · Notion",
  },
  {
    label: "Invoice processing",
    title: "Invoices checked. Exceptions brought to your attention.",
    text: "Extract invoice details, check calculations and match the purchase order. Save the draft bill and route discrepancies to finance before payment approval.",
    outcome: "Routine checks handled. Finance stays in control.",
    tools: "Gmail · QuickBooks · Slack",
  },
  {
    label: "Service scheduling",
    title: "From a customer request to a confirmed visit.",
    text: "Match the job to the right technician, check availability and reserve a time. Update the calendar and send the customer their confirmation.",
    outcome: "A booked visit, with fewer back-and-forth messages.",
    tools: "Jobber · Google Calendar · Gmail",
  },
  {
    label: "Customer support",
    title: "Resolve the issue, not just the conversation.",
    text: "Verify the customer and check the order, tracking and delivery policy. Offer an approved resolution, then update the order and support ticket.",
    outcome: "An answer followed by the action it needs.",
    tools: "Shopify · Zendesk · Gmail",
  },
]

export function Index() {
  const [active, setActive] = useState(0)
  const articles = useRef<(HTMLElement | null)[]>([])
  const layout = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const anchorLine = useRef(0)

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1001px)")
    let frame = 0
    let disposed = false

    function updateActive() {
      frame = 0
      if (!desktop.matches || !stage.current) return
      // One source of truth: the card nearest the actual image centre.
      // This also covers the start/end of the sticky range and reverse scrolling.
      const image = stage.current.getBoundingClientRect()
      const line = image.top + image.height / 2
      let nearest = 0
      let distance = Infinity
      articles.current.forEach((article, index) => {
        if (!article) return
        const rect = article.getBoundingClientRect()
        const next = Math.abs(rect.top + rect.height / 2 - line)
        if (next < distance) {
          distance = next
          nearest = index
        }
      })
      setActive((current) => (current === nearest ? current : nearest))
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(updateActive)
    }
    function measure() {
      if (
        disposed ||
        !desktop.matches ||
        !layout.current ||
        !panel.current ||
        !stage.current
      )
        return
      const nav = document.querySelector(".site-nav")
      const navOffset = (nav?.getBoundingClientRect().height ?? 80) + 24
      const panelHeight = panel.current.getBoundingClientRect().height
      const imageHeight = stage.current.getBoundingClientRect().height
      const stepHeight =
        articles.current[0]?.getBoundingClientRect().height ?? 0
      const top = Math.max(
        navOffset,
        (window.innerHeight + navOffset - panelHeight) / 2,
      )
      anchorLine.current = top + imageHeight / 2
      layout.current.style.setProperty("--sticky-top", `${top}px`)
      layout.current.style.setProperty("--step-height", `${stepHeight}px`)
      layout.current.style.setProperty("--image-height", `${imageHeight}px`)
      layout.current.style.setProperty("--panel-height", `${panelHeight}px`)
      schedule()
    }
    const observer = new ResizeObserver(measure)
    for (const element of [
      ...articles.current,
      panel.current,
      stage.current,
      document.querySelector(".site-nav"),
    ]) {
      if (element) observer.observe(element)
    }
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", measure)
    desktop.addEventListener("change", measure)
    document.fonts.ready.then(measure)
    measure()
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", measure)
      desktop.removeEventListener("change", measure)
    }
  }, [])

  function goToExample(event: MouseEvent<HTMLAnchorElement>, index: number) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    const article = articles.current[index]
    if (!article || !window.matchMedia("(min-width: 1001px)").matches) return
    event.preventDefault()
    const rect = article.getBoundingClientRect()
    const target =
      window.scrollY + rect.top + rect.height / 2 - anchorLine.current
    const url = new URL(window.location.href)
    url.hash = `capability-${index}`
    window.history.pushState(null, "", url)
    window.scrollTo({
      top: target,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    })
  }
  return (
    <div className={s.background}>
      <Container id="our-capabilities" className={s.section}>
        <header className={s.heading} data-reveal>
          <span className="section-tag">From request to result</span>
          <h2>See what happens after the first message.</h2>
          <p>
            Four examples of how we connect your information, tools and
            workflows to get the work done.
          </p>
        </header>
        <div className={s.layout} ref={layout}>
          <div className={s.descriptions}>
            {examples.map((example, i) => (
              <article
                key={example.label}
                id={`capability-${i}`}
                data-index={i}
                data-active={active === i}
                ref={(el) => {
                  articles.current[i] = el
                }}
                className={s.step}
              >
                <div className={s.copy}>
                  <span className={s.label}>{example.label}</span>
                  <h3>{example.title}</h3>
                  <p>{example.text}</p>
                  <p className={s.outcome}>{example.outcome}</p>
                  <span className={s.tools}>
                    Example tools: {example.tools}
                  </span>
                  <EnquiryLink
                    interest={
                      (
                        [
                          "knowledge",
                          "invoices",
                          "scheduling",
                          "support",
                        ] as const
                      )[i]
                    }
                    className={s.textLink}
                  >
                    Discuss a similar workflow{" "}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </EnquiryLink>
                </div>
                <figure className={s.inlineImage}>
                  <a
                    href={capabilitiesData[i].image.src.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.imageLink}
                  >
                    <Image
                      src={capabilitiesData[i].image.src}
                      alt={capabilitiesData[i].image.alt}
                      sizes="(max-width: 1000px) 100vw, 750px"
                    />
                    <span className={s.zoomLabel}>
                      <Maximize2 size={16} aria-hidden="true" />
                      Open and zoom workflow
                      <span className="sr-only"> (new tab)</span>
                    </span>
                  </a>
                </figure>
              </article>
            ))}
          </div>
          <div className={s.visualColumn}>
            <div className={s.sticky} ref={panel}>
              <div className={s.imageStage} ref={stage}>
                {capabilitiesData.map((item, i) => (
                  <Image
                    key={item.id}
                    src={item.image.src}
                    alt={item.image.alt}
                    className={s.stageImage}
                    data-active={active === i}
                    aria-hidden={active !== i}
                    sizes="(max-width: 1000px) 1px, 750px"
                    loading="eager"
                  />
                ))}
              </div>
              <div className={s.stageFooter}>
                <span>Illustrative workflow</span>
                <a
                  href={capabilitiesData[active].image.src.src}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open full size <Maximize2 size={14} aria-hidden="true" />
                  <span className="sr-only"> (new tab)</span>
                </a>
              </div>
              <nav className={s.progress} aria-label="Workflow examples">
                {examples.map((example, i) => (
                  <a
                    key={example.label}
                    href={`#capability-${i}`}
                    aria-label={example.label}
                    onClick={(event) => goToExample(event, i)}
                    aria-current={active === i ? "step" : undefined}
                  >
                    <span />
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
