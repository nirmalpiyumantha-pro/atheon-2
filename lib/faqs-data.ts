export type Faq = { id: string; title: string; description: string }
export const faqsData: Faq[] = [
  {
    id: "data-handling",
    title: "How will our data be handled?",
    description:
      "Before launch, we agree which data the workflow uses, who can access it, where it is processed and which external providers are involved. Access controls, approval steps, retention, deletion and support responsibilities are defined for your setup. Deployment on your own infrastructure can still involve third-party AI or integration services; it does not automatically mean all data stays on your server. Our privacy policy explains how this website and business enquiries are handled.",
  },
  {
    id: "start",
    title: "I’m not sure what to automate. Can we start there?",
    description:
      "Yes. We start with your process, existing tools and the work you want to improve. Together we agree the scope, integrations, approval rules, costs and timeline, then build and test realistic scenarios with your team before launch.",
  },
  {
    id: "tools",
    title: "Can you work with our existing software?",
    description:
      "We assess the tools involved and how they can connect. Integration depends on the access, APIs and capabilities each platform provides. Any limitations and required subscriptions are discussed before the build.",
  },
  {
    id: "agents",
    title: "Do we need an AI agent for every automation?",
    description:
      "No. An AI agent is useful for work that needs to interpret a request or use business knowledge. Many processes can be handled by a workflow or integration without a conversational agent. We recommend a setup based on the task.",
  },
  {
    id: "control",
    title: "Can our team approve important actions?",
    description:
      "Yes. Approval steps and human handoffs can be included in the agreed workflow. We define which actions can run automatically and which should be reviewed by your team.",
  },
  {
    id: "time",
    title: "How long does a project take?",
    description:
      "Most automation projects take 1 to 3 weeks. More complex integrations or larger workflows may take longer. Your project’s expected timeline is confirmed once the scope is agreed.",
  },
  {
    id: "cost",
    title: "How are pricing and running costs handled?",
    description:
      "Pricing depends on the project scope and delivery option. We clarify development, hosting, third-party platform and usage costs in the proposal, including the ongoing subscription or support arrangement that applies.",
  },
  {
    id: "launch",
    title: "What happens after launch?",
    description:
      "We show your team how the system works. Managed subscriptions include the maintenance and support defined in your agreement. For deployment on your own infrastructure, we agree on handover, maintenance and support responsibilities separately.",
  },
]
