'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitContactForm } from '@/app/actions/contact'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  t: (key: string) => string
}

export function ContactModal({ isOpen, onClose, t }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const result = await submitContactForm(data)

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
          setSuccess(false)
        }, 2000)
      } else {
        setError(result.error || 'Errore sconosciuto')
      }
    } catch (err) {
      setError('Errore di connessione. Riprova.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm dark:bg-black/80">
      <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 dark:bg-zinc-950 dark:border-zinc-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
          aria-label="Chiudi modulo"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-zinc-900 mb-2 tracking-tight dark:text-white">
            Verifica la tua idoneità
          </h3>
          <p className="text-zinc-600 text-sm mb-6 dark:text-zinc-400">
            Compila i dati per capire se la nostra infrastruttura è adatta ai tuoi volumi
            di cantiere. Ti risponderemo in 24 ore.
          </p>

          {success && (
            <div className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg">
              <p className="text-emerald-400 text-sm font-medium">
                Richiesta inviata! Ti contatteremo presto.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-zinc-600 mb-1.5 uppercase tracking-wider dark:text-zinc-300">
                Email Aziendale *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="nome@tuaazienda.it"
                className="w-full h-11 bg-stone-50 border border-stone-200 rounded-md px-4 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors dark:bg-black dark:border-zinc-800 dark:text-white dark:placeholder-zinc-600"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="azienda" className="block text-xs font-medium text-zinc-600 mb-1.5 uppercase tracking-wider dark:text-zinc-300">
                Nome Impresa *
              </label>
              <input
                id="azienda"
                type="text"
                name="azienda"
                required
                placeholder="Edilizia Rossi SRL"
                className="w-full h-11 bg-stone-50 border border-stone-200 rounded-md px-4 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors dark:bg-black dark:border-zinc-800 dark:text-white dark:placeholder-zinc-600"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="cantieri" className="block text-xs font-medium text-zinc-600 mb-1.5 uppercase tracking-wider dark:text-zinc-300">
                Cantieri aperti in media all&apos;anno *
              </label>
              <select
                id="cantieri"
                name="cantieri"
                defaultValue=""
                required
                className="w-full h-11 bg-stone-50 border border-stone-200 rounded-md px-4 text-zinc-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors appearance-none dark:bg-black dark:border-zinc-800 dark:text-white"
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  Seleziona un&apos;opzione...
                </option>
                <option value="1-5">1 cantiere</option>
                <option value="6-15">Fino a 3 cantieri</option>
                <option value="15+">Più di 3 cantieri</option>
              </select>
            </div>

            <div>
              <label htmlFor="ruolo" className="block text-xs font-medium text-zinc-600 mb-1.5 uppercase tracking-wider dark:text-zinc-300">
                Il tuo ruolo *
              </label>
              <select
                id="ruolo"
                name="ruolo"
                defaultValue=""
                required
                className="w-full h-11 bg-stone-50 border border-stone-200 rounded-md px-4 text-zinc-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors appearance-none dark:bg-black dark:border-zinc-800 dark:text-white"
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  Seleziona il tuo ruolo...
                </option>
                <option value="titolare">Titolare / Amministratore</option>
                <option value="tecnico">Tecnico / Coordinatore Sicurezza</option>
                <option value="impiegato">Impiegato Amministrativo</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || success}
              className="w-full h-12 mt-6 bg-white text-black hover:bg-zinc-200 font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Invio in corso...
                </span>
              ) : success ? (
                '✓ Inviato!'
              ) : (
                t('modal_button')
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
