"use client"
import { BookOpen, CalendarDays, FileText, Headset, Info } from "lucide-react"
import { WorkflowExample, type WorkflowKey } from "./workflow-examples"
import s from "./capabilities.module.css"
const examples: {
  key: WorkflowKey
  label: string
  title: string
  description: string
  icon: typeof BookOpen
}[] = [
  {
    key: "knowledge",
    label: "Business knowledge",
    title: "Answers grounded in your business data",
    description:
      "Turn a question into a clear, source-backed answer. AI searches approved company documents and brings the relevant policies into the conversation.",
    icon: BookOpen,
  },
  {
    key: "invoices",
    label: "Invoice processing",
    title: "Invoices handled before finance review",
    description:
      "Read incoming invoices, check the details, and route exceptions to the right person. Your finance team stays in control of approval.",
    icon: FileText,
  },
  {
    key: "booking",
    label: "Service bookings",
    title: "From request to scheduled customer visit",
    description:
      "Match a customer’s request to the right technician, check availability, reserve the visit, and update your connected systems.",
    icon: CalendarDays,
  },
  {
    key: "support",
    label: "Customer support",
    title: "Support that actually resolves issues",
    description:
      "Verify the customer, check the order and relevant policies, then carry an approved resolution through the connected support tools.",
    icon: Headset,
  },
]
export function WorkflowShowcase() {
  return (
    <div>
      <fieldset className={s.showcase}>
        <legend className={s.legend}>Explore a workflow</legend>
        <div className={s.choices}>
          {examples.map(({ key, label, icon: Icon }, i) => (
            <div className={s.choice} key={key}>
              <input
                type="radio"
                name="capability-example"
                id={`choose-${key}`}
                value={key}
                defaultChecked={i === 0}
                aria-controls={`workflow-${key}`}
              />
              <label htmlFor={`choose-${key}`}>
                <Icon size={19} aria-hidden="true" />
                <span>{label}</span>
              </label>
            </div>
          ))}
        </div>
        <div className={s.panels}>
          {examples.map((example) => (
            <article
              key={example.key}
              id={`workflow-${example.key}`}
              data-example={example.key}
              className={s.panel}
              aria-labelledby={`title-${example.key}`}
            >
              <div className={s.panelHeading}>
                <h3 id={`title-${example.key}`}>{example.title}</h3>
                <p>{example.description}</p>
              </div>
              <WorkflowExample example={example.key} />
            </article>
          ))}
        </div>
        <p className={s.disclaimer}>
          <Info size={14} aria-hidden="true" />
          Illustrative workflows. Connected tools and approval rules are
          tailored to your business.
        </p>
      </fieldset>
    </div>
  )
}
