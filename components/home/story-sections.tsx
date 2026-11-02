import {
  ClipboardCheck,
  MessageSquare,
  Workflow,
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
    <div className={s.intro} data-reveal>
      <span className="section-tag">{tag}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
export { CustomAgents } from "./custom-agents"
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
            {faqsData.map((faq, index) => (
              <div key={faq.id} data-reveal data-reveal-delay={index % 3}>
                <Faq title={faq.title} description={faq.description} />
              </div>
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
        <div className={s.enquiryForm} data-reveal data-reveal-delay="1">
          <ContactForm />
        </div>
      </div>
    </Container>
  )
}

export { Plans } from "./plans"
