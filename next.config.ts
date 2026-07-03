import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Kirim gambar dalam format modern (AVIF/WebP) ke browser yang mendukung,
    // untuk ukuran transfer sekecil mungkin.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
