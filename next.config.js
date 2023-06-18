const nextConfig = {
  reactStrictMode: false,
  trailingSlash: false,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: 'http://localhost:7119/api/:path',
      }
    ]
  },
}

module.exports = nextConfig

