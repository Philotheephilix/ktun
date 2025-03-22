import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ClientLogos } from "@/components/client-logos"
import { Services } from "@/components/services"
import { CaseStudies } from "@/components/case-studies"
import { TeamSection } from "@/components/team-section"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ClientLogos />
        <Services />
        <CaseStudies />
        <TeamSection />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

