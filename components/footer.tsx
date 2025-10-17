"use client"

import { useGoogleAnalytics } from "@/hooks/use-google-analytics"
import Image from "next/image"

export function Footer() {
  const { trackContact } = useGoogleAnalytics()

  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Image src="/images/elmid-logo.png" alt="Elmid AI" width={160} height={40} className="h-8 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transformando ideias em soluções digitais excepcionais.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Desenvolvimento
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Design
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Consultoria
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Portfólio
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contato@elmid.ai"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => trackContact("email")}
                >
                  contato@elmid.ai
                </a>
              </li>
              <li>
                <a
                  href="tel:+5511999999999"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => trackContact("phone")}
                >
                  +55 (11) 9999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} elmid.ai. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
