import {
  ShieldCheck,
  FileText,
  QrCode,
  GraduationCap,
  Truck,
  CalendarRange,
  Network,
  BellRing,
  Link as LinkIcon,
  type LucideIcon,
} from "lucide-react"

export type Pillar = {
  icon: LucideIcon
  accent: "emerald" | "blue" | "violet" | "amber" | "cyan" | "rose" | "indigo" | "teal" | "sky"
  title: string
  desc: string
  tags: string[]
}

/** Homepage audience strip — "Per chi è". */
export const AUDIENCE: { title: string; desc: string }[] = [
  { title: "Imprese edili", desc: "Cantieri, squadre e mezzi sempre in regola, senza rincorrere le scadenze." },
  { title: "Coordinatori sicurezza (CSE)", desc: "Verbali, trasparenza e documenti di sicurezza in un unico posto." },
  { title: "Direttori dei lavori", desc: "Cronoprogramma, giornale dei lavori e atti sempre aggiornati." },
  { title: "Studi tecnici e professionisti", desc: "Più committenti gestiti e documenti condivisi con un Magic Link." },
]

/**
 * The verified product pillars (Shop deliberately excluded — not live yet).
 * Every line maps to a shipped feature confirmed in the PWA inventory.
 */
export const PILLARS: Pillar[] = [
  {
    icon: ShieldCheck,
    accent: "emerald",
    title: "Motore di compliance",
    desc: "Non un archivio vuoto: il software ti dice quali documenti servono per essere a norma — DURC di congruità, Patente a Crediti, esenzione SOA III, notifica preliminare.",
    tags: ["DURC congruità", "Patente a Crediti", "SOA"],
  },
  {
    icon: FileText,
    accent: "blue",
    title: "13 verbali automatici",
    desc: "13 verbali e atti pronti in PDF — consegna lavori, sospensione, ripresa, fine lavori, sicurezza, CSE, scheda impresa — generati dai dati del cantiere, con controllo dei campi mancanti.",
    tags: ["Consegna Lavori", "Sicurezza", "CSE", "Fine lavori"],
  },
  {
    icon: QrCode,
    accent: "violet",
    title: "Trasparenza QR + verifica ispettore",
    desc: "Cartello A4/A3 con QR da affiggere al cancello, anche per opere pubbliche (CIG/CUP). L'ispettore inquadra, inserisce un PIN e verifica online la conformità: semaforo verde/giallo/rosso per ogni impresa.",
    tags: ["Cartello A4/A3", "PIN ispettore", "Opere pubbliche"],
  },
  {
    icon: GraduationCap,
    accent: "amber",
    title: "Squadra e Formazioni",
    desc: "Anagrafica lavoratori con stato di idoneità sanitaria e attestati (Generale, Specifica, Antincendio, Primo Soccorso, Ponteggi, RSPP, RLS) e relative scadenze. Ogni lavoratore ha un Badge con QR.",
    tags: ["Idoneità", "Formazioni", "Badge QR"],
  },
  {
    icon: Truck,
    accent: "teal",
    title: "Mezzi e Attrezzature",
    desc: "Libretti, verifiche periodiche e manutenzioni di gru, PLE, ponteggi e macchine sempre sotto controllo, con scadenze e percentuale di conformità.",
    tags: ["Libretti", "Revisioni", "Manutenzioni"],
  },
  {
    icon: CalendarRange,
    accent: "indigo",
    title: "Cronoprogramma e Giornale dei Lavori",
    desc: "Pianifica le lavorazioni con dipendenze, percorso critico (CPM) e baseline congelabile. Compila il Giornale dei Lavori con meteo e annotazioni, esportabile in PDF.",
    tags: ["Gantt", "CPM", "Giornale Lavori"],
  },
  {
    icon: Network,
    accent: "cyan",
    title: "Imprese e Subappalti",
    desc: "Mappa la catena dei subappalti — affidataria, subappaltatore, lavoratore autonomo — e segui l'avanzamento documentale di ogni ditta.",
    tags: ["Affidataria", "Subappalto", "Lav. autonomo"],
  },
  {
    icon: BellRing,
    accent: "rose",
    title: "Scadenze sotto controllo",
    desc: "Avvisi automatici a 30, 14, 7 e 1 giorno e a scaduto — DURC, licenze, documenti, mezzi — via notifica in-app, email e push. Non ti scappa più una scadenza.",
    tags: ["Push", "Email", "30/14/7/1 gg"],
  },
  {
    icon: LinkIcon,
    accent: "sky",
    title: "Magic Link e Collaboratori",
    desc: "Chiedi i documenti a imprese e tecnici esterni con un link monouso, senza farli registrare. Lavora in team con ruoli (Owner/Admin/Editor/Viewer).",
    tags: ["Magic Link", "Ruoli", "Team"],
  },
]

/** FAQ — existing 6 (data answer updated) + 4 new accurate entries. */
export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Che cos'è Agrimensore?",
    a: "Agrimensore è una piattaforma web (PWA) per la gestione documentale e la conformità dei cantieri edili. Gestisce imprese, lavoratori, mezzi, documenti di conformità, verbali, cronoprogramma e QR code di trasparenza — tutto in un'unica piattaforma accessibile da browser.",
  },
  {
    q: "Il software genera POS o DUVRI?",
    a: "No. Agrimensore non genera POS né DUVRI. Il software genera automaticamente i verbali di cantiere (consegna lavori, sicurezza, coordinamento, ecc.) in base alle caratteristiche del progetto, e gestisce tutta la documentazione di conformità.",
  },
  {
    q: "A cosa serve il QR Code di trasparenza?",
    a: "Il QR Code soddisfa l'obbligo di trasparenza previsto dal D.Lgs. 81/2008. Viene stampato su un cartello A4 o A3 da affiggere all'ingresso del cantiere. Chi lo scansiona vede l'elenco delle imprese presenti; un ispettore che inserisce un PIN accede al Livello 2 e verifica il semaforo verde/giallo/rosso di conformità di ogni impresa. Tutto tracciato e GDPR-compliant.",
  },
  {
    q: "Ricevo avvisi prima delle scadenze?",
    a: "Sì. Agrimensore invia notifiche automatiche a 30, 14, 7 e 1 giorno e a scaduto — per DURC, licenze, documenti e mezzi — via notifica in-app, email e push (anche ad app chiusa).",
  },
  {
    q: "Posso gestire anche mezzi e attrezzature?",
    a: "Sì. Puoi tracciare libretti, verifiche periodiche e manutenzioni di gru, PLE, ponteggi e macchine, con le relative scadenze e una percentuale di conformità sempre aggiornata.",
  },
  {
    q: "L'app è disponibile in altre lingue?",
    a: "Sì. L'interfaccia è disponibile in italiano, inglese, francese e spagnolo. Agrimensore è una PWA installabile su iPhone, Android e desktop come un'app nativa.",
  },
  {
    q: "Dove sono custoditi i miei dati?",
    a: "I dati dei cantieri sono custoditi su server AWS nella regione eu-south-1 (Milano), con backup giornalieri e versioning S3 su ogni documento. Nota: l'invio delle email transazionali avviene tramite un servizio che opera anche fuori da tale regione, ma nessun documento o codice fiscale di cantiere transita in queste email.",
  },
  {
    q: "Posso condividere documenti con tecnici esterni?",
    a: "Sì. Puoi generare un Magic Link monouso da inviare al tecnico esterno. Senza bisogno di creare un account, il destinatario può caricare il documento richiesto direttamente in piattaforma.",
  },
  {
    q: "Posso cancellare il mio account e i miei dati?",
    a: "Sì. In conformità al GDPR (Art. 17 — Diritto alla cancellazione), è disponibile un endpoint dedicato che anonimizza tutti i dati personali associati al tuo account.",
  },
]
