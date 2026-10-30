import {
  AudioLinesIcon,
  BookOpenIcon,
  CircleCheckBigIcon,
  EyeIcon,
  GlobeIcon,
  LucideIcon,
  MessageSquareMoreIcon,
} from "lucide-react"

export type AgentSkill = {
  id: string
  title: string
  description: string
  icons: LucideIcon[]
}

export const agentSkillData: AgentSkill[] = [
  {
    id: "k47md8sx",
    title: "Talk to Customers",
    description:
      "Your agent understands everyday conversations - even when messages are vague, informal, or written differently - and responds using information approved by your business.",
    icons: [MessageSquareMoreIcon],
  },
  {
    id: "p82nf5qd",
    title: "Know Your Business",
    description:
      "Policies, catalogs, manuals, FAQs, PDFs - Your agent can search across your company knowledge and bring the right information into the conversation when it matters.",
    icons: [BookOpenIcon],
  },
  {
    id: "x39vb7la",
    title: "Get Work Done",
    description:
      "Your agent does not stop at answering questions. It can update CRM records, book appointments, send follow-ups, capture information, assign leads, and trigger approved workflows.",
    icons: [CircleCheckBigIcon],
  },
  {
    id: "m64qk2we",
    title: "See & Listen",
    description:
      "Send a photo, screenshot, scanned document, or voice message. Your agent can understand what it receives, extract useful information, and continue the interaction naturally.",
    icons: [EyeIcon, AudioLinesIcon],
  },
  {
    id: "t91hz6rc",
    title: "Speak Their Language",
    description:
      "Customers do not have to adapt to Your agent. Your agent can communicate across multiple languages and continue performing connected tasks throughout the conversation.",
    icons: [GlobeIcon],
  },
]
