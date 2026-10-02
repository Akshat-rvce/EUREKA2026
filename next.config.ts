import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // transpilePackages removed to prevent Node memory blowup
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
