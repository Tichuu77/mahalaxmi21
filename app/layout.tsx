import type React from "react"
import type { Metadata } from "next"
import { Poppins, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
})

const BASE_URL = "https://www.mm.mahalaxmiinfra.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mahalaxmi Infra – NMRDA & RERA Approved Plots in Nagpur | Starting ₹22L",
    template: "%s | Mahalaxmi Infra Nagpur",
  },
  description:
    "Buy NMRDA sanctioned, RERA approved residential plots in Nagpur. Mahalaxmi Infra offers 70+ completed projects, 17,000+ happy families. Plots near MIHAN, Wardha Road, Hingna. Starting ₹22 Lakh. Bank loan available.",
  generator: "Next.js",
  applicationName: "Mahalaxmi Infra",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Mahalaxmi Infra", url: BASE_URL }],
  creator: "Mahalaxmi Infra",
  publisher: "Mahalaxmi Infra",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: "/Mahalaxmi Infra new Logo.png",
    apple: "/Mahalaxmi Infra new Logo.png",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Mahalaxmi Infra",
    title: "Mahalaxmi Infra – NMRDA & RERA Approved Plots in Nagpur",
    description:
      "70+ completed projects, 17,000+ happy families. Buy NMRDA sanctioned plots near MIHAN, Wardha Road & Hingna starting ₹22 Lakh. 100% RERA Approved.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mahalaxmi Infra – Premium Residential Plots in Nagpur",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahalaxmi Infra – RERA Approved Plots in Nagpur",
    description:
      "Buy premium NMRDA sanctioned plots in Nagpur. 70+ projects, starting ₹22L. Bank loan available.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "Mahalaxmi Infra",
    "Mahalaxmi Infra Nagpur",
    "Mahalaxmi Infra plots",
    "NMRDA approved plots Nagpur",
    "RERA approved plots Nagpur",
    "plots for sale in MIHAN Nagpur",
    "residential plots near AIIMS Nagpur",
    "plots in Wardha Road Nagpur",
    "Nagpur real estate",
    "buy plot in Nagpur",
    "affordable plots Nagpur",
  ],
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${BASE_URL}/#organization`,
      name: "Mahalaxmi Infra",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/Mahalaxmi Infra new Logo.png` },
      description: "NMRDA sanctioned and RERA approved residential plots in Nagpur with 70+ completed projects.",
      telephone: "+919970501128",
      email: "manoj.mungale@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nagpur",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      areaServed: { "@type": "City", name: "Nagpur" },
      foundingDate: "2012",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Mahalaxmi Infra",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What types of properties does Mahalaxmi Infra offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mahalaxmi Infra offers NMRDA sanctioned and RERA approved residential and commercial plots in prime locations across Nagpur.",
          },
        },
        {
          "@type": "Question",
          name: "What is the starting price for plots?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Plots start from ₹22 Lakh onwards, depending on location and size.",
          },
        },
        {
          "@type": "Question",
          name: "Are Mahalaxmi Infra projects RERA approved?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all projects are 100% RERA approved (MAHA RERA NO. A50500044725) and NMRDA sanctioned.",
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${poppins.variable} ${cormorant.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TCG77MQD');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Nagpur" />
        <meta name="geo.position" content="21.1458;79.0882" />
        <meta name="ICBM" content="21.1458, 79.0882" />
        <meta name="theme-color" content="#0d1a16" />
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TCG77MQD"
            height="0" width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded">
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}