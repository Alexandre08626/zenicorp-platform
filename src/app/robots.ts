import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: 'https://www.zeniva.ca/sitemap.xml',
    host: 'https://www.zeniva.ca',
  };
}
