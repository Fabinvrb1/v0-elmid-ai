import { Card } from "@/components/ui/card"
import { Code2, Palette, Rocket, HeadphonesIcon } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"

const services = [
  {
    icon: Code2,
    title: "Desenvolvimento Full-Stack",
    description:
      "Criamos aplicações web e mobile completas, desde landing pages até sistemas complexos com arquitetura escalável.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Transformamos ideias em experiências visuais intuitivas e envolventes que convertem visitantes em clientes.",
  },
  {
    icon: Rocket,
    title: "MVP & Validação",
    description: "Desenvolvemos produtos mínimos viáveis para testar sua ideia no mercado de forma rápida e econômica.",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte Contínuo",
    description: "Oferecemos manutenção e evolução constante dos projetos, garantindo performance e segurança.",
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <span className="text-sm font-medium text-accent">Nossos Serviços</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              O que fazemos de melhor
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground text-pretty">
              Oferecemos soluções completas para transformar sua visão em realidade digital
            </p>
          </FadeIn>
        </div>

        <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border h-full">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
