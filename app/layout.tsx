import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "sonner"
import { ScrollProgress } from "@/components/animations/scroll-progress"
import { SplashScreen } from "@/components/splash-screen"
import { StructuredData } from "@/components/structured-data"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://elmid.ai"),
  title: {
    default: "Elmid AI - Desenvolvimento de Software com Inteligência Artificial",
    template: "%s | Elmid AI",
  },
  description:
    "Software house especializada em desenvolvimento de soluções personalizadas com IA. Transformamos ideias em produtos digitais inovadores.",
  keywords: [
    "desenvolvimento de software",
    "inteligência artificial",
    "IA",
    "software house",
    "desenvolvimento web",
    "aplicativos mobile",
    "consultoria em tecnologia",
    "transformação digital",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Elmid AI" }],
  creator: "Elmid AI",
  publisher: "Elmid AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://elmid.ai",
    siteName: "Elmid AI",
    title: "Elmid AI - Desenvolvimento de Software com Inteligência Artificial",
    description:
      "Software house especializada em desenvolvimento de soluções personalizadas com IA. Transformamos ideias em produtos digitais inovadores.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Elmid AI - Desenvolvimento de Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elmid AI - Desenvolvimento de Software com Inteligência Artificial",
    description:
      "Software house especializada em desenvolvimento de soluções personalizadas com IA. Transformamos ideias em produtos digitais inovadores.",
    images: ["/images/twitter-image.jpg"],
    creator: "@elmid_ai",
    site: "@elmid_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.jpg", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.jpg", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.jpg", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StructuredData type="all" />
          <SplashScreen />
          <ScrollProgress />
          {children}
          <Toaster position="top-right" richColors />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
