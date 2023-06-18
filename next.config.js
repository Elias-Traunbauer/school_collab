/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: 'http://localhost:7119/api/:path'
      }
    ]
  },
}

module.exports = nextConfig

