/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@zenicorp/shared-types',
    '@zenicorp/zenicorp-core',
    '@zenicorp/zenitech-core',
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Canonique : le domaine nu et www servaient tous deux un 200, donc Google voyait
  // deux copies de chaque page. On redirige l'apex vers www, la forme utilisee par les
  // canoniques, le sitemap, robots.txt et les @id du graphe d'entites.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'zeniva.ca' }],
        destination: 'https://www.zeniva.ca/:path*',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Aucune redirection sur /epoxy, /asphalte, /toiture, /isolation :
  // ces routes sont servies par la plateforme (voir src/app/<division>/page.tsx).
  // Les sites de marque restent accessibles via le lien "site de la division"
  // présent sur chaque page (champ `site` dans src/lib/divisions-data.ts).
};

module.exports = nextConfig;