/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@zenicorp/shared-types',
    '@zenicorp/zenicorp-core',
    '@zenicorp/zenitech-core',
  ],
  images: {
    domains: ['localhost', 'zenicorp.ca', 'cdn.zenicorp.ca'],
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
  async redirects() {
    return [
      {
        source: '/epoxy/:path*',
        destination: 'https://zenicorp-epoxy.vercel.app/:path*',
        permanent: true,
      },
      {
        source: '/asphalte/:path*',
        destination: 'https://zenicorp-asphalte.vercel.app/:path*',
        permanent: true,
      },
      {
        source: '/toiture/:path*',
        destination: 'https://zenicorp-toiture.vercel.app/:path*',
        permanent: true,
      },
      {
        source: '/isolation/:path*',
        destination: 'https://zenicorp-isolation.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;