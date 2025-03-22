import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Search, MousePointerClick, Share2, Mail, BarChart2, FileText } from "lucide-react"

export function Services() {
  const services = [
    {
      title: "Search engine optimization",
      icon: Search,
      description: "Improve your website's visibility in search results to drive more organic traffic.",
      bgColor: "bg-[#F3F3F3]",
      textColor: "text-[#191A23]",
    },
    {
      title: "Pay-per-click advertising",
      icon: MousePointerClick,
      description: "Target potential customers with paid ads and only pay when they click.",
      bgColor: "bg-[#B9FF66]",
      textColor: "text-[#191A23]",
    },
    {
      title: "Social Media Marketing",
      icon: Share2,
      description: "Build your brand and engage with customers on popular social platforms.",
      bgColor: "bg-[#191A23]",
      textColor: "text-white",
    },
    {
      title: "Email Marketing",
      icon: Mail,
      description: "Connect directly with your audience through targeted email campaigns.",
      bgColor: "bg-[#B9FF66]",
      textColor: "text-[#191A23]",
    },
    {
      title: "Content Creation",
      icon: FileText,
      description: "Create valuable content that attracts and engages your target audience.",
      bgColor: "bg-[#B9FF66]",
      textColor: "text-[#191A23]",
    },
    {
      title: "Analytics and Tracking",
      icon: BarChart2,
      description: "Measure performance and gain insights to optimize your marketing efforts.",
      bgColor: "bg-[#191A23]",
      textColor: "text-white",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <div className="inline-block px-4 py-2 bg-[#B9FF66] rounded-full mb-4">
            <h2 className="text-[#191A23] font-bold">Services</h2>
          </div>
          <p className="text-[#191A23]/80 max-w-2xl">
            At our digital marketing agency, we offer a range of services to help businesses grow and succeed online.
            These services include:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className={`border-none ${service.bgColor} overflow-hidden`}>
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <service.icon className={`h-10 w-10 ${service.textColor}`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${service.textColor}`}>{service.title}</h3>
                  <p className={`${service.textColor} opacity-80 mb-6`}>{service.description}</p>
                  <div className="mt-auto">
                    <Button
                      variant="ghost"
                      className={`${service.textColor} p-0 hover:bg-transparent hover:opacity-70`}
                    >
                      <span className="flex items-center">
                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

