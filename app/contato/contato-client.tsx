"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactOptionsCards } from "@/components/contact/contact-options-cards"
import { MultiStepContactForm } from "@/components/contact/multi-step-contact-form"

export default function ContatoClientPage() {

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Página Ultra-Minimalista - Estilo Voru */}
      <section className="pt-24 pb-32 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Título Minimal */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Vamos começar?
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Preencha nosso formulário e receba uma proposta personalizada em até 48 horas
            </p>
          </div>

          {/* Formulário - Foco Total */}
          <MultiStepContactForm />

          {/* WhatsApp Discreto */}
          <div className="mt-20 pt-12 border-t border-border/50">
            <ContactOptionsCards />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
