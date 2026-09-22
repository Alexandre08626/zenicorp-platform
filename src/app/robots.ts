import type { MetadataRoute } from 'next';

// Moteurs de réponse IA (ChatGPT, Claude, Perplexity, Google AI) — autorisés explicitement
// sur les pages publiques. Les nommer est un signal en soi.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: ['/', '/llms.txt'], disallow: '/api/' })),
      { userAgent: '*', allow: '/', disallow: '/api/' },
    ],
    sitemap: 'https://www.zeniva.ca/sitemap.xml',
    host: 'https://www.zeniva.ca',
  };
}
