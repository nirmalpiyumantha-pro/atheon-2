import { Index as HeroSection } from "@/components/home/hero-section"
import { Index as OurCapabilitiesSection } from "@/components/home/our-capabilities-section"
import { Index as PerformanceFiguresSection } from "@/components/home/performance-figures"
import {
  CustomAgents,
  Plans,
  PracticalFaqs,
  ProjectEnquiry,
} from "@/components/home/story-sections"
import Footer from "@/components/footer"
import { SecuritySection } from "@/components/home/security-section"
import { IntegrationsRibbon } from "@/components/home/integrations-ribbon"
import { ScrollMotion } from "@/components/home/scroll-motion"
export default function Home() {
  return (
    <main id="main-content">
      <ScrollMotion />
      <HeroSection />
      <PerformanceFiguresSection />
      <IntegrationsRibbon />
      <OurCapabilitiesSection />
      <CustomAgents />
      <SecuritySection />
      <Plans />
      <PracticalFaqs />
      <ProjectEnquiry />
      <Footer onHome />
    </main>
  )
}
