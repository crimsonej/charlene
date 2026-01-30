"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#about", label: "About Us" },
  { href: "#categories", label: "Categories" },
  { href: "#mission", label: "Our Mission" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-6 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+995599584369" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4" />
              +995 599 58 43 69
            </a>
            <a href="mailto:info@afrogeohouse.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="w-4 h-4" />
              info@afrogeohouse.com
            </a>
          </div>
          <div className="text-primary-foreground/80">
            20 Ilia Chavchavadze Ave, Tbilisi, Georgia
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif text-xl font-bold">AG</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif text-xl font-semibold text-foreground leading-tight">
                African-Georgian House
              </h1>
              <p className="text-xs text-muted-foreground">Bridging Cultures</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get in Touch
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-border mt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="tel:+995599584369" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +995 599 58 43 69
                </a>
                <a href="mailto:info@afrogeohouse.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@afrogeohouse.com
                </a>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full mt-2">
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
