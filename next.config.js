/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  }
}


module.exports = nextConfig

