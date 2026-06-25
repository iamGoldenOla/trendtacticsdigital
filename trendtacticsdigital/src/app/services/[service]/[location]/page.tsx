import { supabase } from "../../../../lib/supabaseClient";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{ service: string; location: string }>;
}

export async function generateStaticParams() {
  return [
    { service: "social-media-management", location: "lagos" },
    { service: "social-media-management", location: "abuja" },
    { service: "social-media-management", location: "port-harcourt" },
    { service: "seo", location: "lagos" },
    { service: "seo", location: "abuja" },
    { service: "web-design", location: "lagos" },
    { service: "web-design", location: "abuja" },
    { service: "digital-marketing", location: "lagos" },
    { service: "digital-marketing", location: "abuja" }
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { service, location } = await params;
  const slug = `services/${service}/${location}`;

  const { data: page } = await supabase
    .from("seo_pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!page) {
    return {
      title: "Page Not Found - Trendtactics Digital",
    };
  }

  return {
    title: page.title,
    description: page.meta_description,
    alternates: {
      canonical: `https://trendtacticsdigital.com/${slug}`,
    },
  };
}

export default async function SeoPage({ params }: PageProps) {
  const { service, location } = await params;
  const slug = `services/${service}/${location}`;

  const { data: page } = await supabase
    .from("seo_pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!page) {
    notFound();
  }

  // Related services links
  const relatedServices = [
    { name: "Social Media Management", path: "/services/social-media-management" },
    { name: "SEO Optimization", path: "/services/seo" },
    { name: "Web Design & Development", path: "/services/web-design" },
    { name: "Digital Marketing Strategy", path: "/services/digital-marketing" }
  ].filter(s => !slug.includes(s.path.split("/").pop() || ""));

  // Schema markup
  const schemaMarkup = page.schema_markup || {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Trendtactics Digital - ${page.location || location} Branch`,
    "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
    "url": `https://trendtacticsdigital.com/${slug}`,
    "telephone": "+234-800-000-0000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": page.location || location,
      "addressCountry": "NG"
    },
    "priceRange": "$$$"
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-blue-950/40 via-slate-950 to-slate-950 border-b border-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6 uppercase tracking-wider">
            Premium AI Growth Agent
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            {page.h1 || page.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {page.meta_description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105"
            >
              Get a Free AI Audit
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 rounded-xl font-bold bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-850 hover:text-white transition-all hover:scale-105"
            >
              View Cases
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 lg:py-28 max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <article className="prose prose-invert prose-cyan max-w-none">
            <div 
              className="text-slate-300 leading-relaxed space-y-6 text-lg"
              dangerouslySetInnerHTML={{ __html: page.content }} 
            />
          </article>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-850 backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Local Service Location
            </h3>
            <p className="text-slate-400 mb-4 leading-relaxed">
              We provide premium, results-oriented {page.service} services in {page.location} and surrounding areas.
            </p>
            <div className="h-px bg-slate-800 my-6" />
            <ul className="space-y-3 text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Lagos, Nigeria
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Abuja, FCT
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Port Harcourt, Rivers
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-950/20 to-blue-950/20 border border-cyan-900/30 backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-4 text-white">
              Related Services
            </h3>
            <ul className="space-y-4">
              {relatedServices.map((serviceItem, index) => (
                <li key={index}>
                  <Link
                    href={`${serviceItem.path}/${location}`}
                    className="text-slate-400 hover:text-cyan-400 font-semibold transition-all inline-flex items-center gap-1.5"
                  >
                    <span>{serviceItem.name} in {page.location || location}</span>
                    <span>&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
