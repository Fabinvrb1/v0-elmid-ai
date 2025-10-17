import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { TechSection } from "@/components/tech-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - Desenvolvimento de Software Personalizado",
  description:
    "Elmid AI é uma software house especializada em desenvolvimento de soluções personalizadas com inteligência artificial. Criamos produtos digitais inovadores que transformam negócios.",
  openGraph: {
    title: "Elmid AI - Desenvolvimento de Software Personalizado",
    description:
      "Software house especializada em desenvolvimento de soluções personalizadas com IA. Transformamos ideias em produtos digitais inovadores.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://elmid.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elmid AI - Desenvolvimento de Software Personalizado",
    description:
      "Software house especializada em desenvolvimento de soluções personalizadas com IA. Transformamos ideias em produtos digitais inovadores.",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://elmid.ai",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <TechSection />
      <CTASection />
      <Footer />
    </main>
  )
}
