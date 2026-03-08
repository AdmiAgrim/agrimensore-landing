"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react"

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-zinc-900 font-sans selection:bg-stone-200 selection:text-zinc-900 dark:bg-black dark:text-zinc-50 dark:selection:bg-zinc-800 dark:selection:text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-black/5 bg-stone-50/90 dark:border-white/5 dark:bg-black/90">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-lg md:text-xl tracking-tighter flex items-center gap-2 flex-shrink-0">
            <img src="/logo.svg" alt="Agrimensore" className="h-8 w-8 object-contain" />
            <span className="hidden sm:inline text-sm">Agrimensore</span>
          </div>
          <a href="/" className="text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white">Torna alla home</a>
        </div>
      </header>

      {/* HERO */}
      <section className="container mx-auto px-4 py-32 md:py-40 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter max-w-4xl mb-6">
          Diventa Partner.<br/>Guadagna con noi.
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mb-10 leading-relaxed font-light dark:text-zinc-400">
          Siamo alla ricerca di broker e agenti edili per commercializzare Agrimensore. Commissioni vantaggiose e supporto dedicato.
        </p>
        <Button onClick={() => window.location.href = "#contact"} size="lg" className="bg-zinc-900 text-white hover:bg-zinc-800 h-12 px-8 font-semibold rounded-md dark:bg-white dark:text-black dark:hover:bg-zinc-200">
          Candidati Subito
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </section>

      {/* BENEFITS */}
      <section className="border-t border-black/5 bg-white py-24 dark:border-white/5 dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Perché diventare Partner</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-stone-50 border-stone-200 dark:bg-black dark:border-zinc-800/60">
              <CardContent className="pt-8 pb-8 px-8">
                <TrendingUp className="w-8 h-8 text-green-500 mb-6" />
                <h3 className="font-semibold text-xl mb-3 text-zinc-900 dark:text-white">Commissioni Competitive</h3>
                <p className="text-zinc-600 text-sm leading-relaxed dark:text-zinc-400">
                  Commissioni strutturate in base al volume di vendite. Scopri i dettagli durante una call con il nostro team.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-stone-50 border-stone-200 dark:bg-black dark:border-zinc-800/60">
              <CardContent className="pt-8 pb-8 px-8">
                <Users className="w-8 h-8 text-blue-500 mb-6" />
                <h3 className="font-semibold text-xl mb-3 text-zinc-900 dark:text-white">Supporto Totale</h3>
                <p className="text-zinc-600 text-sm leading-relaxed dark:text-zinc-400">
                  Materiali marketing, demo, training e supporto tecnico per chiudere ogni deal.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-stone-50 border-stone-200 dark:bg-black dark:border-zinc-800/60">
              <CardContent className="pt-8 pb-8 px-8">
                <Zap className="w-8 h-8 text-yellow-500 mb-6" />
                <h3 className="font-semibold text-xl mb-3 text-zinc-900 dark:text-white">Tracciamento Automatico</h3>
                <p className="text-zinc-600 text-sm leading-relaxed dark:text-zinc-400">
                  Codici sconto Stripe per tracciare ogni vendita. Dashboard partner in tempo reale.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="border-t border-black/5 py-32 dark:border-white/5">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Candidati al Programma</h2>
          <Card className="bg-white border-stone-200 dark:bg-zinc-950 dark:border-zinc-800/60">
            <CardContent className="pt-8 pb-8 px-8">
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5 uppercase dark:text-zinc-300">Nome Completo *</label>
                  <input type="text" required placeholder="Mario Rossi" className="w-full h-11 bg-stone-50 border border-stone-200 rounded-md px-4 text-zinc-900 focus:outline-none focus:border-zinc-400 dark:bg-black dark:border-zinc-800 dark:text-white dark:focus:border-zinc-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5 uppercase dark:text-zinc-300">Email *</label>
                  <input type="email" required placeholder="mario@broker.it" className="w-full h-11 bg-stone-50 border border-stone-200 rounded-md px-4 text-zinc-900 focus:outline-none focus:border-zinc-400 dark:bg-black dark:border-zinc-800 dark:text-white dark:focus:border-zinc-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5 uppercase dark:text-zinc-300">Azienda / Rete *</label>
                  <input type="text" required placeholder="Broker Edili Italia SRL" className="w-full h-11 bg-stone-50 border border-stone-200 rounded-md px-4 text-zinc-900 focus:outline-none focus:border-zinc-400 dark:bg-black dark:border-zinc-800 dark:text-white dark:focus:border-zinc-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5 uppercase dark:text-zinc-300">Numero di Contatti in Portafoglio *</label>
                  <input type="number" required placeholder="150" className="w-full h-11 bg-stone-50 border border-stone-200 rounded-md px-4 text-zinc-900 focus:outline-none focus:border-zinc-400 dark:bg-black dark:border-zinc-800 dark:text-white dark:focus:border-zinc-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5 uppercase dark:text-zinc-300">Messaggio *</label>
                  <textarea required placeholder="Raccontaci della tua esperienza..." className="w-full h-24 bg-stone-50 border border-stone-200 rounded-md px-4 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400 dark:bg-black dark:border-zinc-800 dark:text-white dark:focus:border-zinc-500" />
                </div>
                <Button type="submit" className="w-full h-12 mt-6 bg-zinc-900 text-white hover:bg-zinc-800 font-semibold dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                  Invia Candidatura
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 py-12 text-zinc-500 text-xs bg-stone-100 text-center dark:border-white/10 dark:bg-black dark:text-zinc-600">
        <p>© 2026 Agrimensore SRLS. Tutti i diritti riservati.</p>
      </footer>
    </div>
  )
}
