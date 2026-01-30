import Image from "next/image"
import { MapPin } from "lucide-react"

const countries = [
  { name: "Georgia", flag: "🇬🇪", city: "Tbilisi" },
  { name: "Uganda", flag: "🇺🇬", city: "Kampala" },
  { name: "Kenya", flag: "🇰🇪", city: "Nairobi" },
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/african-handicrafts.jpg"
                    alt="African handicrafts display"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/images/african-coffee.jpg"
                    alt="African coffee beans"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/georgian-crafts.jpg"
                    alt="Georgian traditional crafts"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-accent font-medium">Who We Are</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-3 text-balance">
              A Platform for Cultural Exchange & Trade
            </h2>
            <p className="text-primary-foreground/80 text-lg mt-6 leading-relaxed">
              African-Georgian House is a unique platform that connects artisans, artists, and businesses 
              from Georgia with those from Africa, particularly Uganda and Kenya. We provide opportunities 
              for cultural exchange and economic collaboration.
            </p>
            
            {/* Countries */}
            <div className="mt-10">
              <p className="text-sm uppercase tracking-wider text-primary-foreground/60 mb-4">
                Currently Operating In
              </p>
              <div className="flex flex-wrap gap-4">
                {countries.map((country) => (
                  <div
                    key={country.name}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl"
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <p className="font-medium">{country.name}</p>
                      <p className="text-xs text-primary-foreground/60 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {country.city}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key numbers */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/20">
              <div>
                <p className="font-serif text-4xl font-bold text-accent">14+</p>
                <p className="text-sm text-primary-foreground/60 mt-1">Activity Categories</p>
              </div>
              <div>
                <p className="font-serif text-4xl font-bold text-accent">2</p>
                <p className="text-sm text-primary-foreground/60 mt-1">Continents United</p>
              </div>
              <div>
                <p className="font-serif text-4xl font-bold text-accent">∞</p>
                <p className="text-sm text-primary-foreground/60 mt-1">Possibilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
