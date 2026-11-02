import { EnquiryLink } from "@/components/enquiry-link"
import Image from "next/image"
import {
  ArrowUpRight,
  MessageSquareText,
  AudioLines,
  Languages,
  Plug,
  Workflow,
  History,
  BellRing,
} from "lucide-react"
import Container from "@/components/container"
import illustration from "@/assets/images/atheon-agent-capabilities.webp"
import s from "./custom-agents.module.css"

const highlights = [
  {
    icon: MessageSquareText,
    title: "Your customers don’t need the perfect words.",
    text: "Atheon understands typos, casual wording and incomplete requests, then asks for missing details to keep the conversation moving.",
  },
  {
    icon: AudioLines,
    title: "A photo. A voice note. Work can start there.",
    text: "Customers can share photos, screenshots or voice notes. Atheon picks out the useful details to keep their request moving forward.",
  },
  {
    icon: Languages,
    title: "Make every customer feel understood.",
    text: "Customers can speak in their preferred language. Atheon replies using your business information in the languages your business supports.",
  },
  {
    icon: Plug,
    title: "Fits into your business from the conversation onward.",
    text: "Atheon connects to your existing tools to check availability, update records and complete agreed tasks as the conversation continues.",
  },
]
const supporting = [
  {
    icon: Workflow,
    title: "Completes an entire job independently",
    text: "Atheon independently works through multiple steps and connected tools to complete an entire job from request to result.",
  },
  {
    icon: History,
    title: "Remembers returning customers",
    text: "Atheon uses previous conversations and customer preferences to keep returning customers from having to start over.",
  },
  {
    icon: BellRing,
    title: "Takes initiative",
    text: "Atheon follows up on unfinished enquiries, sends reminders and flags issues without waiting for another message.",
  },
]
export function CustomAgents() {
  return (
    <div className={s.background}>
      <Container id="custom-agents">
        <div className={s.intro}>
          <div className={s.copy} data-reveal>
            <span className="section-tag">The Atheon AI agent</span>
            <h2>
              Your new employee.
              <br />
              <span className="heading-accent">Built to get things done.</span>
            </h2>
            <p>
              An AI agent built around your business process, connecting customer
              conversations with your knowledge, tools and workflows.
            </p>
            <EnquiryLink className="button" interest="agent">
              Discuss your AI agent{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </EnquiryLink>
          </div>
          <figure className={s.art} data-reveal data-reveal-variant="scale" data-reveal-delay="1">
            <Image
              src={illustration}
              alt="Atheon’s circuit logo connects language, voice, images and business systems."
              sizes="(max-width: 767px) 100vw, 600px"
            />
          </figure>
        </div>
        <div className={s.highlights}>
          {highlights.map(({ icon: Icon, title, text }, index) => (
            <article key={title} data-reveal data-reveal-delay={index}>
              <span className={s.icon}>
                <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className={s.more}>
          <h3 data-reveal>Responsibility. Memory. Initiative.</h3>
          <div className={s.supporting}>
            {supporting.map(({ icon: Icon, title, text }, index) => (
              <article key={title} data-reveal data-reveal-delay={index}>
                <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
        <p className={s.note}>
          Supported languages, inputs and integrations are agreed during setup
          and tested with your team before launch.
        </p>
      </Container>
    </div>
  )
}
