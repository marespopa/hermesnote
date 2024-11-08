/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'producthunt.com',
            pathname: '/widgets/embed-image/**',
          },
        ],
      },
}

module.exports = nextConfig
