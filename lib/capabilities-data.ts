import type { StaticImageData } from "next/image"
import answersGroundedInYourBusiness from "@/assets/images/answers-grounded-in-your-business.png"
import fromRequestToScheduledVisit from "@/assets/images/from-request-to-scheduled-visit.png"
import invoicesProcessedBeforeFinanceTouchesThem from "@/assets/images/invoices-processed-before-finance-touches-them.png"
import supportThatCanActuallyResolveIssues from "@/assets/images/support-that-can-actually-resolve-issues.png"

export type Capability = {
  id: string
  title: string
  description: string
  image: {
    src: StaticImageData
    alt: string
  }
}

export const capabilitiesData: Capability[] = [
  {
    id: "d11sj9db",
    title: "Answers Grounded in Your Business Data",
    description:
      "Employees ask questions in the tools they already use. AI searches approved company sources, finds the relevant policies and procedures, and returns a clear answer with the evidence behind it.",
    image: {
      src: answersGroundedInYourBusiness,
      alt: "Answers Grounded in Your Business Data",
    },
  },
  {
    id: "k39sd8fj",
    title: "Invoices Handled Before Finance Review",
    description:
      "Incoming invoices are read, checked for calculation errors, duplicates and purchase-order mismatches, then recorded and routed automatically. Finance steps in only when the system detects an exception.",
    image: {
      src: invoicesProcessedBeforeFinanceTouchesThem,
      alt: "Invoices Handled Before Finance Review",
    },
  },
  {
    id: "p82kd9la",
    title: "From Request to Scheduled Customer Visit",
    description:
      "AI turns a customer request into a booked service visit by matching the job with the right technician, checking availability, reserving the slot, and updating every connected system.",
    image: {
      src: fromRequestToScheduledVisit,
      alt: "From Request to Scheduled Customer Visit",
    },
  },
  {
    id: "x91mz4qw",
    title: "Support That Actually Resolves Issues",
    description:
      "AI verifies the customer, checks orders, tracking, policies and stock, then presents the right resolution and completes the follow-up across support systems — turning a conversation into a finished outcome.",
    image: {
      src: supportThatCanActuallyResolveIssues,
      alt: "Support That Actually Resolves Issues",
    },
  },
]
