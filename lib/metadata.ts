import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agrimensore | Gestione Cantieri Digitale - Italia & Svizzera',
  description:
    'Soluzione all-in-one per gestire cantieri senza caos. Documentazione, tracciamento rischi e conformità normativa. Pensata per professionisti e imprese edili.',
  keywords: [
    'gestione cantieri',
    'software cantieri',
    'edilizia digitale',
    'HSE management',
    'tracciamento rischi',
    'documentazione cantiere',
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
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://agrimensore.it',
    siteName: 'Agrimensore',
    title: 'Agrimensore | Gestione Cantieri Digitale',
    description:
      'Soluzione all-in-one per gestire cantieri senza caos. Documentazione, tracciamento rischi e conformità normativa.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agrimensore - Gestione Cantieri',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agrimensore | Gestione Cantieri Digitale',
    description: 'Soluzione all-in-one per gestire cantieri senza caos.',
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
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://agrimensore.it',
    languages: {
      'it-IT': process.env.NEXT_PUBLIC_SITE_URL || 'https://agrimensore.it',
      'en-US': 'https://agrimensore.com',
    },
  },
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Agrimensore',
  description: 'Soluzione all-in-one per gestione cantieri digitale',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://agrimensore.it',
  applicationCategory: 'BusinessApplication',
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
}
