import type { MetadataRoute } from 'next';
import { divisionsData } from '@/lib/divisions-data';
import { GUIDES } from '@/lib/guides-data';
import { NEWS } from '@/lib/news-data';

const SITE_URL = 'https://www.zeniva.ca';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${SITE_URL}/groupe`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/alexandre-blais`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/projet`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/entrepreneur`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...divisionsData.map((d) => ({
      url: `${SITE_URL}/${d.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...GUIDES.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: new Date(g.dateModified),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    { url: `${SITE_URL}/nouvelles`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    ...NEWS.map((n) => ({
      url: `${SITE_URL}/nouvelles/${n.slug}`,
      lastModified: new Date(n.datePublished),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
