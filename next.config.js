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
  async rewrites() {
    return [
      {
        source: '/epoxy/:path*',
        destination: '/epoxy/:path*',
      },
      {
        source: '/asphalte/:path*',
        destination: '/asphalte/:path*',
      },
      {
        source: '/toiture/:path*',
        destination: '/toiture/:path*',
      },
      {
        source: '/isolation/:path*',
        destination: '/isolation/:path*',
      },
    ];
  },
};

module.exports = nextConfig;