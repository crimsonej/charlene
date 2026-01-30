import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 md:pt-40 pb-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                Georgia & Africa United
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight text-balance">
              Bridging Cultures,{" "}
              <span className="text-primary">Creating</span>{" "}
              <span className="text-accent">Connections</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Empowering meaningful connections between Georgia and Africa through cultural exchange, 
              trade partnerships, and mutual understanding. Discover authentic crafts, art, and experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
                Explore Our Collections
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 bg-transparent">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <p className="font-serif text-3xl md:text-4xl font-bold text-primary">14+</p>
                <p className="text-sm text-muted-foreground mt-1">Categories</p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl font-bold text-accent">3</p>
                <p className="text-sm text-muted-foreground mt-1">Countries</p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl font-bold text-primary">100+</p>
                <p className="text-sm text-muted-foreground mt-1">Artisans</p>
              </div>
            </div>
          </div>

          {/* Image collage */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-cultural-bridge.jpg"
                alt="African and Georgian cultural artifacts beautifully arranged"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border border-border max-w-[240px]">
              <p className="font-serif text-lg font-semibold text-foreground">
                {"\"Celebrating diversity through art and tradition\""}
              </p>
              <p className="text-sm text-muted-foreground mt-2">— Our Vision</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
