/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['inovacie.bratislava.sk', 'github.githubassets.com']
  }
}

module.exports = nextConfig
