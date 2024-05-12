/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  transpilePackages: ['@mui/x-charts']
};

export default nextConfig;
