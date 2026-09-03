import type { MetadataRoute } from 'next';
import { divisionsData } from '@/lib/divisions-data';

const SITE_URL = 'https://www.zeniva.ca';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
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
  ];
}
