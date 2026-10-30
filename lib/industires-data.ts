import type { LucideIcon } from "lucide-react"
import {
  BuildingIcon,
  GraduationCapIcon,
  HospitalIcon,
  MapPinHouseIcon,
  PlaneTakeoffIcon,
  ShieldIcon,
  ShoppingCartIcon,
  WarehouseIcon,
} from "lucide-react"

export type Industry = {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export const industriesData: Industry[] = [
  {
    id: "d11sj9db",
    title: "E-commerce & Retail",
    description: "Product questions, order updates and stock checks.",
    icon: ShoppingCartIcon,
  },
  {
    id: "k39sd8fj",
    title: "Clinics & Wellness",
    description: "Appointments, reminders, FAQs and intake support.",
    icon: HospitalIcon,
  },
  {
    id: "p82kd9la",
    title: "Agencies",
    description: "Onboarding, reports, lead routing and task creation.",
    icon: BuildingIcon,
  },
  {
    id: "x91mz4qw",
    title: "Professional Services",
    description: "Client intake, processing and follow-up workflows.",
    icon: ShieldIcon,
  },
  {
    id: "b47nv2er",
    title: "Real Estate",
    description: "Lead capture, property matching and viewing requests.",
    icon: MapPinHouseIcon,
  },
  {
    id: "q63hf8yt",
    title: "Education & Training",
    description: "Course guidance, enrollment and document collection.",
    icon: GraduationCapIcon,
  },
  {
    id: "u29dk5zs",
    title: "Logistics & Operations",
    description: "Status updates, routing and delivery notifications.",
    icon: WarehouseIcon,
  },
  {
    id: "m58pl3xc",
    title: "Hospitality & Travel",
    description: "Reservations, guest support and service requests.",
    icon: PlaneTakeoffIcon,
  },
]
