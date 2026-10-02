import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // transpilePackages removed to prevent Node memory blowup
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimize images from external domains (Spline CDN etc.)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod.spline.design",
      },
    ],
  },
  // Production optimizations
  poweredByHeader: false,
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
