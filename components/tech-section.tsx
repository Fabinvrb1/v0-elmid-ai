import Image from "next/image"

const technologies = [
  { name: "Next.js", category: "Framework", logo: "/images/tech/nextjs.jpg" },
  { name: "React", category: "Frontend", logo: "/images/tech/react.jpg" },
  { name: "TypeScript", category: "Language", logo: "/images/tech/typescript.jpg" },
  { name: "Node.js", category: "Backend", logo: "/images/tech/nodejs.jpg" },
  { name: "Tailwind CSS", category: "Styling", logo: "/images/tech/tailwind.jpg" },
  { name: "PostgreSQL", category: "Database", logo: "/images/tech/postgresql.jpg" },
  { name: "Vercel", category: "Deploy", logo: "/images/tech/vercel.jpg" },
  { name: "Figma", category: "Design", logo: "/images/tech/figma.jpg" },
]

export function TechSection() {
  return (
    <section id="tecnologias" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="text-sm font-medium text-accent">Stack Tecnológico</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Tecnologias modernas</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Utilizamos as ferramentas mais avançadas do mercado para garantir qualidade e performance
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center group"
              >
                <div className="mb-4 flex items-center justify-center h-16">
                  <Image
                    src={tech.logo || "/placeholder.svg"}
                    alt={`${tech.name} logo`}
                    width={64}
                    height={64}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-lg font-semibold text-card-foreground mb-1">{tech.name}</div>
                <div className="text-sm text-muted-foreground">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
