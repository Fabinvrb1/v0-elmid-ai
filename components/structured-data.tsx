"use client"

import { usePathname } from "next/navigation"

interface StructuredDataProps {
  type?: "organization" | "website" | "breadcrumb" | "localbusiness" | "all"
}

export function StructuredData({ type = "all" }: StructuredDataProps) {
  const pathname = usePathname()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elmid.ai"

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Elmid AI",
    legalName: "Elmid AI Software House",
    url: siteUrl,
    logo: `${siteUrl}/images/elmid-logo.png`,
    foundingDate: "2024",
    description: "Software house especializada em desenvolvimento de soluções personalizadas com IA",
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-11-94818-2061",
      contactType: "customer service",
      email: "contato@elmid.ai",
      availableLanguage: ["Portuguese", "English"],
    },
    sameAs: [
      "https://www.linkedin.com/company/elmid-ai",
      "https://github.com/elmid-ai",
      "https://twitter.com/elmid_ai",
    ],
  }

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Elmid AI",
    url: siteUrl,
    description: "Desenvolvimento de software personalizado com inteligência artificial",
    publisher: {
      "@type": "Organization",
      name: "Elmid AI",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/busca?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: "Elmid AI",
    image: `${siteUrl}/images/elmid-logo.png`,
    url: siteUrl,
    telephone: "+55-11-99999-9999",
    email: "contato@elmid.ai",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Paulista, 1000",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01310-100",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.5505,
      longitude: -46.6333,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
  }

  // Breadcrumb Schema
  const getBreadcrumbSchema = () => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const breadcrumbList = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
    ]

    let currentPath = siteUrl
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const name = segment.charAt(0).toUpperCase() + segment.slice(1)
      breadcrumbList.push({
        "@type": "ListItem",
        position: index + 2,
        name: name === "Contato" ? "Contato" : name,
        item: currentPath,
      })
    })

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbList,
    }
  }

  const breadcrumbSchema = getBreadcrumbSchema()

  // Render schemas based on type
  const renderSchemas = () => {
    switch (type) {
      case "organization":
        return (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        )
      case "website":
        return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      case "breadcrumb":
        return (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        )
      case "localbusiness":
        return (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          />
        )
      case "all":
      default:
        return (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          </>
        )
    }
  }

  return renderSchemas()
}
