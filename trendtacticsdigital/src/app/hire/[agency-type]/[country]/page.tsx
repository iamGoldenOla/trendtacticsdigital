import { supabase } from "../../../../lib/supabaseClient";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ "agency-type": string; country: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const agencyType = resolvedParams["agency-type"];
  const country = resolvedParams.country;
  const slug = `hire/${agencyType}/${country}`;

  const { data: page } = await supabase
    .from("seo_pages")
    .select("title, meta_description")
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
    openGraph: {
      title: page.title,
      description: page.meta_description,
      url: `https://trendtacticsdigital.com/${slug}`,
    },
    alternates: {
      canonical: `https://trendtacticsdigital.com/${slug}`,
    },
  };
}

export default async function HireAgencyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const agencyType = resolvedParams["agency-type"];
  const country = resolvedParams.country;
  const slug = `hire/${agencyType}/${country}`;

  // Fetch page details
  const { data: page } = await supabase
    .from("seo_pages")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!page) {
    notFound();
  }

  // Related services / internal links
  const relatedLinks = (page.internal_links as unknown as { text: string; url: string }[] | null) || [];

  // Schema markup
  const schemaMarkup = page.schema_markup || {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Trendtactics Digital",
    "url": "https://trendtacticsdigital.com",
    "serviceType": agencyType.replace(/-/g, " "),
    "priceRange": "$$"
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
            Premium Agency Selection
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            {page.h1}
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {page.intro}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105"
            >
              {page.cta_button || "Hire Our Team"}
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 rounded-xl font-bold bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-850 hover:text-white transition-all hover:scale-105"
            >
              Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 lg:py-28 max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          {page.content && (page.content as unknown as { sections?: { heading: string; body: string }[] }).sections ? (
            (page.content as unknown as { sections: { heading: string; body: string }[] }).sections.map((section, i) => (
              <div key={i} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {section.heading}
                </h2>
                <p className="text-slate-350 text-lg leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))
          ) : (
            <div className="text-slate-400 italic">No additional content sections.</div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-850 backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Target Market Coverage
            </h3>
            <p className="text-slate-400 mb-4 leading-relaxed">
              We provide full-scale agency capabilities to clients in {page.country || country} and across global markets.
            </p>
            <div className="h-px bg-slate-800 my-6" />
            <ul className="space-y-3 text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Dedicated Growth Teams
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Global Delivery Standards
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                AI-Powered Workflow Delivery
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {page.faq && (page.faq as unknown as { question: string; answer: string }[]).length > 0 && (
        <section className="py-20 lg:py-28 max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 tracking-tight text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {(page.faq as unknown as { question: string; answer: string }[]).map((item, i) => (
              <div key={i} className="bg-slate-900/20 p-6 rounded-xl border border-slate-850/50">
                <h3 className="font-semibold text-xl mb-3 text-white">{item.question}</h3>
                <p className="text-slate-450 text-lg leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-t from-blue-950/20 to-slate-950 border-t border-slate-900 text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {page.cta_headline || "Ready to Work with a Premium Digital Partner?"}
          </h2>
          <p className="text-lg text-slate-400">
            {page.cta_subtext || "Get in touch with our team for a free discovery session and personalized strategy proposal."}
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="bg-cyan-400 text-slate-950 font-bold px-10 py-4 rounded-xl text-lg hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105 inline-block"
            >
              {page.cta_button || "Get in Touch"}
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links */}
      {relatedLinks.length > 0 && (
        <section className="py-12 border-t border-slate-900 px-6 max-w-5xl mx-auto">
          <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-4 font-bold">Related Services</h3>
          <div className="flex flex-wrap gap-4">
            {relatedLinks.map((link, i) => (
              <Link
                key={i}
                href={link.url}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const { data: pages } = await supabase
    .from("seo_pages")
    .select("slug")
    .eq("page_type", "hire-agency")
    .eq("published", true);

  return pages?.map((page) => {
    const parts = page.slug.split("/");
    return { "agency-type": parts[1], country: parts[2] };
  }) || [];
}
