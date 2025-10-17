"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star } from "lucide-react"
import { motion } from "framer-motion"
import type { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/portfolio/${project.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300">
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-primary text-primary-foreground gap-1">
                <Star className="h-3 w-3 fill-current" />
                Destaque
              </Badge>
            </div>
          )}

          {/* Image */}
          <div className="relative h-64 overflow-hidden bg-muted">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category Badge */}
            <Badge variant="outline" className="mb-3">
              {project.category === "web" && "Web"}
              {project.category === "mobile" && "Mobile"}
              {project.category === "system" && "Sistema"}
              {project.category === "ai" && "IA"}
            </Badge>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>

            {/* Tagline */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.tagline}</p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech) => (
                <span key={tech} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">{project.year}</span>
              <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                Ver projeto
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
