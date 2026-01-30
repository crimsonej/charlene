import { Handshake, Globe2, Heart } from "lucide-react"

const missions = [
  {
    icon: Handshake,
    title: "Promoting Trade & Investment",
    description: "We facilitate trade partnerships, investment opportunities, and business collaborations between Georgian and African enterprises, currently focused on Uganda and Kenya.",
  },
  {
    icon: Heart,
    title: "Celebrating Diversity",
    description: "We celebrate the rich cultural heritage of both regions through events, workshops, and educational programs that bring communities together.",
  },
  {
    icon: Globe2,
    title: "Building Bridges",
    description: "We serve as a bridge, connecting individuals, organizations, and governments across Georgia and Africa to foster mutual understanding and growth.",
  },
]

export function Mission() {
  return (
    <section id="mission" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Vision side */}
          <div>
            <span className="text-accent font-medium">Our Purpose</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 text-balance">
              Empowering Connections, Bridging Cultures
            </h2>
            <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
              Through our friendship and collaboration, we combined our experiences, knowledge and forces 
              to come up with an idea of creating this platform, which gives opportunities to great masters, 
              painters, artists and companies to promote their products.
            </p>
            <p className="text-muted-foreground text-lg mt-4 leading-relaxed">
              We envision a world where people from Georgia and Africa come together to learn, grow, and thrive 
              through meaningful cultural and economic exchange.
            </p>
            
            {/* Partnership CTA */}
            <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <p className="font-serif text-lg font-semibold text-foreground">
                Interested in Partnership?
              </p>
              <p className="text-muted-foreground mt-2">
                We welcome any reputable company or manufacturer to cooperate with us by promoting their products on our platform.
              </p>
              <a href="#contact" className="inline-flex items-center mt-4 text-primary font-medium hover:underline">
                Contact us to learn more →
              </a>
            </div>
          </div>

          {/* Mission cards */}
          <div className="space-y-6">
            {missions.map((mission, index) => (
              <div
                key={mission.title}
                className="p-6 md:p-8 bg-card rounded-2xl border border-border hover:border-accent/50 transition-colors group"
              >
                <div className="flex gap-5">
                  <div className="shrink-0">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <mission.icon className="w-7 h-7 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {mission.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 leading-relaxed">
                      {mission.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
