import { createClient } from '@supabase/supabase-js';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';


const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Z3d4bmhucWRuYnpwZXRsdHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjQ2NjUsImV4cCI6MjA4MDY0MDY2NX0.3eblmq4lsnDQU33M9XqZpBqux9bi9hX2G0yUuPScHJA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://trendtacticsdigital.com';
  
  // Get all published programmatic pages
  const { data: pages } = await supabase
    .from('seo_pages')
    .select('slug, updated_at, page_type')
    .eq('published', true);

  const programmaticPages = pages?.map(page => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(page.updated_at),
    changeFrequency: 'monthly' as const,
    priority: page.page_type === 'service-location' ? 0.8 : 0.7,
  })) || [];

  // Static pages
  const staticPages = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/services`, priority: 0.9 },
    { url: `${baseUrl}/portfolio`, priority: 0.8 },
    { url: `${baseUrl}/pricing`, priority: 0.8 },
    { url: `${baseUrl}/about`, priority: 0.7 },
    { url: `${baseUrl}/contact`, priority: 0.7 },
  ].map(page => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
  }));

  return [...staticPages, ...programmaticPages];
}
