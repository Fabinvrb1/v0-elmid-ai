"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useGoogleAnalytics } from "@/hooks/use-google-analytics"

export function CTASection() {
  const { trackCTA } = useGoogleAnalytics()

  return (
    <section id="contato" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-background border border-accent/20 p-12 lg:p-16">
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Pronto para transformar sua ideia em realidade?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
                Entre em contato conosco e vamos conversar sobre como podemos ajudar seu negócio a crescer com
                tecnologia de ponta.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 h-12 group"
                    onClick={() => trackCTA("Começar Agora", "CTA Section")}
                  >
                    Começar Agora
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 h-12 bg-transparent"
                    onClick={() => trackCTA("Agendar Reunião", "CTA Section")}
                  >
                    Agendar Reunião
                  </Button>
                </Link>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
