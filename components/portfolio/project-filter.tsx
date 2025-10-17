"use client"

import { Button } from "@/components/ui/button"
import type { Project } from "@/data/projects"

interface ProjectFilterProps {
  activeFilter: "all" | Project["category"]
  onFilterChange: (filter: "all" | Project["category"]) => void
}

const filters = [
  { value: "all" as const, label: "Todos" },
  { value: "web" as const, label: "Web" },
  { value: "mobile" as const, label: "Mobile" },
  { value: "system" as const, label: "Sistema" },
  { value: "ai" as const, label: "IA" },
]

export function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "default" : "outline"}
          onClick={() => onFilterChange(filter.value)}
          className="rounded-full"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}
