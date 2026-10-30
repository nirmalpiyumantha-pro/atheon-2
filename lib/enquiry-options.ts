export const enquiryOptions = [
  { value: "general", label: "Help me choose / general enquiry" },
  { value: "demo", label: "Book a demo" },
  { value: "managed", label: "Atheon-managed subscription" },
  { value: "infrastructure", label: "Deployment on my infrastructure" },
  { value: "agent", label: "Custom AI agent" },
  { value: "knowledge", label: "Company knowledge & search" },
  { value: "invoices", label: "Invoice processing" },
  { value: "scheduling", label: "Service scheduling" },
  { value: "support", label: "Customer support automation" },
] as const
export type EnquiryInterest = (typeof enquiryOptions)[number]["value"]
export function validInterest(value: string | null): EnquiryInterest {
  return (
    enquiryOptions.find((option) => option.value === value)?.value ?? "general"
  )
}
