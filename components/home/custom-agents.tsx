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
    text: "Typos, casual wording, half-explained requests—Atheon makes sense of the message and asks what’s missing.",
  },
  {
    icon: AudioLines,
    title: "A photo. A voice note. Work can start there.",
    text: "Customers can show the problem or say what they need. Atheon picks out the details to move the request forward.",
  },
  {
    icon: Languages,
    title: "Make every customer feel understood.",
    text: "Let customers speak in their preferred language. Atheon responds using your business information, in the languages you support.",
  },
  {
    icon: Plug,
    title: "Fits into your business from the conversation onward.",
    text: "Connect Atheon to your existing tools so it can check availability, update records and complete agreed tasks while the conversation continues.",
  },
]
const supporting = [
  {
    icon: Workflow,
    title: "Completes an entire job independently",
    text: "Works through multiple steps and tools to reach a result.",
  },
  {
    icon: History,
    title: "Remembers returning customers",
    text: "Uses previous conversations and preferences so customers don’t start over.",
  },
  {
    icon: BellRing,
    title: "Takes initiative",
    text: "Follows up on unfinished enquiries, sends reminders and flags issues without waiting for another message.",
  },
]
export function CustomAgents() {
  return (
    <div className={s.background}>
      <Container id="custom-agents">
        <div className={s.intro} data-reveal>
          <div className={s.copy}>
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
          <figure className={s.art}>
            <Image
              src={illustration}
              alt="Atheon’s circuit logo connects language, voice, images and business systems."
              sizes="(max-width: 767px) 100vw, 600px"
            />
          </figure>
        </div>
        <div className={s.highlights} data-reveal>
          {highlights.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <span className={s.icon}>
                <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className={s.more} data-reveal>
          <h3>Responsibility. Memory. Initiative.</h3>
          <div className={s.supporting}>
            {supporting.map(({ icon: Icon, title, text }) => (
              <article key={title}>
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
