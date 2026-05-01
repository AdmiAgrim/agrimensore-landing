"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

// Replace with your GA4 Measurement ID (or set NEXT_PUBLIC_GA_ID env var)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"

export function useAnalyticsConsent() {
  const [consent, setConsent] = useState<boolean | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent")
    if (stored === "accepted") setConsent(true)
    else if (stored === "rejected") setConsent(false)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted")
    setConsent(true)
  }

  const reject = () => {
    localStorage.setItem("cookie_consent", "rejected")
    setConsent(false)
  }

  return { consent, accept, reject }
}

export default function GoogleAnalytics({ consent }: { consent: boolean | null }) {
  if (consent !== true || GA_ID === "G-XXXXXXXXXX") return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  )
}
