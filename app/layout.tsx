import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { metadata as seoMetadata, jsonLd } from "@/lib/metadata";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...seoMetadata,
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
  },
};

const GA_SCRIPT = `
window.__loadGA = function() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  var s = document.createElement('script');
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-5631FDHV0H';
  s.async = true;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-5631FDHV0H', { anonymize_ip: true });
};
if (localStorage.getItem('cookie_consent') === 'accepted') {
  window.__loadGA();
}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <script dangerouslySetInnerHTML={{ __html: GA_SCRIPT }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
