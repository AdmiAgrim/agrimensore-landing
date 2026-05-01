import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

const SITE_URL = "https://agrimensore.it";
const APP_URL = "https://app.agrimensore.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Agrimensore — Gestione Cantieri Digitale",
  description:
    "Piattaforma per la gestione documentale del cantiere: verbali automatici, QR Code di trasparenza D.Lgs. 81/2008, gestione imprese e subappalti. Dati custoditi a Milano.",
  keywords: [
    "gestione cantieri",
    "software cantiere",
    "verbali cantiere",
    "QR code cantiere",
    "D.Lgs. 81/2008",
    "sicurezza cantiere",
    "gestione documenti cantiere",
    "imprese edili",
    "geometra",
    "capocantiere",
    "subappalti",
    "cartello trasparenza",
    "badge lavoratore",
    "SaaS costruzioni",
    "PWA cantiere",
  ],
  authors: [{ name: "Agrimensore SRLS", url: SITE_URL }],
  creator: "Agrimensore SRLS",
  publisher: "Agrimensore SRLS",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    title: "Agrimensore — Gestione Cantieri Digitale",
    description:
      "Verbali automatici, QR Code di trasparenza, gestione imprese e subappalti. Dati custoditi a Milano. Provalo gratis.",
    siteName: "Agrimensore",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Agrimensore — Gestione Cantieri Digitale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agrimensore — Gestione Cantieri Digitale",
    description:
      "Verbali automatici, QR Code di trasparenza, gestione imprese e subappalti. Dati custoditi a Milano.",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
};

export const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Agrimensore",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Piattaforma per la gestione documentale del cantiere: verbali automatici, QR Code di trasparenza, gestione imprese e subappalti.",
    offers: [
      {
        "@type": "Offer",
        name: "Trial",
        price: "0",
        priceCurrency: "EUR",
        description: "1 cantiere, 7 giorni gratuiti",
        url: APP_URL,
      },
      {
        "@type": "Offer",
        name: "Starter",
        price: "48",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "48",
          priceCurrency: "EUR",
          unitText: "MONTH",
          valueAddedTaxIncluded: false,
        },
        description: "3 cantieri, 3 collaboratori, 5 GB",
        url: APP_URL,
      },
      {
        "@type": "Offer",
        name: "Professional",
        price: "96",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "96",
          priceCurrency: "EUR",
          unitText: "MONTH",
          valueAddedTaxIncluded: false,
        },
        description: "10 cantieri, 10 collaboratori, 20 GB",
        url: APP_URL,
      },
      {
        "@type": "Offer",
        name: "Business",
        price: "150",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "150",
          priceCurrency: "EUR",
          unitText: "MONTH",
          valueAddedTaxIncluded: false,
        },
        description: "20 cantieri, 15 collaboratori, 50 GB",
        url: APP_URL,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Agrimensore SRLS",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Piazza Buffoni 5",
        addressLocality: "Gallarate",
        addressRegion: "VA",
        postalCode: "21013",
        addressCountry: "IT",
      },
      vatID: "04130840129",
    },
    applicationSubCategory: "Construction Management",
    featureList: [
      "Verbali automatici",
      "QR Code trasparenza D.Lgs. 81/2008",
      "Badge digitale lavoratore",
      "Gestione imprese e subappalti",
      "Magic link per documenti",
      "Backup giornalieri",
      "Dati custoditi a Milano (AWS eu-south-1)",
      "GDPR compliant",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Agrimensore SRLS",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 172,
      height: 322,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Piazza Buffoni 5",
      addressLocality: "Gallarate",
      addressRegion: "VA",
      postalCode: "21013",
      addressCountry: "IT",
    },
    vatID: "04130840129",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Cos'è Agrimensore?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Agrimensore è una piattaforma web (PWA) per la gestione documentale del cantiere. Permette di generare verbali automatici, creare QR Code di trasparenza conformi al D.Lgs. 81/2008, e gestire imprese, subappalti e documenti.",
        },
      },
      {
        "@type": "Question",
        name: "Dove sono conservati i miei dati?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tutti i dati sono custoditi su server AWS a Milano (regione eu-south-1). Nessun dato viene trasferito al di fuori dell'Italia. I backup automatici giornalieri garantiscono la sicurezza dei dati con conservazione di 30 giorni.",
        },
      },
      {
        "@type": "Question",
        name: "Come funziona il QR Code di trasparenza?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Il sistema genera un cartello A4/A3 con QR Code da esporre all'ingresso del cantiere, come richiesto dal D.Lgs. 81/2008. Il QR Code porta ad una pagina pubblica che mostra lo stato di conformità documentale delle imprese presenti in cantiere, con sistema a semaforo (verde/giallo/rosso).",
        },
      },
      {
        "@type": "Question",
        name: "Posso condividere documenti con tecnici esterni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, tramite la funzione Magic Link puoi inviare un link sicuro e monouso a tecnici o consulenti esterni. Possono caricare documenti senza bisogno di creare un account.",
        },
      },
      {
        "@type": "Question",
        name: "Il software è conforme al GDPR?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, Agrimensore è pienamente conforme al GDPR. Implementa il diritto alla cancellazione (Art. 17) con un endpoint dedicato che anonimizza tutti i dati personali. I dati restano in Italia (AWS Milano), e ogni azione di autenticazione è registrata in un audit log.",
        },
      },
    ],
  },
];
