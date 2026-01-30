import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const categories = [
  "African Safaris",
  "African Handicrafts",
  "African Artists",
  "African Coffee",
  "Georgian Crafts",
  "Georgian Tourism",
]

const quickLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Categories", href: "#categories" },
  { label: "Our Mission", href: "#mission" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-serif text-xl font-bold">AG</span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-background leading-tight">
                  African-Georgian House
                </h3>
                <p className="text-xs text-background/60">Bridging Cultures</p>
              </div>
            </Link>
            <p className="mt-4 text-background/70 text-sm leading-relaxed">
              Empowering connections between Georgia and Africa through cultural exchange, 
              trade partnerships, and mutual understanding.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-background mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((item) => (
                <li key={item}>
                  <a href="#categories" className="text-background/70 hover:text-accent transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-background mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-background/70 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-background mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+995599584369" className="flex items-center gap-2 text-background/70 hover:text-accent transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  +995 599 58 43 69
                </a>
              </li>
              <li>
                <a href="mailto:info@afrogeohouse.com" className="flex items-center gap-2 text-background/70 hover:text-accent transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  info@afrogeohouse.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>20 Ilia Chavchavadze Ave, Tbilisi, Georgia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} African-Georgian House. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-background/50 hover:text-accent text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-background/50 hover:text-accent text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
