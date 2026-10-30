import { LucideIcon } from "lucide-react"

type Props = {
  title: string
  description: string
  icons: LucideIcon[]
}

export function AgentSkill({ title, description, icons }: Props) {
  return (
    <div className="agent-skill">
      <div className="flex items-center gap-4">
        {icons.map((Icon, index) => (
          <Icon
            key={index}
            className="text-blue-500 size-8"
            strokeWidth={1.4}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  )
}
