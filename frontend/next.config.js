/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tắt thông báo lỗi trong production
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 