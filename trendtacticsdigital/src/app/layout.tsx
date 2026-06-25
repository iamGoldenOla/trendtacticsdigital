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
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#00FFFF",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Trendtactics Digital",
          "url": "https://trendtacticsdigital.com/",
          "logo": "https://trendtacticsdigital.com/images/og-image.jpg",
          "sameAs": [
            "https://linkedin.com/company/trendtactics-digital",
            "https://twitter.com/trendtactics",
            "https://instagram.com/trendtactics",
            "https://facebook.com/trendtactics",
            "https://youtube.com/trendtactics"
          ],
          "contactPoint": [{
            "@type": "ContactPoint",
            "telephone": "+234-800-000-0000",
            "contactType": "customer service",
            "areaServed": "NG, US, UK, CA",
            "availableLanguage": ["English"]
          }]
        }`}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "MarketingAgency",
          "name": "Trendtactics Digital",
          "url": "https://trendtacticsdigital.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lagos",
            "addressCountry": "NG"
          },
          "areaServed": ["Nigeria", "United Kingdom", "Global"],
          "serviceType": ["SEO", "Social Media Management", "Web Design", "Digital Marketing"]
        }`}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://trendtacticsdigital.com/",
          "name": "Trendtactics Digital - We Engineer Digital Growth",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://trendtacticsdigital.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }`}} />
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
