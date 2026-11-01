import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "@/styles/components.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Mahalaxmi Nagar 51 Anaya Nagpur | NMRDA & RERA Approved Villa Plots",
  description: "Explore Mahalaxmi Nagar 51 (Anaya) by Mahalaxmi Infra — a 78-acre master-planned residential plotted township at Mouza Sumthana, touching Samruddhi Mahamarg & MIHAN Nagpur. MahaRERA: PP1190002602003. Contact Sales (+91 9326709970).",
  generator: "v0.app",
  icons: "/Mahalaxmi Infra new Logo.png",
  metadataBase: new URL('https://kb.mahalaxmiinfra.in'),
  alternates: {
    canonical: 'https://kb.mahalaxmiinfra.in'
  },
  openGraph: {
    title: "Mahalaxmi Nagar 51 Anaya | 78-Acre Villa Plotted Township Nagpur",
    description: "Premium NMRDA sanctioned & MahaRERA approved (PP1190002602003) villa plots at Mouza Sumthana, Samruddhi Corridor, Nagpur. Contact Sales (+91 9326709970).",
    url: "https://kb.mahalaxmiinfra.in",
    siteName: "Mahalaxmi Nagar 51 Anaya",
    type: "website",
    images: [
      {
        url: "https://kb.mahalaxmiinfra.in/project_M-51.png",
        width: 1200,
        height: 630,
        alt: "Mahalaxmi Nagar 51 Anaya Master Plan Layout"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahalaxmi Nagar 51 Anaya | Villa Plots Nagpur",
    description: "78-Acre master-planned residential plotted township at Mouza Sumthana, Nagpur. MahaRERA: PP1190002602003.",
    images: ["https://kb.mahalaxmiinfra.in/project_M-51.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  },
  keywords: [
    "Mahalaxmi Nagar 51",
    "Mahalaxmi Nagar 51 Anaya",
    "Mahalaxmi Nagar 51 Nagpur",
    "Mahalaxmi Nagar 51 Sumthana",
    "Anaya Mahalaxmi Nagar 51",
    "Anaya plots Nagpur",
    "Mahalaxmi Infra",
    "Mahalaxmi Infra Nagpur",
    "plots in Mouza Sumthana Nagpur",
    "Samruddhi Mahamarg plots Nagpur",
    "plots near MIHAN Nagpur",
    "plots near AIIMS Nagpur",
    "residential plots in Wardha Road Nagpur",
    "PP1190002602003",
    "A50500037880",
    "NMRDA approved plots in Nagpur",
    "villa plots in Nagpur"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-W35FHSFJ');` }} />
        
        {/* Local Business / Real Estate Project Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Mahalaxmi Nagar 51 - Anaya (Mahalaxmi Infra)",
          "url": "https://kb.mahalaxmiinfra.in",
          "logo": "https://kb.mahalaxmiinfra.in/Malaxmi-Final-Logo.-2png.png",
          "image": "https://kb.mahalaxmiinfra.in/project_M-51.png",
          "description": "Mahalaxmi Nagar 51 Anaya is a 78-acre premier master-planned residential plotted development with NMRDA sanction and MahaRERA approval (PP1190002602003) at Mouza Sumthana, Nagpur.",
          "sameAs": [
            "https://www.facebook.com/share/18PdfPMute/",
            "https://www.instagram.com/mahalaxmiinfra_ak",
            "https://www.mahalaxmiinfra.in"
          ],
          "areaServed": "Nagpur, Maharashtra, India",
          "telephone": "+91-9326709970",
          "email": "kuwarb38@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Flat 103/104, Laxmivihar Apartment, Wardha Road, Somalwada",
            "addressLocality": "Nagpur",
            "addressRegion": "Maharashtra",
            "postalCode": "440025",
            "addressCountry": "IN"
          }
        }) }} />

        {/* Organization Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Mahalaxmi Infra",
          "alternateName": "Mahalaxmi Developers",
          "url": "https://www.mahalaxmiinfra.in",
          "logo": "https://kb.mahalaxmiinfra.in/Malaxmi-Final-Logo.-2png.png",
          "description": "Mahalaxmi Infra - A Tradition of Trust. Developing Mahalaxmi Nagar 51 Anaya at Mouza Sumthana, Nagpur.",
          "telephone": "+91-9326709970",
          "email": "kuwarb38@gmail.com",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Sales Desk",
            "telephone": "+91-9326709970",
            "email": "kuwarb38@gmail.com"
          },
          "founder": "Kuwar Bhairam",
          "foundingDate": "2016"
        }) }} />
      </head>
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W35FHSFJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
 
        {children}
        <Analytics />
      </body>
    </html>
  )
}
