"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, MessageCircle } from "lucide-react"

export function ContactOptionsCards() {
  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const openWhatsApp = () => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511948182061"
    const text = encodeURIComponent(
      process.env.NEXT_PUBLIC_WHATSAPP_TEXT || "Olá! Vim do site da elmid.ai e gostaria de conversar sobre um projeto.",
    )
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank")
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* Card 1 - Formulário */}
        <Card className="border-border hover:border-primary/50 transition-all hover:shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Preencher Formulário</h3>
            <p className="text-muted-foreground mb-4">Receba uma proposta personalizada</p>
            <Button onClick={scrollToForm} className="w-full">
              Preencher Agora
            </Button>
          </CardContent>
        </Card>

        {/* Card 2 - WhatsApp */}
        <Card className="border-border hover:border-primary/50 transition-all hover:shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">WhatsApp Direto</h3>
            <p className="text-muted-foreground mb-4">Resposta em minutos</p>
            <Button
              onClick={openWhatsApp}
              variant="outline"
              className="w-full border-green-500 text-green-500 hover:bg-green-500/10 bg-transparent"
            >
              Chamar Agora
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
