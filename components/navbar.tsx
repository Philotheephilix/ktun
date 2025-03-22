"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-[#F3F3F3]">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#191A23]">Positivus</span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/about" className="text-[#191A23] hover:text-[#B9FF66] transition-colors">
            About us
          </Link>
          <Link href="/services" className="text-[#191A23] hover:text-[#B9FF66] transition-colors">
            Services
          </Link>
          <Link href="/use-cases" className="text-[#191A23] hover:text-[#B9FF66] transition-colors">
            Use Cases
          </Link>
          <Link href="/pricing" className="text-[#191A23] hover:text-[#B9FF66] transition-colors">
            Pricing
          </Link>
          <Link href="/blog" className="text-[#191A23] hover:text-[#B9FF66] transition-colors">
            Blog
          </Link>
          <Button
            variant="outline"
            className="border-[#191A23] text-[#191A23] hover:bg-[#B9FF66] hover:text-[#191A23] hover:border-[#B9FF66]"
          >
            Request a quote
          </Button>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-white z-50 border-b border-[#F3F3F3] md:hidden">
            <div className="flex flex-col p-4 space-y-4">
              <Link href="/about" className="text-[#191A23] hover:text-[#B9FF66] transition-colors">
                About us
              </Link>
              <Link href="/services" className="text-[#191A23] hover:text-[#B9FF66] transition-colors">
                Services
              </Link>
              <Link href="/use-cases" className="text-[#191A23] hover:text-[#B9FF66] transition-colors">
                Use Cases
              </Link>
              <Link href="/pricing" className="text-[#191A23] hover:text-[#B9FF66] transition-colors">
                Pricing
              </Link>
              <Link href="/blog" className="text-[#191A23] hover:text-[#B9FF66] transition-colors">
                Blog
              </Link>
              <Button
                variant="outline"
                className="border-[#191A23] text-[#191A23] hover:bg-[#B9FF66] hover:text-[#191A23] hover:border-[#B9FF66]"
              >
                Request a quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

