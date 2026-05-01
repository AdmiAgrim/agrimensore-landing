"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface CookieBannerProps {
  onAccept: () => void
  onReject: () => void
}

export default function CookieBanner({ onAccept, onReject }: CookieBannerProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent")
    if (!stored) setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-zinc-900 text-white rounded-2xl shadow-2xl border border-zinc-800 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-zinc-300 leading-relaxed">
          <p>
            Questo sito utilizza cookie tecnici necessari al funzionamento e cookie analitici
            (Google Analytics) per migliorare la tua esperienza. I cookie analitici vengono
            attivati solo con il tuo consenso.{" "}
            <Link href="/cookie" className="underline text-white hover:text-emerald-400 transition-colors">
              Informativa Cookie
            </Link>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => { onReject(); setVisible(false) }}
            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white border border-zinc-700 rounded-lg transition-colors"
          >
            Rifiuta
          </button>
          <button
            onClick={() => { onAccept(); setVisible(false) }}
            className="px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  )
}
