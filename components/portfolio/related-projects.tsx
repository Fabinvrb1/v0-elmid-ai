import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/data/projects"

interface RelatedProjectsProps {
  projects: Project[]
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null

  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Projetos Relacionados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group block border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative h-48 bg-muted">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <Badge variant="outline" className="mb-2">
                  {project.category === "web" && "Web"}
                  {project.category === "mobile" && "Mobile"}
                  {project.category === "system" && "Sistema"}
                  {project.category === "ai" && "IA"}
                </Badge>
                <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.tagline}</p>
                <span className="text-sm font-medium text-primary flex items-center gap-1">
                  Ver projeto
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
