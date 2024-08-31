/** @type {import('next').NextConfig} */

// print the env
//
console.log(process.env.STORAGE_ADDR);
const backend_url = process.env.BACKEND_ADDR;

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: `${backend_url}/api/:path*/`,
      },
    ];
  },
  trailingSlash: true,

  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "192.168.1.7",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "http",
        hostname: "192.168.1.5",
      },
      {
        protocol: "http",
        hostname: process.env.STORAGE_ADDR,
      },
    ],
  },
};

export default nextConfig;
