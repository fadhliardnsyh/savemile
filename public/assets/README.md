# Folder Asset

Taruh file gambar di sini. Semua yang ada di `public/` bisa diakses lewat URL
mulai dari `/` (tanpa kata `public`).

## Struktur

| Folder         | Untuk apa                                  | Contoh URL                          |
| -------------- | ------------------------------------------ | ----------------------------------- |
| `images/`      | Foto umum, ilustrasi, gambar konten        | `/assets/images/tim.jpg`            |
| `logos/`       | Logo partner / "dipercaya oleh"            | `/assets/logos/transjaya.svg`       |
| `screenshots/` | Screenshot produk untuk hero & fitur       | `/assets/screenshots/dashboard.png` |

## Cara memakai screenshot di hero

1. Simpan gambar, mis. `public/assets/screenshots/dashboard.png`.
2. Buka `src/components/sections/Hero.tsx`.
3. Ganti:

   ```tsx
   <ScreenshotFrame>
     <DashboardMock />
   </ScreenshotFrame>
   ```

   menjadi:

   ```tsx
   <ScreenshotFrame
     src="/assets/screenshots/dashboard.png"
     alt="Dashboard SaveMile"
   />
   ```

   Selama `src` kosong, mockup placeholder (`DashboardMock`) yang tampil.

## Tips

- **Selalu gunakan WebP** untuk foto & screenshot (ukuran ~50-70% lebih kecil dari JPG/PNG,
  website lebih ringan). SVG untuk logo/ikon.
- Cara convert cepat ke WebP (butuh sharp yang sudah terpasang):
  ```bash
  node -e "require('sharp')('foto.jpg').webp({quality:82}).toFile('foto.webp')"
  ```
- Komponen `next/image` juga mengoptimasi & mengirim AVIF/WebP otomatis ke browser.
- Untuk hasil tajam, ekspor gambar di lebar ~1600–2400px.
