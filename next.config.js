const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:7119/api/:path*',
      }
    ]
  },
  trailingSlash: false
}

module.exports = nextConfig

