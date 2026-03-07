import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Software Gestione Cantieri per PMI Edili | Agrimensore',
  description:
    'Agrimensore è il software SaaS per PMI edili che digitalizza i cantieri: documenti sempre in regola, tracciamento rischi in tempo reale, conformità normativa automatica. Risparmia ore di lavoro ogni settimana.',
  keywords: [
    'software gestionale cantieri',
    'app per edilizia',
    'gestione cantieri PMI',
    'digitalizzazione cantiere',
    'software sicurezza cantieri',
    'SaaS edilizia',
    'gestione cantieri',
    'software cantieri',
    'HSE management',
    'tracciamento rischi cantiere',
    'documentazione cantiere digitale',
    'software impresa edile',
    'patente a crediti edilizia',
    'conservazione documenti cantiere 10 anni',
    'DURC subappaltatori',
    'archivio documenti cantiere',
    'gestione documentale impresa edile',
    'documenti subappalto cantiere',
    'conformità normativa cantieri',
  ],
  authors: [{ name: 'Agrimensore SRLS' }],
  creator: 'Agrimensore SRLS',
  publisher: 'Agrimensore SRLS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.agrimensore.it',
    siteName: 'Agrimensore',
    title: 'Software Gestione Cantieri per PMI Edili | Agrimensore',
    description:
      'Digitalizza i tuoi cantieri con Agrimensore: documenti in regola, tracciamento rischi e conformità normativa in un unico software SaaS per imprese edili.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agrimensore - Software Gestione Cantieri per PMI Edili',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Gestione Cantieri per PMI Edili | Agrimensore',
    description:
      'Digitalizza i tuoi cantieri con Agrimensore: documenti in regola, tracciamento rischi e conformità normativa in un unico software SaaS.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.agrimensore.it',
    languages: {
      'it-IT': process.env.NEXT_PUBLIC_SITE_URL || 'https://www.agrimensore.it',
      'en-US': 'https://www.agrimensore.com',
    },
  },
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.agrimensore.it'

export const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Agrimensore',
    description:
      'Software SaaS per la gestione digitale dei cantieri edili: documenti, sicurezza, tracciamento rischi e conformità normativa per PMI del settore costruzioni.',
    url: BASE_URL,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '24',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Agrimensore SRLS',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
      width: 172,
      height: 322,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Piazza Buffoni 5',
      addressLocality: 'Gallarate',
      addressRegion: 'VA',
      postalCode: '21013',
      addressCountry: 'IT',
    },
    vatID: '04130840129',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "Cos'è la Patente a Crediti per i cantieri edili?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "La Patente a Crediti è un requisito obbligatorio dal 2024 per le imprese e i lavoratori autonomi che operano in cantieri edili. Richiede di avere sempre in regola tutta la documentazione di sicurezza e di subappalto. Agrimensore ti guida nella raccolta e conservazione di tutti i documenti necessari per ogni cantiere.",
        },
      },
      {
        '@type': 'Question',
        name: 'Per quanto tempo devo conservare i documenti del cantiere?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "La normativa italiana obbliga le imprese edili a conservare i documenti di cantiere per almeno 10 anni. Agrimensore garantisce l'archiviazione legale decennale su infrastruttura cloud AWS localizzata in Italia (Milano), in conformità GDPR.",
        },
      },
      {
        '@type': 'Question',
        name: 'Come gestisco i documenti dei subappaltatori?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Con Agrimensore puoi generare un link sicuro da inviare direttamente al tecnico o al subappaltatore. Il destinatario carica i documenti richiesti (DURC, certificati, ecc.) direttamente in piattaforma, senza bisogno di un account. Tu hai tutto centralizzato in un unico archivio per ogni cantiere.",
        },
      },
      {
        '@type': 'Question',
        name: 'I dati aziendali e dei cantieri sono al sicuro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Sì. Tutti i documenti sono ospitati su server AWS fisicamente localizzati a Milano, con crittografia avanzata e conformità GDPR garantita. Nessun dato è archiviato fuori dall'Italia.",
        },
      },
    ],
  },
]
