import { KeyRound, Server, FileCheck2 } from "lucide-react"
import Container from "@/components/container"
import s from "./security-section.module.css"

const details = [
  {
    icon: KeyRound,
    title: "Access with a purpose",
    text: "We agree which data and systems the workflow needs, who can access them and which actions require your team’s approval.",
  },
  {
    icon: Server,
    title: "A clear view of the setup",
    text: "We identify the hosting environment and external services involved. Client-owned hosting can still use third-party AI or integration providers.",
  },
  {
    icon: FileCheck2,
    title: "Responsibilities defined",
    text: "Access controls, logs, retention, deletion and support responsibilities are agreed for your deployment before it goes live.",
  },
]

export function SecuritySection() {
  return (
    <Container id="security" className={s.section}>
      <header className={s.heading} data-reveal>
        <span className="section-tag">Security & data handling</span>
        <h2>Clear boundaries for your data.</h2>
        <p>
          Your workflow should have a clear data path. We work through access,
          hosting and handling requirements with you before launch.
        </p>
      </header>
      <div className={s.details} data-reveal>
        {details.map(({ icon: Icon, title, text }) => (
          <article key={title}>
            <Icon size={25} strokeWidth={1.6} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <a className={s.link} href="/privacy">
        Read our privacy policy
      </a>
    </Container>
  )
}
