import { Plus } from "lucide-react"
type Props = { title: string; description: string }
export default function Faq({ title, description }: Props) {
  return (
    <details className="faq-item">
      <summary>
        {title}
        <Plus size={20} aria-hidden="true" />
      </summary>
      <p>{description}</p>
    </details>
  )
}
