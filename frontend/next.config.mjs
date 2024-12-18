/** @type {import('next').NextConfig} */

// print the env
//
const backend_url = process.env.BACKEND_ADDR || "http://127.0.0.1:8000";
const backend_url_obj = new URL(backend_url);
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
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "192.168.1.9",
      },
      {
        protocol: "https",
        hostname: "jiajunhuang.cc",
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
        protocol: backend_url_obj.protocol.slice(0, -1),
        hostname: backend_url_obj.hostname,
        port: backend_url.port,
      },
    ],
  },
};

export default nextConfig;
