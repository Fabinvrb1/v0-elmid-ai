import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, Calendar, MessageCircle } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Mensagem Enviada com Sucesso | elmid.ai",
  description: "Recebemos sua mensagem e entraremos em contato em breve.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero com Sucesso */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-8 bg-green-500/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Mensagem Enviada com Sucesso!
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Analisaremos seu projeto e retornaremos em até 24 horas úteis
          </p>

          <p className="text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Um email de confirmação foi enviado para você
          </p>
        </div>
      </section>

      {/* Cards de Ações */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Voltar ao Site */}
            <Card className="border-border hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Voltar ao Site</h3>
                <Link href="/">
                  <Button variant="outline" className="w-full bg-transparent">
                    Ir para Home
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Agendar Call */}
            <Card className="border-border hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Agendar Call Agora</h3>
                <a
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/elmid/30min"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full bg-transparent">
                    Ver Agenda
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card className="border-border hover:border-green-500/50 transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Falar no WhatsApp</h3>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511948182061"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-500 hover:bg-green-500/10 bg-transparent"
                  >
                    Chamar Agora
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enquanto Isso */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Enquanto isso...</h2>

          <div className="space-y-8">
            {/* Conheça nossos projetos */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Conheça Nossos Projetos</h3>
                <p className="text-muted-foreground mb-6">
                  Veja alguns dos projetos que desenvolvemos para nossos clientes
                </p>
                <Link href="/portfolio">
                  <Button>Ver Portfólio</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Siga nas redes sociais */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Siga nas Redes Sociais</h3>
                <p className="text-muted-foreground mb-6">
                  Acompanhe nossas novidades, dicas e conteúdos sobre tecnologia
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/company/elmid-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full bg-transparent">
                      LinkedIn
                    </Button>
                  </a>
                  <a href="https://instagram.com/elmid.ai" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Instagram
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
