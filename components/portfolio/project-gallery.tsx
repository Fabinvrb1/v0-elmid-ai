"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

interface ProjectGalleryProps {
  images: string[]
  title: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const slides = images.map((image) => ({ src: image }))

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIndex(idx)
              setOpen(true)
            }}
            className="relative h-64 overflow-hidden rounded-lg border border-border hover:border-primary transition-colors group"
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} - Imagem ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                Clique para ampliar
              </span>
            </div>
          </button>
        ))}
      </div>

      <Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} />
    </>
  )
}
