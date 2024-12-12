/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.dummyjson.com", "cdn.dummyjson.com", "files.cdn.printful.com"]
  }
}

module.exports = nextConfig
