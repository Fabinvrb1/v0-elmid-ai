"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactOptionsCards } from "@/components/contact/contact-options-cards"
import { EnhancedContactForm } from "@/components/contact/enhanced-contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactFAQ } from "@/components/contact/contact-faq"
import { Button } from "@/components/ui/button"
import { MessageCircle, Linkedin, Instagram, Github } from "lucide-react"
import Link from "next/link"

export default function ContatoClientPage() {
  const openWhatsApp = () => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511948182061"
    const text = encodeURIComponent("Olá! Vim do site da elmid.ai e gostaria de conversar sobre um projeto.")
    if (typeof window !== "undefined") {
      window.open(`https://wa.me/${phone}?text=${text}`, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Contato</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Vamos Transformar Sua Ideia em Realidade Digital?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Fale com nossos especialistas e receba uma proposta personalizada em até 48 horas
          </p>
        </div>
      </section>

      {/* Cards de Opções de Contato */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ContactOptionsCards />
        </div>
      </section>

      {/* Formulário de Contato - 2 Colunas */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Coluna Esquerda - Formulário (2/3) */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-foreground mb-2">Envie Seu Projeto</h2>
                <p className="text-muted-foreground mb-8">
                  Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas úteis
                </p>
                <EnhancedContactForm />
              </div>
            </div>

            {/* Coluna Direita - Informações (1/3) */}
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Mapa / Localização */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-12 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">Atendimento 100% Remoto</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trabalhamos com clientes de todo o Brasil, oferecendo a mesma qualidade e eficiência independente da
              localização. Nossa equipe está preparada para atender seu projeto remotamente com excelência.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ de Contato */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <ContactFAQ />
        </div>
      </section>

      {/* CTA Alternativo Final - WhatsApp */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-500/10 via-green-500/5 to-background border border-green-500/20 rounded-xl p-12 text-center">
            <MessageCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Prefere conversar pelo WhatsApp?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nossa equipe está online e pronta para te atender
            </p>
            <Button
              size="lg"
              onClick={openWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 h-14"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Chamar no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Redes Sociais */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-8">Siga a elmid.ai</h2>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://linkedin.com/company/elmid-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all"
            >
              <Linkedin className="w-6 h-6 text-primary" />
            </a>
            <a
              href="https://instagram.com/elmid.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all"
            >
              <Instagram className="w-6 h-6 text-primary" />
            </a>
            <a
              href="https://github.com/elmid-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all"
            >
              <Github className="w-6 h-6 text-primary" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
