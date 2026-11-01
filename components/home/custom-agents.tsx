import { EnquiryLink } from "@/components/enquiry-link"
import Image from "next/image"
import {
  ArrowUpRight,
  MessageSquareText,
  AudioLines,
  Languages,
  Plug,
  BookOpen,
  Workflow,
  UserRoundCheck,
} from "lucide-react"
import Container from "@/components/container"
import illustration from "@/assets/images/atheon-agent-capabilities.webp"
import s from "./custom-agents.module.css"

const highlights = [
  {
    icon: MessageSquareText,
    title: "Understands how people actually talk",
    text: "Understands everyday wording, typos and short messages. Asks a follow-up when something is unclear.",
  },
  {
    icon: AudioLines,
    title: "Works with images and voice",
    text: "Picks out useful details from photos, screenshots and voice notes to continue the conversation.",
  },
  {
    icon: Languages,
    title: "Replies in your customers’ languages",
    text: "Answers in the languages your business supports, using your business information.",
  },
  {
    icon: Plug,
    title: "Connects to the systems you already use",
    text: "Connects to your CRM, calendar and other tools to find information and complete tasks.",
  },
]
const supporting = [
  {
    icon: BookOpen,
    title: "Answers from your business knowledge",
    text: "Uses your approved documents, FAQs and policies to answer questions.",
  },
  {
    icon: Workflow,
    title: "Turns conversations into action",
    text: "Captures enquiries, updates records and books appointments through agreed workflows.",
  },
  {
    icon: UserRoundCheck,
    title: "Knows when to involve your team",
    text: "Asks for approval when needed and hands complex issues to your team with context.",
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
              Built for real conversations.
              <br />
              <span className="heading-accent">Connected to real work.</span>
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
          <h3>More than a helpful reply.</h3>
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
