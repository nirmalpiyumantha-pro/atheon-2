import { EnquiryLink } from "@/components/enquiry-link"
import Container from "@/components/container"
import { ArrowUpRight } from "lucide-react"
import { BookingScene } from "./booking-scene"
import { PromoPlayer } from "./promo-player"

export function Index() {
  return (
    <div className="hero-background">
      <Container id="home" className="hero-section">
        <div className="hero-copy">
          <span className="hero-eyebrow">AI agents & business automation</span>
          <h1>
            Upgrade your Business with{" "}
            <span className="heading-accent">Intelligent Automations</span>
          </h1>
          <p>
            Atheon designs, builds and maintains custom AI agents and business
            automations. We connect your tools and shape each system around your
            processes.
          </p>
          <div className="hero-actions">
            <EnquiryLink className="button" interest="demo">
              Book a demo <ArrowUpRight size={17} aria-hidden="true" />
            </EnquiryLink>
            <PromoPlayer />
          </div>
          <p className="hero-service-note">
            Managed by Atheon or deployed on your infrastructure.
          </p>
        </div>
        <BookingScene />
      </Container>
    </div>
  )
}
