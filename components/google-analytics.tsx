"use client"

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { GA_TRACKING_ID, isGAEnabled, pageview } from "@/lib/gtag"

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views on route change
  useEffect(() => {
    if (!isGAEnabled()) return

    const url = pathname + searchParams.toString()
    pageview(url)
  }, [pathname, searchParams])

  // Don't render in development or if GA_ID is not set
  if (!isGAEnabled()) {
    return null
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  )
}
