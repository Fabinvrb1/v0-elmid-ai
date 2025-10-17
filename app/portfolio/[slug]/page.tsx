import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProjectGallery } from "@/components/portfolio/project-gallery"
import { RelatedProjects } from "@/components/portfolio/related-projects"
import { getProjectBySlug, getRelatedProjects, projects } from "@/data/projects"
import { ExternalLink, Github, Quote } from "lucide-react"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Projeto não encontrado",
    }
  }

  return {
    title: `${project.title} | Portfólio Elmid AI`,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [project.image],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = getRelatedProjects(project.id, project.category)

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
      {/* Header / Banner */}
      <section className="relative h-[60vh] min-h-[400px] bg-muted">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="container mx-auto">
            <Badge className="mb-4">
              {project.category === "web" && "Web"}
              {project.category === "mobile" && "Mobile"}
              {project.category === "system" && "Sistema"}
              {project.category === "ai" && "IA"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">{project.title}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl text-pretty">{project.tagline}</p>
            <div className="flex flex-wrap gap-4">
              {project.link && (
                <Button asChild size="lg">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver Site
                  </a>
                </Button>
              )}
              {project.github && (
                <Button asChild variant="outline" size="lg">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Overview Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Categoria</h3>
              <p className="text-lg font-semibold">
                {project.category === "web" && "Desenvolvimento Web"}
                {project.category === "mobile" && "Aplicativo Mobile"}
                {project.category === "system" && "Sistema Corporativo"}
                {project.category === "ai" && "Inteligência Artificial"}
              </p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Cliente</h3>
              <p className="text-lg font-semibold">{project.client || "Confidencial"}</p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Ano</h3>
              <p className="text-lg font-semibold">{project.year}</p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Tecnologias</h3>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.technologies.slice(0, 2).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.technologies.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Challenge */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">O Desafio</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.challenge}</p>
        </section>

        {/* Solution */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">A Solução</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.solution}</p>
        </section>

        {/* Results */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Resultados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.results.map((result, index) => (
              <div key={index} className="p-6 border border-border rounded-lg text-center bg-card">
                <p className="text-4xl font-bold text-primary mb-2">{result.value}</p>
                <p className="text-sm text-muted-foreground">{result.metric}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Galeria</h2>
          <ProjectGallery images={project.images} title={project.title} />
        </section>

        {/* Testimonial */}
        {project.testimonial && (
          <section className="mb-16">
            <div className="bg-muted p-8 lg:p-12 rounded-lg relative">
              <Quote className="h-12 w-12 text-primary/20 absolute top-8 left-8" />
              <blockquote className="relative z-10">
                <p className="text-xl lg:text-2xl font-medium mb-6 italic text-pretty">"{project.testimonial.text}"</p>
                <footer className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{project.testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{project.testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.testimonial.role} • {project.testimonial.company}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </section>
        )}

        {/* Technologies Detailed */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Stack Tecnológico</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-base px-4 py-2">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16">
          <div className="bg-primary text-primary-foreground p-8 lg:p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Quer resultados como este?</h2>
            <p className="text-lg mb-6 opacity-90">Entre em contato e descubra como podemos transformar seu negócio</p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contato">Solicitar Orçamento</Link>
            </Button>
          </div>
        </section>
      </div>

      {/* Related Projects */}
      <RelatedProjects projects={relatedProjects} />
    </main>
    <Footer />
    </>
  )
}
