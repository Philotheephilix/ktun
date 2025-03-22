import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#191A23] text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Positivus</h3>
            <p className="text-white/60 mb-6">Navigating the digital landscape for success</p>
            <div className="flex gap-4">
              <Link href="#" className="text-white hover:text-[#B9FF66] transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-[#B9FF66] transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-[#B9FF66] transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-[#B9FF66] transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/60 hover:text-[#B9FF66] transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/60 hover:text-[#B9FF66] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="text-white/60 hover:text-[#B9FF66] transition-colors">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/60 hover:text-[#B9FF66] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-[#B9FF66] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/seo" className="text-white/60 hover:text-[#B9FF66] transition-colors">
                  Search Engine Optimization
                </Link>
              </li>
              <li>
                <Link href="/services/ppc" className="text-white/60 hover:text-[#B9FF66] transition-colors">
                  Pay-per-click Advertising
                </Link>
              </li>
              <li>
                <Link href="/services/social" className="text-white/60 hover:text-[#B9FF66] transition-colors">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/email" className="text-white/60 hover:text-[#B9FF66] transition-colors">
                  Email Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/content" className="text-white/60 hover:text-[#B9FF66] transition-colors">
                  Content Creation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-white/60">123 Main Street, New York, NY 10001</li>
              <li>
                <Link href="mailto:info@positivus.com" className="text-white/60 hover:text-[#B9FF66] transition-colors">
                  info@positivus.com
                </Link>
              </li>
              <li>
                <Link href="tel:+12125551234" className="text-white/60 hover:text-[#B9FF66] transition-colors">
                  +1 (212) 555-1234
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">© 2025 Positivus. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-white/60 text-sm hover:text-[#B9FF66] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 text-sm hover:text-[#B9FF66] transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-white/60 text-sm hover:text-[#B9FF66] transition-colors">
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

