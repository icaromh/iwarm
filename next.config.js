/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com', 'maps.googleapis.com', 'maps.gstatic.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: "/**"
      },
      {
        protocol: 'https',
        hostname: 'maps.gstatic.com',
        pathname: "/**"
      },
      {
        protocol: 'https',
        hostname: 'vercel.app',
        pathname: '/**',
      },
    ],
  },  
}

module.exports = nextConfig
