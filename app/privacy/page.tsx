import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Atheon handles website visits, business enquiries and information shared when you contact us.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="This policy explains how information is handled when you browse this website, play our video or contact Atheon about a project."
    >
      <section>
        <h2>Who this policy covers</h2>
        <p>
          Atheon is an AI agents and business automation business based in Sri
          Lanka. For questions about this policy or your information, email{" "}
          <a href="mailto:contact@atheonworks.com">contact@atheonworks.com</a>.
        </p>
        <p>
          This policy covers our website and business enquiries. Data processed
          inside a client’s automation is addressed separately in the project
          agreement and any applicable data-processing terms.
        </p>
      </section>
      <section>
        <h2>Information you choose to share</h2>
        <p>
          The enquiry form asks for your name, email address, area of interest
          and a short description of your project. It prepares an email draft in
          your browser. Preparing the draft does not send an enquiry or save it
          to a form database on this website. The message is sent only when you
          choose to send it through your email app.
        </p>
        <p>
          When you send us an email, we receive the message and the contact
          information included with it. We use these details to respond, discuss
          your requirements, prepare a proposal and manage the resulting
          business correspondence. Please share only what is needed for the
          discussion; do not include passwords, access tokens or sensitive
          customer records.
        </p>
      </section>
      <section>
        <h2>Website requests and service providers</h2>
        <p>
          The website hosting provider may process technical request data such
          as your IP address, browser information, requested pages and access
          times to deliver and protect the site. Email providers process
          correspondence when you send an enquiry. These providers may process
          information outside Sri Lanka.
        </p>
        <p>
          We have not added advertising trackers or a newsletter sign-up to this
          website. Hosting, security and third-party services can have their own
          data practices.
        </p>
      </section>
      <section>
        <h2>Video playback and external links</h2>
        <p>
          The embedded YouTube player loads only after you select “See Atheon in
          action.” It uses YouTube’s privacy-enhanced embed domain. Playing the
          video connects your browser to YouTube, which can process technical
          and playback information and use browser storage under its own
          policies. Privacy-enhanced mode does not mean that no information is
          processed.
        </p>
        <p>
          Read the{" "}
          <a href="https://policies.google.com/privacy">
            Google privacy policy
          </a>{" "}
          for YouTube’s practices. Following our LinkedIn link takes you to
          LinkedIn, where its own privacy policy applies.
        </p>
      </section>
      <section>
        <h2>Handling and keeping correspondence</h2>
        <p>
          Business correspondence is used for the enquiry and any resulting
          work. Information may be handled by the people and service providers
          involved in that work, or disclosed where required by applicable law.
          The relevant purpose, contractual responsibilities and recordkeeping
          obligations determine how long it needs to be kept.
        </p>
        <p>
          Ask us about the handling of a specific message or request its
          deletion using the email address above. If information must be
          retained for an ongoing project, a dispute or a legal obligation, we
          will explain the relevant limitation. No website, email service or
          storage system can guarantee absolute security.
        </p>
      </section>
      <section>
        <h2>Your choices and requests</h2>
        <p>
          You can browse without sending an enquiry or loading the video. You
          can contact us to ask what information we hold about your enquiry,
          correct it, request deletion or raise a privacy concern. We may need
          to verify your identity before acting on a request. Any statutory
          rights and remedies depend on the law applicable to your request and
          the provisions in force at that time.
        </p>
        <p>
          For information about Sri Lanka’s data-protection framework, visit the{" "}
          <a href="https://www.dpa.gov.lk/">Data Protection Authority</a>.
        </p>
      </section>
      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy when the website or our handling practices
          change. The date at the top identifies the latest revision.
        </p>
      </section>
    </LegalPage>
  )
}
