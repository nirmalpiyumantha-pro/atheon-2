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
    text: "Typos, shorthand and unfinished thoughts are part of real conversations. Your agent follows the intent and asks a useful follow-up when something is unclear.",
    example: "“hey can u move my booking? fri afternoon works”",
  },
  {
    icon: AudioLines,
    title: "Works with images and voice",
    text: "A customer can send a photo, screenshot or voice note. Your agent extracts relevant details and uses them to continue the conversation.",
    example: "A product photo. A receipt. A spoken request.",
  },
  {
    icon: Languages,
    title: "Replies in your customers’ languages",
    text: "Help people ask questions and get answers in the languages your business supports, with responses grounded in the same business information.",
    example: "One service experience, across languages.",
  },
  {
    icon: Plug,
    title: "Connects to the systems you already use",
    text: "Bring your CRM, calendar, email and other business tools into the conversation, so the agent can find information and take the next approved step.",
    example: "Your existing tools, working together.",
  },
]
const supporting = [
  {
    icon: BookOpen,
    title: "Answers from your business knowledge",
    text: "Use approved FAQs, documents, policies and product information to give relevant answers, with source references where needed.",
  },
  {
    icon: Workflow,
    title: "Turns conversations into action",
    text: "Capture an enquiry, update a customer record, book a time or trigger a follow-up through the workflows you define.",
  },
  {
    icon: UserRoundCheck,
    title: "Knows when to involve your team",
    text: "Request approval for sensitive actions and pass the conversation, with its context, to a person when a handoff is needed.",
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
              People don’t always type perfect questions. They send a quick
              message, a photo or a voice note. Your Atheon agent brings that
              conversation together with your business knowledge and tools.
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
          {highlights.map(({ icon: Icon, title, text, example }) => (
            <article key={title}>
              <span className={s.icon}>
                <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className={s.example}>{example}</span>
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
          We agree supported languages, input types, integrations and approval
          rules during setup, then test them with your business scenarios.
        </p>
      </Container>
    </div>
  )
}
