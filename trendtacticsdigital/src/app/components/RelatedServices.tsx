import React from 'react';
import Link from 'next/link';

interface RelatedServicesProps {
  currentService: string;
  currentLocation?: string;
}

export function RelatedServices({ 
  currentService, 
  currentLocation 
}: RelatedServicesProps) {
  const services = [
    { slug: 'web-design', name: 'Web Design' },
    { slug: 'mobile-app-development', name: 'App Development' },
    { slug: 'seo-services', name: 'SEO Services' },
    { slug: 'digital-marketing', name: 'Digital Marketing' },
    { slug: 'branding-design', name: 'Brand Identity' },
  ].filter(s => s.slug !== currentService);

  return (
    <section className="py-12 border-t border-slate-900 mt-12">
      <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-4 font-bold">
        Other Services
      </h3>
      <div className="flex flex-wrap gap-4">
        {services.map(service => (
          <Link
            key={service.slug}
            href={currentLocation 
              ? `/services/${service.slug}/${currentLocation}` 
              : `/services/${service.slug}`
            }
            className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
          >
            {service.name}{currentLocation ? ` in ${currentLocation.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}` : ''}
          </Link>
        ))}
      </div>
    </section>
  );
}
