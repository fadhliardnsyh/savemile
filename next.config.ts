import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  serverExternalPackages: ['@payloadcms/db-sqlite', '@payloadcms/db-postgres', 'drizzle-kit', 'libsql', 'sharp'],
};

export default withPayload(nextConfig);
