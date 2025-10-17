"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Clock, Lock, Star } from "lucide-react"
import Image from "next/image"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Box 1 - Contato Direto */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Contato Direto</h3>
          <div className="space-y-3">
            <a
              href="mailto:contato@elmid.ai"
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>contato@elmid.ai</span>
            </a>
            <a
              href="https://wa.me/5511948182061"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>+55 (11) 94818-2061</span>
            </a>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="w-5 h-5" />
              <span>Seg-Sex, 9h-18h</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Box 2 - Quem Vai Te Atender */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
              <Image
                src="/images/Pedro-4.png?v=2"
                alt="Pedro Nascimento"
                width={64}
                height={64}
                className="object-cover object-center w-full h-full"
                priority
                unoptimized
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">Pedro Nascimento</h3>
                <Badge variant="secondary" className="text-xs">
                  Resposta em 24h
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Especialista em projetos digitais</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Olá! Sou o Pedro Nascimento, especialista em projetos digitais da elmid.ai. Vou analisar pessoalmente seu projeto
            e retornar em até 24 horas úteis.
          </p>
        </CardContent>
      </Card>

      {/* Box 3 - Próximos Passos */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Próximos Passos</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Análise do seu projeto</p>
                <p className="text-xs text-muted-foreground">Em até 24 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Call estratégica gratuita</p>
                <p className="text-xs text-muted-foreground">Em até 48 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Proposta personalizada</p>
                <p className="text-xs text-muted-foreground">Em até 72 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">4</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Início do desenvolvimento</p>
                <p className="text-xs text-muted-foreground">Após aprovação</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Box 4 - Social Proof */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-foreground mb-2">500+</p>
            <p className="text-sm text-muted-foreground">Projetos entregues</p>
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">4.9/5 (87 avaliações)</p>
        </CardContent>
      </Card>

      {/* Box 5 - Selo Segurança */}
      <Card className="bg-muted/50">
        <CardContent className="p-6 text-center">
          <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-2">Seus dados estão protegidos</h3>
          <p className="text-sm text-muted-foreground mb-3">Respeitamos a LGPD</p>
          <a href="/privacy" className="text-xs text-primary hover:underline">
            Política de Privacidade
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
