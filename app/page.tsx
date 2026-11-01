import dynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"

// Above-the-fold: load eagerly
// Everything below the fold: lazy-load with next/dynamic (code-split + deferred JS)
const AboutSection = dynamic(() => import("@/components/about-section").then(m => ({ default: m.AboutSection })))
const AmenitiesSection = dynamic(() => import("@/components/amenities-section").then(m => ({ default: m.AmenitiesSection })))
const ProjectsSection = dynamic(() => import("@/components/projects-section").then(m => ({ default: m.ProjectsSection })))
const Locations = dynamic(() => import("@/components/locations").then(m => ({ default: m.LocationsSection })))
const WhyChooseUsSection = dynamic(() => import("@/components/why-choose-us-section").then(m => ({ default: m.WhyChooseUsSection })))
const OtherProjectsSection = dynamic(() => import("@/components/other-projects-section").then(m => ({ default: m.OtherProjectsSection })))
const GallerySection = dynamic(() => import("@/components/gallery-section").then(m => ({ default: m.GallerySection })))
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(m => ({ default: m.TestimonialsSection })))
const FAQSection = dynamic(() => import("@/components/faq-section").then(m => ({ default: m.FAQSection })))
const ContactSection = dynamic(() => import("@/components/contact-section"))
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })))
const CallButton = dynamic(() => import("@/components/call-button"))
const WhatsappButton = dynamic(() => import("@/components/whatsapp-button"))
const MobileAppBar = dynamic(() => import("@/components/mobile-app-bar").then(m => ({ default: m.MobileAppBar })))

export default function Home() {
  return (
    <main className="pb-16 md:pb-0 bg-[#ffffff] min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <AmenitiesSection />
      <Locations />
      <WhyChooseUsSection />
      <OtherProjectsSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <CallButton />
      <WhatsappButton />
      <MobileAppBar />
    </main>
  )
}