"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useGoogleAnalytics } from "@/hooks/use-google-analytics"
import { useScrollTracking } from "@/hooks/use-scroll-tracking"
import Link from "next/link"
import { FadeIn } from "@/components/animations/fade-in"
import { CountUpAnimation } from "@/components/animations/count-up"

export function HeroSection() {
  const { trackCTA } = useGoogleAnalytics()
  useScrollTracking()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Transformação Digital de Ponta</span>
            </div>
          </FadeIn>

          {/* Main Heading */}
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
              Desenvolvemos Soluções <span className="gradient-text">Digitais Excepcionais</span>
            </h1>
          </FadeIn>

          {/* Subheading */}
          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed text-pretty">
              Combinamos design inovador com tecnologia de ponta para criar produtos digitais que impulsionam o
              crescimento do seu negócio e encantam seus usuários.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contato">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 h-12 group"
                  onClick={() => trackCTA("Iniciar Projeto", "Hero Section")}
                >
                  Iniciar Projeto
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 h-12 bg-transparent"
                onClick={() => trackCTA("Ver Nosso Trabalho", "Hero Section")}
              >
                Ver Nosso Trabalho
              </Button>
            </div>
          </FadeIn>

          {/* Stats with CountUp Animation */}
          <FadeIn delay={0.5}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  <CountUpAnimation end={150} suffix="+" duration={2.5} />
                </div>
                <div className="text-sm text-muted-foreground">Projetos Entregues</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  <CountUpAnimation end={98} suffix="%" duration={2.5} />
                </div>
                <div className="text-sm text-muted-foreground">Satisfação</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  <CountUpAnimation end={50} suffix="+" duration={2.5} />
                </div>
                <div className="text-sm text-muted-foreground">Clientes Ativos</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  <CountUpAnimation end={5} suffix=" Anos" duration={2.5} />
                </div>
                <div className="text-sm text-muted-foreground">No Mercado</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
