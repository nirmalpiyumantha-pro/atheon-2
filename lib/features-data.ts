import type { StaticImageData } from "next/image"

import lowerStaffingCost from "@/assets/images/lower-staffing-cost.png"
import fasterDailyOperations from "@/assets/images/faster-daily-operations.png"
import lessManualWork from "@/assets/images/less-manual-work.png"
import fewerMistakes from "@/assets/images/fewer-mistakes.png"

export type Feature = {
  id: string
  title: string
  description: string
  image: {
    src: StaticImageData
    alt: string
  }
}

export const featuresData: Feature[] = [
  {
    id: "d11sj9db",
    title: "Lower Staffing Costs",
    description:
      "Handle growing workloads without growing your team at the same pace. Automate routine operations and get more capacity from the people you already have.",
    image: {
      src: lowerStaffingCost,
      alt: "Lower Staffing Costs",
    },
  },
  {
    id: "k39sd8fj",
    title: "Faster Daily Operations",
    description:
      "No waiting for someone to move the process forward. Information flows between systems, actions happen instantly, and work keeps moving around the clock.",
    image: {
      src: fasterDailyOperations,
      alt: "Faster Daily Operations",
    },
  },
  {
    id: "p82kd9la",
    title: "Less Manual Work",
    description:
      "Repetitive tasks shouldn’t consume your team’s day. Move data, send follow-ups, update systems, generate reports, and handle actions automatically.",
    image: {
      src: lessManualWork,
      alt: "Less Manual Work",
    },
  },
  {
    id: "x91mz4qw",
    title: "Fewer Mistakes",
    description:
      "Missed follow-ups, duplicate or incorrect records, and forgotten steps become far less common when workflows follow the same process every single time.",
    image: {
      src: fewerMistakes,
      alt: "Fewer Mistakes",
    },
  },
]
