import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "*.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "*.vercel.app",
      },
    ],
  },
  serverExternalPackages: ['@payloadcms/db-sqlite', '@payloadcms/db-postgres', 'drizzle-kit', 'libsql', 'sharp'],
};

export default withPayload(nextConfig);
