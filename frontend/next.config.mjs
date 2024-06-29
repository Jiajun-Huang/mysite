/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: `http://192.168.1.5:8000/api/:path*/`,
      },
    ];
  },
  trailingSlash: true,
};

export default nextConfig;
