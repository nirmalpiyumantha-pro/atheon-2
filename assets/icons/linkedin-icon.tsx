import { cn } from "@/lib/utils"
import { CSSProperties } from "react"

export default function LinkedinIcon(props: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg
      className={cn(
        "lucide lucide-linkedin-icon lucide-linkedin",
        props.className,
      )}
      style={props.style}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Linkedin</title>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
