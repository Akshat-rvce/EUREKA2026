import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile ESM-only Spline runtime for webpack compatibility
  transpilePackages: ['@splinetool/runtime'],
  reactStrictMode: false,
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
