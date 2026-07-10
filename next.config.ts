import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow any domain for product images, can restrict to res.cloudinary.com later
      }
    ]
  }
};

export default nextConfig;
