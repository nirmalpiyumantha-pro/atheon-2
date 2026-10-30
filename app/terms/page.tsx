import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Website Terms",
  description:
    "Terms for using the Atheon website and requesting information about our AI agents and automation services.",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Website terms"
      intro="These terms explain how to use the Atheon website and what to expect when you enquire about our services."
    >
      <section>
        <h2>About Atheon</h2>
        <p>
          Atheon is an AI agents and business automation business based in Sri
          Lanka. Contact us at{" "}
          <a href="mailto:contact@atheonworks.com">contact@atheonworks.com</a>{" "}
          with questions about this website or our services.
        </p>
      </section>
      <section>
        <h2>Information and examples</h2>
        <p>
          This website introduces our services. Workflow illustrations and
          conversations show example scenarios. They do not guarantee that every
          integration, language, outcome or feature will be available for every
          project. We confirm feasibility, scope, access requirements and
          expected outcomes with you before work begins.
        </p>
        <p>
          Information may change as our services and third-party platforms
          develop. Please confirm any detail you intend to rely on directly with
          us.
        </p>
      </section>
      <section>
        <h2>Enquiries, demos and service agreements</h2>
        <p>
          Sending an enquiry or requesting a demo does not create a paid
          subscription, confirm an appointment or commit either party to a
          project. A demo time is arranged separately by email.
        </p>
        <p>
          Paid work is governed by a separate written agreement. That agreement
          defines deliverables, fees, payment terms, deployment, data handling,
          support, ownership, cancellation and the responsibilities of each
          party. These website terms do not replace or amend an existing service
          agreement.
        </p>
      </section>
      <section>
        <h2>Responsible use</h2>
        <p>
          Use the website lawfully. Do not attempt unauthorised access,
          introduce malicious code, disrupt the site or send unlawful material.
          Share only information you are entitled to provide, and do not submit
          credentials or sensitive third-party records through the enquiry form.
        </p>
      </section>
      <section>
        <h2>Content and third-party services</h2>
        <p>
          Atheon’s branding and original website materials belong to Atheon or
          their respective rights holders. You may view and share links to the
          site. Obtain permission before reproducing our materials commercially
          or implying our endorsement.
        </p>
        <p>
          Third-party names and logos identify example tools and remain the
          property of their owners. Their appearance does not imply a
          partnership or endorsement. External websites and the YouTube player
          operate under their providers’ own terms and privacy policies.
        </p>
      </section>
      <section>
        <h2>Availability and responsibility</h2>
        <p>
          We aim to keep the website useful and available, but cannot promise
          uninterrupted access or that all information will always be
          error-free. The website provides general service information, not
          professional advice for a particular decision. Nothing in these terms
          excludes a right or responsibility that cannot lawfully be excluded.
        </p>
      </section>
      <section>
        <h2>Privacy, applicable law and changes</h2>
        <p>
          Our <a href="/privacy">privacy policy</a> explains the handling of
          website visits and enquiries. These website terms are governed by the
          laws of Sri Lanka, subject to any mandatory rights that apply to you.
          Please contact us first so we can try to resolve a concern.
        </p>
        <p>
          We may update these website terms; the date above shows the latest
          revision. Changes to a signed service agreement follow that
          agreement’s own process.
        </p>
      </section>
    </LegalPage>
  )
}
