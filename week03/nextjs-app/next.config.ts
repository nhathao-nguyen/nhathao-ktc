import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ["cdnv2.tgdd.vn", "api.escuelajs.co", "placeimg.com", "placehold.co", "pravatar.cc"],
  },
};

export default nextConfig;
