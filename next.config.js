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