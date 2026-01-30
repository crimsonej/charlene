import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const categories = [
  {
    title: "African Safaris",
    description: "Unforgettable wildlife adventures in Uganda and Kenya",
    image: "/images/african-safari.jpg",
    featured: true,
  },
  {
    title: "African Handicrafts",
    description: "Hand-woven baskets, carvings, and traditional textiles",
    image: "/images/african-handicrafts.jpg",
    featured: true,
  },
  {
    title: "African Artists",
    description: "Contemporary and traditional African paintings",
    image: "/images/african-art.jpg",
    featured: true,
  },
  {
    title: "African Coffee",
    description: "Premium beans from Uganda and Kenya",
    image: "/images/african-coffee.jpg",
    featured: true,
  },
  {
    title: "Georgian Crafts",
    description: "Traditional enamel, pottery, and metalwork",
    image: "/images/georgian-crafts.jpg",
    featured: true,
  },
  {
    title: "Leather Products",
    description: "Handmade leather goods and raw materials",
    image: "/images/african-handicrafts.jpg",
    featured: false,
  },
]

export function Categories() {
  return (
    <section id="categories" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <span className="text-accent font-medium">Our Collections</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 text-balance">
            Discover Authentic Treasures from Two Worlds
          </h2>
          <p className="text-muted-foreground text-lg mt-4 leading-relaxed">
            From African safaris to Georgian artistry, explore our curated selection of cultural experiences and handcrafted goods.
          </p>
        </div>

        {/* Featured grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.filter(c => c.featured).map((category, index) => (
            <a
              key={category.title}
              href="#"
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? "md:col-span-2 lg:col-span-2 aspect-[2/1]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="text-white/80 mt-1 text-sm md:text-base">
                      {category.description}
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Additional categories list */}
        <div className="mt-12 pt-12 border-t border-border">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-6">More Categories</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Semi-precious Stones",
              "Indian Handicrafts",
              "Georgian Tourism",
              "African Furniture",
              "Animal Horns",
              "Cultural Events",
              "Education in Georgia",
              "Georgian Artists",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-accent transition-colors group"
              >
                <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                  {item}
                </span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
