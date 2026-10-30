import {
  ClipboardCheck,
  GitBranch,
  MessageSquare,
  Plug,
  ShieldCheck,
  Workflow,
  Wrench,
} from "lucide-react"
import Container from "@/components/container"
import Faq from "./faqs-section/faq"
import { ContactForm } from "./contact-section/contact-form"
import { faqsData } from "@/lib/faqs-data"
import s from "./story.module.css"
function Heading({
  tag,
  title,
  description,
}: {
  tag: string
  title: string
  description: string
}) {
  return (
    <div className={s.intro}>
      <span className="section-tag">{tag}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
const reasons = [
  {
    icon: GitBranch,
    title: "Your process comes first",
    text: "We start with how work happens today, then design the automation around your team, rules and desired outcome.",
  },
  {
    icon: Plug,
    title: "Work with the tools you use",
    text: "We assess your existing platforms and connect what is needed, with integration requirements agreed before development.",
  },
  {
    icon: ShieldCheck,
    title: "Keep people in control",
    text: "Set the boundaries for what runs automatically, what needs approval and when a person should take over.",
  },
  {
    icon: Wrench,
    title: "Plan beyond the launch",
    text: "Choose managed hosting and maintenance, or deployment on your own infrastructure with an agreed support arrangement.",
  },
]
export function WhyAtheon() {
  return (
    <div className={s.tint}>
      <Container id="why-atheon">
        <div className={s.whyLayout}>
          <Heading
            tag="Why Atheon"
            title="Built to fit your business. Supported as it grows."
            description="We focus on how automation fits your people, systems and day-to-day operations, from the first workflow discussion to launch and support."
          />
          <div className={s.reasons}>
            {reasons.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon size={25} strokeWidth={1.6} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
export { CustomAgents } from "./custom-agents"
const steps = [
  {
    title: "Understand the work",
    text: "Walk us through the process, the tools involved and what you want to improve.",
  },
  {
    title: "Agree on the plan",
    text: "Define the workflow, integrations, approval rules, costs and delivery scope.",
  },
  {
    title: "Build and test",
    text: "Connect the systems and test realistic scenarios together before going live.",
  },
  {
    title: "Launch and support",
    text: "Deploy the automation, show your team how it works and begin the agreed support.",
  },
]
export function WorkingTogether() {
  return (
    <Container id="how-it-works">
      <Heading
        tag="Working together"
        title="A clear path from idea to everyday use."
        description="You bring the process you want to improve. We turn it into a defined project, with a clear scope and a practical plan for launch."
      />
      <ol className={s.steps}>
        {steps.map((step, i) => (
          <li key={step.title}>
            <span className={s.stepNumber}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </Container>
  )
}
export function PracticalFaqs() {
  return (
    <div className={s.tint}>
      <Container id="faqs">
        <div className={s.faqLayout}>
          <Heading
            tag="FAQs"
            title="Before we get started."
            description="A few practical answers about choosing, building and running your automation."
          />
          <div className={s.faqList}>
            {faqsData.map((faq) => (
              <Faq
                key={faq.id}
                title={faq.title}
                description={faq.description}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
export function ProjectEnquiry() {
  return (
    <Container id="contact-us">
      <div className={s.enquiryLayout}>
        <div>
          <Heading
            tag="Let’s talk"
            title="Start with the work you want to improve."
            description="You don’t need a technical brief. Tell us what takes too much time, what gets missed or what you want to work better."
          />
          <div className={s.contactGuide}>
            <h3>A useful starting point</h3>
            <p>
              <MessageSquare size={19} aria-hidden="true" />
              <span>The task or problem you want to solve</span>
            </p>
            <p>
              <Workflow size={19} aria-hidden="true" />
              <span>The tools your team uses today</span>
            </p>
            <p>
              <ClipboardCheck size={19} aria-hidden="true" />
              <span>What a better outcome would look like</span>
            </p>
          </div>
          <p className={s.emailNote}>
            Prefer email?{" "}
            <a href="mailto:contact@atheonworks.com">contact@atheonworks.com</a>
          </p>
        </div>
        <div className={s.enquiryForm}>
          <ContactForm />
        </div>
      </div>
    </Container>
  )
}

export { Plans } from "./plans"
