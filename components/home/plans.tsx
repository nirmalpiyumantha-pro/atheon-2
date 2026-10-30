import { Cloud, Server, ArrowUpRight } from "lucide-react"
import Container from "@/components/container"
import { EnquiryLink } from "@/components/enquiry-link"
import s from "./plans.module.css"
const plans = [
  {
    key: "managed",
    icon: Cloud,
    label: "Managed subscription",
    title: "We run it for you.",
    description:
      "For teams that want their automation managed by Atheon, without looking after the infrastructure.",
    rows: [
      ["Hosting", "Atheon-managed infrastructure"],
      ["Setup", "Built and configured for your process"],
      ["Maintenance", "Ongoing care through your subscription"],
      ["Support", "Coverage agreed in your plan"],
    ],
    cta: "Discuss a managed plan",
  },
  {
    key: "infrastructure",
    icon: Server,
    label: "Client-owned infrastructure",
    title: "Run it in your environment.",
    description:
      "For teams that want deployment on their own server or VPS, with clear handover and support arrangements.",
    rows: [
      ["Hosting", "Your own server or private VPS"],
      ["Setup", "Deployment, configuration and handover"],
      ["Maintenance", "Responsibilities agreed with your team"],
      ["Support", "An optional, separately agreed arrangement"],
    ],
    cta: "Discuss your deployment",
  },
] as const
export function Plans() {
  return (
    <Container id="delivery-options">
      <header className={s.heading}>
        <span className="section-tag">Plans & deployment</span>
        <h2>
          Your automation.
          <br />
          Two ways to run it.
        </h2>
        <p>
          Choose who manages the environment. We’ll shape the build, support and
          running costs around your business.
        </p>
      </header>
      <div className={s.grid}>
        {plans.map(
          ({ key, icon: Icon, label, title, description, rows, cta }) => (
            <article className={s.plan} key={key}>
              <div className={s.label}>
                <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                {label}
              </div>
              <h3>{title}</h3>
              <p className={s.description}>{description}</p>
              <dl>
                {rows.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <EnquiryLink interest={key} className="button">
                {cta}
                <ArrowUpRight size={17} aria-hidden="true" />
              </EnquiryLink>
            </article>
          ),
        )}
      </div>
      <div className={s.foot}>
        <div>
          <h3>Not sure which fits?</h3>
          <p>Tell us about your setup. We’ll help you choose.</p>
        </div>
        <EnquiryLink interest="general" className="button button-outline">
          Help me choose
          <ArrowUpRight size={17} aria-hidden="true" />
        </EnquiryLink>
      </div>
      <p className={s.note}>
        Pricing is scoped to your project. Development, hosting, third-party
        subscriptions, usage costs and support responsibilities are clarified in
        your proposal.
      </p>
    </Container>
  )
}
