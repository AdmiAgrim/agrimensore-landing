"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ContactModal } from "@/components/ContactModal"
import { motion, useInView } from "framer-motion"
import { AUDIENCE, PILLARS, FAQ_ITEMS } from "@/lib/features"
import {
  HardHat,
  FileWarning,
  SearchX,
  ShieldCheck,
  Link as LinkIcon,
  FolderLock,
  ArrowRight,
  QrCode,
  Users,
  ChevronRight,
  Check,
  X,
  Shield,
  Database,
  Lock,
  CloudUpload,
  Smartphone,
  Menu,
  XIcon,
  Apple,
  Monitor,
  Download,
  Share,
  MoreVertical,
} from "lucide-react"

/* ───────────────────────── platform detection ───────────────────────── */

type Platform = "ios" | "android" | "desktop" | "unknown"

const INSTALL_PLATFORMS: Array<{
  id: Platform
  label: string
  icon: typeof Smartphone
  accent: string
  steps: Array<{ icon?: typeof Share; text: React.ReactNode }>
}> = [
  {
    id: "ios",
    label: "iPhone / iPad",
    icon: Apple,
    accent: "sky",
    steps: [
      { text: <>Apri <strong>app.agrimensore.com</strong> in Safari.</> },
      { icon: Share, text: <>Tocca l&apos;icona <strong>Condividi</strong> in basso (quadrato con freccia ↑).</> },
      { text: <>Scorri e tocca <strong>&quot;Aggiungi a schermata Home&quot;</strong>.</> },
      { text: <>Conferma con <strong>&quot;Aggiungi&quot;</strong> in alto a destra.</> },
    ],
  },
  {
    id: "android",
    label: "Android (Chrome)",
    icon: Smartphone,
    accent: "emerald",
    steps: [
      { text: <>Apri <strong>app.agrimensore.com</strong> in Chrome.</> },
      { icon: MoreVertical, text: <>Tocca il menu <strong>⋮</strong> in alto a destra.</> },
      { text: <>Tocca <strong>&quot;Aggiungi a schermata Home&quot;</strong> o accetta il banner di installazione.</> },
      { text: <>Conferma toccando <strong>&quot;Installa&quot;</strong>.</> },
    ],
  },
  {
    id: "desktop",
    label: "Desktop (Chrome / Edge)",
    icon: Monitor,
    accent: "indigo",
    steps: [
      { text: <>Apri <strong>app.agrimensore.com</strong> in Chrome o Edge.</> },
      { icon: Download, text: <>Clicca l&apos;icona <strong>Installa</strong> nella barra degli indirizzi.</> },
      { text: <>Clicca <strong>&quot;Installa&quot;</strong> nel popup.</> },
      { text: <>L&apos;app si apre come finestra dedicata, sempre a portata di click.</> },
    ],
  },
]

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown"
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/i.test(ua) && !/CriOS/i.test(ua)) return "ios"
  if (/Android/i.test(ua)) return "android"
  if (/Chrome|Edg/i.test(ua)) return "desktop"
  return "unknown"
}

/* ───────────────────────── constants ───────────────────────── */

const APP_URL = "https://app.agrimensore.com"

const PLANS = {
  trial: {
    name: "Trial",
    badge: "Gratuito",
    cantieri: "1",
    collaboratori: "1 (titolare)",
    storage: "200 MB",
    monthly: 0,
    yearly: 0,
    features: ["Gestione documenti", "Verbali e rapporti PDF", "QR code trasparenza"],
    excluded: ["Squadra e Formazioni", "Mezzi e Attrezzature", "Supporto prioritario"],
    cta: "Inizia Gratis",
    ctaVariant: "outline" as const,
    highlight: false,
    duration: "7 giorni",
  },
  starter: {
    name: "Starter",
    badge: null,
    cantieri: "3",
    collaboratori: "3",
    storage: "5 GB",
    monthly: 48,
    yearly: 480,
    features: ["Gestione documenti", "Verbali e rapporti PDF", "QR code trasparenza"],
    excluded: ["Squadra e Formazioni", "Mezzi e Attrezzature", "Supporto prioritario"],
    cta: "Scegli Starter",
    ctaVariant: "outline" as const,
    highlight: false,
    duration: null,
  },
  professional: {
    name: "Professional",
    badge: "Consigliato",
    cantieri: "10",
    collaboratori: "10",
    storage: "20 GB",
    monthly: 96,
    yearly: 960,
    features: [
      "Gestione documenti",
      "Verbali e rapporti PDF",
      "QR code trasparenza",
      "Squadra e Formazioni",
      "Mezzi e Attrezzature",
    ],
    excluded: ["Supporto prioritario"],
    cta: "Scegli Professional",
    ctaVariant: "default" as const,
    highlight: true,
    duration: null,
  },
  business: {
    name: "Business",
    badge: null,
    cantieri: "20",
    collaboratori: "15",
    storage: "50 GB",
    monthly: 150,
    yearly: 1500,
    features: [
      "Gestione documenti",
      "Verbali e rapporti PDF",
      "QR code trasparenza",
      "Squadra e Formazioni",
      "Mezzi e Attrezzature",
      "Supporto prioritario",
    ],
    excluded: [],
    cta: "Contattaci",
    ctaVariant: "outline" as const,
    highlight: false,
    duration: null,
  },
}

// FAQ_ITEMS sourced from @/lib/features

const PILLAR_ACCENT: Record<string, string> = {
  emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
  blue: "bg-blue-50 border-blue-100 text-blue-600",
  violet: "bg-violet-50 border-violet-100 text-violet-600",
  amber: "bg-amber-50 border-amber-100 text-amber-600",
  cyan: "bg-cyan-50 border-cyan-100 text-cyan-600",
  rose: "bg-rose-50 border-rose-100 text-rose-600",
  indigo: "bg-indigo-50 border-indigo-100 text-indigo-600",
  teal: "bg-teal-50 border-teal-100 text-teal-600",
  sky: "bg-sky-50 border-sky-100 text-sky-600",
}

/* ───────────────────────── helpers ───────────────────────── */

const withVat = (price: number) => Math.round(price * 1.22)

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ───────────────────────── page ───────────────────────── */

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [detectedPlatform, setDetectedPlatform] = useState<Platform>("unknown")

  useEffect(() => {
    setDetectedPlatform(detectPlatform())
  }, [])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const t = (key: string) => key // stub for ContactModal compatibility

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tighter flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Agrimensore" className="h-7 w-7 object-contain" />
            <span className="text-sm font-semibold">Agrimensore</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-500 absolute left-1/2 -translate-x-1/2">
            <button onClick={() => scrollToSection("problema")} className="hover:text-zinc-900 transition-colors">
              Il Problema
            </button>
            <button onClick={() => scrollToSection("soluzione")} className="hover:text-zinc-900 transition-colors">
              La Soluzione
            </button>
            <button onClick={() => scrollToSection("installa")} className="hover:text-zinc-900 transition-colors">
              Installa
            </button>
            <button onClick={() => scrollToSection("sicurezza")} className="hover:text-zinc-900 transition-colors">
              Sicurezza
            </button>
            <button onClick={() => scrollToSection("prezzi")} className="hover:text-zinc-900 transition-colors">
              Prezzi
            </button>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a
              href={APP_URL}
              className="hidden sm:inline-flex text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Accedi
            </a>
            <a href={APP_URL}>
              <Button className="bg-zinc-900 text-white hover:bg-zinc-800 text-sm h-9 px-4 font-semibold">
                Prova Gratis
              </Button>
            </a>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-zinc-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-100 bg-white"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <button onClick={() => scrollToSection("problema")} className="text-sm text-zinc-600 text-left py-2">
                Il Problema
              </button>
              <button onClick={() => scrollToSection("soluzione")} className="text-sm text-zinc-600 text-left py-2">
                La Soluzione
              </button>
              <button onClick={() => scrollToSection("installa")} className="text-sm text-zinc-600 text-left py-2">
                Installa
              </button>
              <button onClick={() => scrollToSection("sicurezza")} className="text-sm text-zinc-600 text-left py-2">
                Sicurezza
              </button>
              <button onClick={() => scrollToSection("prezzi")} className="text-sm text-zinc-600 text-left py-2">
                Prezzi
              </button>
              <a href={APP_URL} className="text-sm text-zinc-600 py-2">
                Accedi
              </a>
            </div>
          </motion.div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/50 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />

        <div className="relative container mx-auto px-4 pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 flex flex-col items-center text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-8 py-1.5 px-4 text-xs font-medium border border-emerald-200 text-emerald-700 rounded-full bg-emerald-50/80">
              <ShieldCheck className="w-3.5 h-3.5" />
              Gestione cantieri conforme D.Lgs. 81/2008
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-500 leading-[1.1]">
              Ogni cantiere a norma.
              <br />
              Ogni documento sotto controllo.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-zinc-500 max-w-2xl mb-10 leading-relaxed font-light">
              Il software ti dice quali documenti servono, genera i verbali, e tiene sotto controllo squadre, mezzi e scadenze. Cartello QR di trasparenza e dati custoditi a Milano. La piattaforma che mette il tuo cantiere a norma.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a href={APP_URL}>
                <Button
                  size="lg"
                  className="bg-zinc-900 text-white hover:bg-zinc-800 h-13 px-8 font-semibold text-base w-full sm:w-auto shadow-lg shadow-zinc-900/10 hover:shadow-xl hover:shadow-zinc-900/15 transition-all"
                >
                  Prova Gratis — 7 Giorni
                </Button>
              </a>
              <Button
                onClick={() => scrollToSection("soluzione")}
                size="lg"
                variant="outline"
                className="border-zinc-200 hover:bg-zinc-50 text-zinc-600 h-13 px-8 text-base group"
              >
                Scopri le funzionalità
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </FadeIn>

          {/* Trust badges */}
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-12 text-sm text-zinc-500 font-medium">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-zinc-100 shadow-sm">
                <span className="text-sm">🇨🇭</span>
                <span>Swiss Precision</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-300" />
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-zinc-100 shadow-sm">
                <span className="text-sm">🇮🇹</span>
                <span>Dati custoditi a Milano</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-300" />
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-zinc-100 shadow-sm">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── TECH PARTNERS BAR ─── */}
      <section className="border-y border-zinc-100 bg-zinc-50/50 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-medium text-zinc-400 uppercase tracking-widest mb-6">
            Costruito su infrastruttura enterprise
          </p>
          <div className="flex items-center justify-center gap-10 sm:gap-16 opacity-40 grayscale">
            <span className="text-sm font-bold text-zinc-600 tracking-tight">Amazon Web Services</span>
            <span className="text-sm font-bold text-zinc-600 tracking-tight">Stripe</span>
            <span className="text-sm font-bold text-zinc-600 tracking-tight">eu-south-1 · Milano</span>
          </div>
        </div>
      </section>

      {/* ─── PER CHI È ─── */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Per chi è</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Pensata per chi vive il cantiere
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {AUDIENCE.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-zinc-800 mb-2">{a.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IL PROBLEMA ─── */}
      <section id="problema" className="py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Il problema</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Le normative cambiano.
                <br className="hidden sm:block" />
                Il disordine non è più perdonato.
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto text-base sm:text-lg font-light">
                Tra Patente a Crediti e obbligo di conservazione, gestire i cantieri su WhatsApp
                o cartelline fisiche significa esporsi al fermo lavori.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: SearchX,
                title: "Il labirinto dei file",
                desc: "Ore perse a cercare quel documento specifico mandato tre mesi fa per email, mescolato tra mille altre comunicazioni.",
              },
              {
                icon: FileWarning,
                title: "Normative impazzite",
                desc: "La frustrazione di non sapere mai al 100% se per quel lavoro in subappalto hai tutta la documentazione in regola.",
              },
              {
                icon: HardHat,
                title: "Tecnici bloccati",
                desc: "L'ingegnere deve redigere documenti per il cantiere ma perde giornate intere a rincorrerti per le scartoffie valide.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="bg-white border-zinc-100 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-300 h-full">
                  <CardContent className="pt-8 pb-8 px-8">
                    <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-6">
                      <item.icon className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3 text-zinc-800">{item.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LA SOLUZIONE — BENTO GRID ─── */}
      <section id="soluzione" className="py-16 sm:py-20 md:py-28 bg-zinc-50 border-y border-zinc-100">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">La soluzione</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Un unico ambiente.
                <br className="hidden sm:block" />
                Tutto pronto all&apos;uso.
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto text-base sm:text-lg font-light">
                Dalla compliance ai verbali, dai mezzi alle scadenze: un assistente che organizza il cantiere per te e i tuoi collaboratori.
              </p>
            </div>
          </FadeIn>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <FadeIn key={p.title} delay={(i % 3) * 0.08}>
                  <Card className="bg-white border-zinc-100 shadow-sm hover:shadow-md transition-all h-full group">
                    <CardContent className="p-7 flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${PILLAR_ACCENT[p.accent]}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-zinc-800">{p.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-zinc-50 text-zinc-600 px-2.5 py-1 rounded-md font-medium border border-zinc-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── COME FUNZIONA ─── */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Come funziona</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Tre passaggi. Sei a norma.
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                icon: FolderLock,
                title: "Crea il cantiere",
                desc: "Inserisci i dati del progetto: indirizzo, committente, importo, date. Il sistema genera automaticamente i verbali e i documenti richiesti.",
              },
              {
                step: "02",
                icon: Users,
                title: "Aggiungi imprese e documenti",
                desc: "Associa imprese e lavoratori. Carica i documenti o invia Magic Link ai tecnici esterni. Il sistema traccia scadenze e conformità.",
              },
              {
                step: "03",
                icon: QrCode,
                title: "Stampa il QR e sei a norma",
                desc: "Genera il cartello di trasparenza con QR Code. Affiggilo all'ingresso del cantiere. Ispezione? Due clic e tutto è pronto.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="text-center group">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-zinc-50 border border-zinc-100 mb-6 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                    <item.icon className="w-8 h-8 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                  {i < 2 && (
                    <ChevronRight className="hidden md:block w-5 h-5 text-zinc-300 absolute right-0 top-1/2 -translate-y-1/2" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSTALLA L'APP ─── */}
      <section id="installa" className="py-16 sm:py-20 md:py-28 bg-zinc-50 border-y border-zinc-100">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">
                Come installare l&apos;app
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Installala come un&apos;app nativa
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto text-base sm:text-lg font-light">
                Agrimensore è una <strong>Progressive Web App</strong>: aggiungila alla schermata Home
                del tuo dispositivo per aprirla in un tap, come un&apos;app nativa. Niente App Store, niente
                installazioni complesse.
              </p>
              {detectedPlatform !== "unknown" && (
                <p className="text-sm text-emerald-700 mt-4 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full">
                  <Smartphone className="w-3.5 h-3.5" />
                  Stiamo rilevando: <strong>
                    {detectedPlatform === "ios" ? "iPhone / iPad" : detectedPlatform === "android" ? "Android" : "Desktop"}
                  </strong>
                </p>
              )}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {INSTALL_PLATFORMS.map((platform, i) => {
              const Icon = platform.icon
              const isDetected = detectedPlatform === platform.id
              const accentBg =
                platform.accent === "sky"
                  ? "bg-sky-50 border-sky-100"
                  : platform.accent === "emerald"
                    ? "bg-emerald-50 border-emerald-100"
                    : "bg-indigo-50 border-indigo-100"
              const accentText =
                platform.accent === "sky"
                  ? "text-sky-600"
                  : platform.accent === "emerald"
                    ? "text-emerald-600"
                    : "text-indigo-600"
              const accentRing =
                platform.accent === "sky"
                  ? "ring-sky-300"
                  : platform.accent === "emerald"
                    ? "ring-emerald-300"
                    : "ring-indigo-300"

              return (
                <FadeIn key={platform.id} delay={i * 0.1}>
                  <Card
                    className={`bg-white border-zinc-100 shadow-sm hover:shadow-md transition-all h-full ${
                      isDetected ? `ring-2 ${accentRing} shadow-md` : ""
                    }`}
                  >
                    <CardContent className="p-7 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${accentBg}`}>
                          <Icon className={`w-6 h-6 ${accentText}`} />
                        </div>
                        {isDetected && (
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${accentBg} ${accentText}`}>
                            Il tuo dispositivo
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-4 text-zinc-800">{platform.label}</h3>
                      <ol className="space-y-3 flex-1">
                        {platform.steps.map((step, j) => {
                          const StepIcon = step.icon
                          return (
                            <li key={j} className="flex items-start gap-3 text-sm text-zinc-600 leading-relaxed">
                              <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${accentBg} ${accentText}`}>
                                {j + 1}
                              </span>
                              <span className="flex-1">
                                {StepIcon && (
                                  <StepIcon className={`inline-block w-3.5 h-3.5 mr-1 mb-0.5 ${accentText}`} />
                                )}
                                {step.text}
                              </span>
                            </li>
                          )
                        })}
                      </ol>
                    </CardContent>
                  </Card>
                </FadeIn>
              )
            })}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-12 text-center">
              <a href={APP_URL}>
                <Button
                  size="lg"
                  className="bg-zinc-900 text-white hover:bg-zinc-800 h-12 px-8 font-semibold text-base shadow-lg shadow-zinc-900/10 hover:shadow-xl hover:shadow-zinc-900/15 transition-all"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Apri l&apos;app per installare
                </Button>
              </a>
              <p className="text-xs text-zinc-400 mt-4 max-w-md mx-auto">
                Su Chrome ed Edge, l&apos;app proporrà l&apos;installazione automaticamente. Su iPhone, segui i passi qui sopra.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── SICUREZZA E AFFIDABILITÀ ─── */}
      <section id="sicurezza" className="py-16 sm:py-20 md:py-28 bg-zinc-900 text-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">
                Sicurezza e Affidabilità
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                I tuoi dati. In Italia. Al sicuro.
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg font-light">
                Infrastruttura enterprise su AWS Milano. Zero compromessi sulla protezione dei dati.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Database,
                title: "Dati custoditi a Milano",
                items: [
                  "Server AWS eu-south-1 (Milano). Nessun dato fuori dall'Italia.",
                  "Piena conformità GDPR — nessun trasferimento extra-UE per i dati dei cantieri.",
                  "Infrastruttura cloud con alta disponibilità e ridondanza.",
                ],
              },
              {
                icon: CloudUpload,
                title: "Backup giornalieri automatici",
                items: [
                  "Snapshot giornalieri del database con conservazione 30 giorni.",
                  "Versioning S3 attivo per ogni documento caricato.",
                  "Alert automatici in caso di anomalie sui backup.",
                ],
              },
              {
                icon: Lock,
                title: "Crittografia e protezione",
                items: [
                  "Crittografia in transito (TLS) e a riposo (AES-256) su tutti i dati.",
                  "Accesso ai documenti tramite URL firmati con scadenza temporale.",
                  "Logging degli accessi con pseudonimizzazione IP (GDPR compliant).",
                ],
              },
              {
                icon: Shield,
                title: "GDPR — Diritto alla cancellazione",
                items: [
                  "Endpoint dedicato per l'anonimizzazione di tutti i dati personali (Art. 17).",
                  "Audit log di sicurezza per login, registrazioni e reset password.",
                  "Purge automatico dei log di accesso pubblico dopo 90 giorni.",
                ],
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
                  <card.icon className="w-8 h-8 text-emerald-400 mb-5" />
                  <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
                  <ul className="space-y-3">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-zinc-300">
                        <span className="text-emerald-400 mt-0.5 shrink-0">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <p className="text-center text-xs text-zinc-500 mt-8 max-w-3xl mx-auto">
              I dati dei cantieri restano nella regione di Milano (eu-south-1). L&apos;invio delle email transazionali avviene tramite un servizio che opera anche fuori da tale regione; nessun documento o codice fiscale di cantiere transita in queste email.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="prezzi" className="py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Prezzi</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Scegli il piano adatto a te
              </h2>
              <p className="text-zinc-500 max-w-xl mx-auto text-base font-light mb-8">
                Tutti i prezzi sono al netto di IVA 22%. Annuale = 2 mesi gratis.
              </p>

              {/* Billing toggle */}
              <div className="inline-flex items-center bg-zinc-100 rounded-full p-1">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === "monthly" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
                  }`}
                >
                  Mensile
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    billingCycle === "yearly" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
                  }`}
                >
                  Annuale
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                    -2 mesi
                  </span>
                </button>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {Object.entries(PLANS).map(([key, plan], i) => (
              <FadeIn key={key} delay={i * 0.08}>
                <Card
                  className={`relative h-full flex flex-col transition-all ${
                    plan.highlight
                      ? "bg-zinc-900 text-white border-zinc-800 shadow-xl shadow-zinc-900/10 scale-[1.02]"
                      : "bg-white border-zinc-100 shadow-sm hover:shadow-md"
                  }`}
                >
                  {plan.badge && (
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        plan.highlight
                          ? "bg-emerald-500 text-white"
                          : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                      }`}
                    >
                      {plan.badge}
                    </div>
                  )}
                  <CardContent className="pt-8 px-6 pb-6 flex-1 flex flex-col">
                    <h3
                      className={`text-lg font-bold mb-4 ${plan.highlight ? "text-white" : "text-zinc-900"}`}
                    >
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-6">
                      {plan.monthly === 0 ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-extrabold">€0</span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-extrabold">
                            €{billingCycle === "yearly" ? Math.round(plan.yearly / 12) : plan.monthly}
                          </span>
                          <span className={`text-sm ${plan.highlight ? "text-zinc-400" : "text-zinc-500"}`}>
                            /mese
                          </span>
                        </div>
                      )}
                      {plan.yearly > 0 && billingCycle === "yearly" && (
                        <p className={`text-xs mt-1 ${plan.highlight ? "text-zinc-400" : "text-zinc-500"}`}>
                          €{plan.yearly}/anno fatturato
                        </p>
                      )}
                      {plan.duration && (
                        <p className={`text-xs mt-1 ${plan.highlight ? "text-zinc-400" : "text-zinc-500"}`}>
                          {plan.duration}
                        </p>
                      )}
                    </div>

                    {/* Limits */}
                    <div className={`text-sm space-y-2 mb-6 pb-6 border-b ${plan.highlight ? "border-zinc-700" : "border-zinc-100"}`}>
                      <div className="flex justify-between">
                        <span className={plan.highlight ? "text-zinc-400" : "text-zinc-500"}>Cantieri attivi</span>
                        <span className="font-semibold">{plan.cantieri}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={plan.highlight ? "text-zinc-400" : "text-zinc-500"}>Collaboratori</span>
                        <span className="font-semibold">{plan.collaboratori}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={plan.highlight ? "text-zinc-400" : "text-zinc-500"}>Archiviazione</span>
                        <span className="font-semibold">{plan.storage}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2.5 flex-1 mb-6">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-center gap-2.5 text-sm">
                          <Check
                            className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-emerald-400" : "text-emerald-500"}`}
                          />
                          <span className={plan.highlight ? "text-zinc-300" : "text-zinc-600"}>{f}</span>
                        </div>
                      ))}
                      {plan.excluded.map((f) => (
                        <div key={f} className="flex items-center gap-2.5 text-sm">
                          <X className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-zinc-600" : "text-zinc-300"}`} />
                          <span className={plan.highlight ? "text-zinc-600" : "text-zinc-400"}>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    {key === "business" ? (
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        variant="outline"
                        className="w-full h-11 font-semibold border-zinc-200 hover:bg-zinc-50"
                      >
                        {plan.cta}
                      </Button>
                    ) : (
                      <a href={APP_URL} className="w-full">
                        <Button
                          className={`w-full h-11 font-semibold ${
                            plan.highlight
                              ? "bg-emerald-500 text-white hover:bg-emerald-600"
                              : plan.ctaVariant === "outline"
                                ? "border-zinc-200 hover:bg-zinc-50 bg-white text-zinc-900"
                                : "bg-zinc-900 text-white hover:bg-zinc-800"
                          }`}
                        >
                          {plan.cta}
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="text-center text-xs text-zinc-400 mt-8">
              Prezzi al netto di IVA 22% · Nessuna carta di credito richiesta per la prova gratuita
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 sm:py-20 md:py-28 bg-zinc-50 border-y border-zinc-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Domande frequenti</h2>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left bg-white border border-zinc-100 rounded-xl p-5 hover:border-zinc-200 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-zinc-800 text-sm sm:text-base pr-4">{item.q}</h3>
                    <ChevronRight
                      className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${
                        openFaq === i ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                  {openFaq === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-zinc-500 text-sm leading-relaxed mt-3 pr-8"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 pointer-events-none" />
        <div className="relative container mx-auto px-4 text-center max-w-2xl">
          <FadeIn>
            <HardHat className="w-12 h-12 mx-auto mb-6 text-zinc-300" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Pronto a digitalizzare i tuoi cantieri?
            </h2>
            <p className="text-zinc-500 text-lg mb-8 font-light">
              Inizia gratis. 7 giorni per provare tutte le funzionalità.
              Nessuna carta di credito richiesta.
            </p>
            <a href={APP_URL}>
              <Button
                size="lg"
                className="bg-zinc-900 text-white hover:bg-zinc-800 h-14 px-10 font-semibold text-base shadow-lg shadow-zinc-900/10 hover:shadow-xl transition-all"
              >
                Inizia Gratis — 7 Giorni
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-zinc-100 py-10 text-zinc-500 text-xs bg-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Agrimensore" className="h-5 w-5 object-contain" />
              <strong className="text-zinc-700 text-sm font-semibold">Agrimensore SRLS</strong>
            </div>
            <p className="text-xs leading-relaxed">
              Piazza Buffoni 5<br />
              21013 Gallarate (VA)
            </p>
          </div>
          <div>
            <strong className="text-zinc-700 text-sm block mb-3 font-medium">Prodotto</strong>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection("soluzione")} className="hover:text-zinc-800 transition-colors">
                  Funzionalità
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("prezzi")} className="hover:text-zinc-800 transition-colors">
                  Prezzi
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("sicurezza")} className="hover:text-zinc-800 transition-colors">
                  Sicurezza
                </button>
              </li>
            </ul>
          </div>
          <div>
            <strong className="text-zinc-700 text-sm block mb-3 font-medium">Legale</strong>
            <ul className="space-y-2">
              <li>
                <a href="/termini-e-condizioni" className="hover:text-zinc-800 transition-colors">
                  Termini e Condizioni
                </a>
                <span>·</span>
                <a href="/privacy" className="hover:text-zinc-800 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/cookie" className="hover:text-zinc-800 transition-colors">
                  Informativa Cookie
                </a>
              </li>
            </ul>
          </div>
          <div>
            <strong className="text-zinc-700 text-sm block mb-3 font-medium">Dati Societari</strong>
            <p className="mb-1">P.IVA / C.F.: 04130840129</p>
            <p className="mb-1">REA: VA-404094</p>
            <p className="mb-1">Registro Imprese di Varese</p>
            <p>Capitale: € 1.000,00 i.v.</p>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-6 border-t border-zinc-100 text-center text-zinc-400 text-xs">
          <p>© 2026 Agrimensore SRLS. Tutti i diritti riservati.</p>
        </div>
      </footer>

      {/* Contact Modal (Business tier) */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} t={t} />

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/90 backdrop-blur-xl border-t border-zinc-100 p-3">
        <a href={APP_URL} className="block">
          <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 h-12 font-semibold">
            Prova Gratis — 7 Giorni
          </Button>
        </a>
      </div>
    </div>
  )
}
