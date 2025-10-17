"use client"

import { MessageCircle } from "lucide-react"

export function ContactOptionsCards() {
  const openWhatsApp = () => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511948182061"
    const text = encodeURIComponent(
      process.env.NEXT_PUBLIC_WHATSAPP_TEXT || "Olá! Vim do site da elmid.ai e gostaria de conversar sobre um projeto.",
    )
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank")
  }

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-4">
        Ou se preferir, fale conosco diretamente pelo{" "}
        <button
          onClick={openWhatsApp}
          className="text-green-600 hover:text-green-700 underline underline-offset-2 inline-flex items-center gap-1 transition-colors"
        >
          WhatsApp
          <MessageCircle className="w-3.5 h-3.5" />
        </button>
      </p>
    </div>
  )
}
