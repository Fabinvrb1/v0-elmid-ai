import type { Metadata } from "next"
import ContatoClientPage from "./contato-client"

export const metadata: Metadata = {
  title: "Contato | elmid.ai - Fale Conosco",
  description:
    "Entre em contato com a elmid.ai. Agende uma reunião gratuita, envie seu projeto ou fale no WhatsApp. Resposta em até 24 horas.",
  keywords: "contato elmid.ai, orçamento desenvolvimento, agendar reunião, software house contato",
  openGraph: {
    title: "Contato | elmid.ai",
    description: "Fale com especialistas em desenvolvimento de software",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://elmid.ai"}/contato`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato | elmid.ai",
    description: "Fale com especialistas em desenvolvimento de software",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://elmid.ai"}/contato`,
  },
}

export default function ContatoPage() {
  return <ContatoClientPage />
}
