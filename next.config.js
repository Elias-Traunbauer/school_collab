/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig

