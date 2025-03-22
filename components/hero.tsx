import { Button } from "@/components/ui/button"
import { OrbitalGraphic } from "@/components/orbital-graphic"

export function Hero() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#191A23] mb-6">
              Navigating the digital landscape for success
            </h1>
            <p className="text-lg text-[#191A23]/80 mb-8">
              Our digital marketing agency helps businesses grow and succeed online through a range of services,
              including SEO, PPC, social media marketing, and content creation.
            </p>
            <Button className="bg-[#191A23] text-white hover:bg-[#B9FF66] hover:text-[#191A23] transition-colors">
              Book a consultation
            </Button>
          </div>
          <div className="relative">
            <OrbitalGraphic />
          </div>
        </div>
      </div>
    </section>
  )
}

