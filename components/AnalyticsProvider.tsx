"use client"

import CookieBanner from "./CookieBanner"
import GoogleAnalytics, { useAnalyticsConsent } from "./GoogleAnalytics"

export default function AnalyticsProvider() {
  const { consent, accept, reject } = useAnalyticsConsent()

  return (
    <>
      <GoogleAnalytics consent={consent} />
      <CookieBanner onAccept={accept} onReject={reject} />
    </>
  )
}
