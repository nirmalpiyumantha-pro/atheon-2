import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type Props = {
  className?: string
  id?: string
  children: ReactNode
}

export default function Container({ className, children, id }: Props) {
  return (
    <section id={id} className={cn("site-section mx-auto w-full", className)}>
      {children}
    </section>
  )
}
