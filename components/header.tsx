"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/images/elmid-logo.png"
              alt="Elmid AI"
              width={160}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/#servicos"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Serviços
            </a>
            <Link
              href="/portfolio"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Portfólio
            </Link>
            <a
              href="/#processo"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Processo
            </a>
            <a
              href="/#tecnologias"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Tecnologias
            </a>
            <Link
              href="/contato"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contato
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link href="/contato">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Começar Projeto
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a
                href="/#servicos"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </a>
              <Link
                href="/portfolio"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfólio
              </Link>
              <a
                href="/#processo"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Processo
              </a>
              <a
                href="/#tecnologias"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tecnologias
              </a>
              <Link
                href="/contato"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <Link href="/contato" onClick={() => setIsMenuOpen(false)}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                  Começar Projeto
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
