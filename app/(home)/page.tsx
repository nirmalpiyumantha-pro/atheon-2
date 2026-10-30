import { Index as HeroSection } from "@/components/home/hero-section"
import { Index as OurCapabilitiesSection } from "@/components/home/our-capabilities-section"
import { Index as PerformanceFiguresSection } from "@/components/home/performance-figures"
import {
  CustomAgents,
  Plans,
  WhyAtheon,
  WorkingTogether,
  PracticalFaqs,
  ProjectEnquiry,
} from "@/components/home/story-sections"
import Footer from "@/components/footer"
import { SecuritySection } from "@/components/home/security-section"
export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <PerformanceFiguresSection />
      <OurCapabilitiesSection />
      <CustomAgents />
      <WhyAtheon />
      <SecuritySection />
      <WorkingTogether />
      <Plans />
      <PracticalFaqs />
      <ProjectEnquiry />
      <Footer onHome />
    </main>
  )
}
