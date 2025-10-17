import { CheckCircle2 } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Discovery & Planejamento",
    description:
      "Imersão completa no seu negócio para entender objetivos, desafios e oportunidades. Definimos estratégia e escopo do projeto.",
  },
  {
    number: "02",
    title: "Design & Prototipagem",
    description: "Criamos wireframes e designs de alta fidelidade, focando em UX intuitiva e UI moderna que converte.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description:
      "Transformamos o design em código limpo e escalável, utilizando as melhores práticas e tecnologias do mercado.",
  },
  {
    number: "04",
    title: "Testes & Lançamento",
    description:
      "Realizamos testes rigorosos de qualidade e performance antes do lançamento. Acompanhamos a implantação.",
  },
]

export function ProcessSection() {
  return (
    <section id="processo" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="text-sm font-medium text-accent">Nosso Processo</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Como trabalhamos</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Uma metodologia comprovada para entregar resultados excepcionais
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-accent">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
