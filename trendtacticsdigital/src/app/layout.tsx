import type { Metadata } from "next";
import { Inter, Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Script from 'next/script';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00FFFF",
};

export const metadata: Metadata = {
  title: "Trendtactics Digital - We Engineer Digital Growth",
  description: "Unlock strategy, creativity, and AI power — all in one studio. Professional digital marketing agency based in Lagos, London, Toronto, and NYC.",
  keywords: "digital marketing, web design, AI solutions, SEO, branding, growth marketing",
  authors: [{ name: "Akinola Olujobi" }],
  creator: "Trendtactics Digital",
  publisher: "Trendtactics Digital",
  robots: "index, follow",
  openGraph: {
    title: "Trendtactics Digital - We Engineer Digital Growth",
    description: "Unlock strategy, creativity, and AI power — all in one studio.",
    url: "https://trendtacticsdigital.com",
    siteName: "Trendtactics Digital",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trendtactics Digital - Digital Marketing Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trendtactics Digital - We Engineer Digital Growth",
    description: "Unlock strategy, creativity, and AI power — all in one studio.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MarketingAgency",
              "@id": "https://trendtacticsdigital.com/#organization",
              "name": "Trendtactics Digital",
              "alternateName": "Trendtactics",
              "url": "https://trendtacticsdigital.com",
              "logo": "https://trendtacticsdigital.com/logo.png",
              "image": "https://trendtacticsdigital.com/og-image.jpg",
              "description": "Global digital agency specializing in web design, app development, SEO, and digital marketing. Serving clients in UK, USA, Canada, Australia, Europe, Middle East, and Africa.",
              "foundingLocation": "Lagos, Nigeria",
              "areaServed": [
                "United Kingdom", "United States", "Canada", "Australia",
                "Nigeria", "Ghana", "Kenya", "South Africa",
                "Germany", "Netherlands", "France", "UAE", "Singapore"
              ],
              "knowsLanguage": ["English", "Yoruba"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Digital Services",
                "itemListElement": [
                  {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Web Design & Development"}},
                  {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Mobile App Development"}},
                  {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "SEO Services"}},
                  {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Digital Marketing"}},
                  {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Brand Identity Design"}}
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "47"
              }
            },
            {
              "@type": "WebSite",
              "@id": "https://trendtacticsdigital.com/#website",
              "url": "https://trendtacticsdigital.com",
              "name": "Trendtactics Digital",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://trendtacticsdigital.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          ]
        }) }} />
      </head>
      <body className="font-sans antialiased">
        <Navigation />
        <main id="main-content" className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX'); // TODO: Replace with your GA4 ID
          `}
        </Script>
      </body>
    </html>
  );
}
