import type { LucideIcon } from "lucide-react"

type StepProps = {
  title: string
  description: string
  icon: LucideIcon
}

export function Industry({ title, description, icon: Icon }: StepProps) {
  return (
    <div className="industry-card">
      <Icon className="size-8 md:size-10 text-blue-500" strokeWidth={1} />

      <h3 className="text-lg font-semibold text-gray-900 text-center mt-3">
        {title}
      </h3>
      <p className="text-sm text-gray-700 rounded-2xl text-center max-w-64 mt-1">
        {description}
      </p>
    </div>
  )
}
