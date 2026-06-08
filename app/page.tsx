import dynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"

// Above-the-fold: load eagerly
// Everything below the fold: lazy-load with next/dynamic (code-split + deferred JS)
const AboutSection = dynamic(() => import("@/components/about-section").then(m => ({ default: m.AboutSection })))
const AmenitiesSection = dynamic(() => import("@/components/amenities-section").then(m => ({ default: m.AmenitiesSection })))
const ProjectsSection = dynamic(() => import("@/components/projects-section").then(m => ({ default: m.ProjectsSection })))
const GallerySection = dynamic(() => import("@/components/gallery-section").then(m => ({ default: m.GallerySection })))
const WhyChooseUsSection = dynamic(() => import("@/components/why-choose-us-section").then(m => ({ default: m.WhyChooseUsSection })))
const UserGuideSection = dynamic(() => import("@/components/user-guide-section").then(m => ({ default: m.UserGuideSection })))
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(m => ({ default: m.TestimonialsSection })))
const NewsArticles = dynamic(() => import("@/components/news-articals"))
const FAQSection = dynamic(() => import("@/components/faq-section").then(m => ({ default: m.FAQSection })))
const ContactSection = dynamic(() => import("@/components/contact-section"))
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })))
const CallButton = dynamic(() => import("@/components/call-button"))
const WhatsappButton = dynamic(() => import("@/components/whatsapp-button"))
const ContactPopup = dynamic(() => import("@/components/contact-popup"))
const Locations = dynamic(() => import("@/components/locations").then(m => ({ default: m.LocationsSection })))
export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <ContactSection sectionId="contact-intro" />
      <AboutSection />
      <AmenitiesSection />
      <ProjectsSection />
      <GallerySection />
      <WhyChooseUsSection />
      <Locations />
      <UserGuideSection />
      <TestimonialsSection />
      <NewsArticles />
      <ContactSection />
      <FAQSection />
      <CallButton />
      <WhatsappButton />
      <ContactPopup />
      <Footer />
    </main>
  )
}