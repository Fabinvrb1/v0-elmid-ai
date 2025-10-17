"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/portfolio/project-card"
import { ProjectFilter } from "@/components/portfolio/project-filter"
import { projects } from "@/data/projects"
import type { Project } from "@/data/projects"
import { FadeIn } from "@/components/animations/fade-in"

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | Project["category"]>("all")

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Nosso Portfólio</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conheça alguns dos projetos que desenvolvemos e os resultados que alcançamos para nossos clientes
            </p>
          </div>
        </FadeIn>

        {/* Filter */}
        <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Nenhum projeto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </main>
  )
}
