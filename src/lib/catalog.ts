/**
 * Data katalog Solusi → Ban.
 * Terpusat di sini agar mudah dipindah ke CMS nanti.
 */

export type TireCategory =
  | "steer"
  | "drive"
  | "trailer"
  | "offroad"
  | "forklift"
  | "ribtype"
  | "lugtype";

export type CharKey =
  | "antiAus"
  | "ketahanan"
  | "beban"
  | "cengkeraman"
  | "antiTusukan"
  | "hematBbm"
  | "stabilitas"
  | "performaBasah";

export type Brand = "tiron" | "doublestar";

/** [Light Truck, Truk Sumbu Ganda, Trailer/Gandeng] */
export type Fit = [boolean, boolean, boolean];

export type Product = {
  id: string;
  brand: Brand;
  brandChip: string;
  series: string;
  name: string;
  subname: string;
  categories: TireCategory[];
  fit: Fit;
  characteristics: CharKey[];
  description: string;
  tags: string[];
  sizes: string[];
  badge?: string;
  best?: boolean;
  image?: string;
};

export const vehicleLabels = ["Light Truck", "Truk Sumbu Ganda", "Trailer / Gandeng"];

export const charLabels: Record<CharKey, string> = {
  antiAus: "Anti-Aus",
  ketahanan: "Ketahanan",
  beban: "Beban Maksimal",
  cengkeraman: "Cengkeraman",
  antiTusukan: "Anti-Tusukan",
  hematBbm: "Hemat BBM",
  stabilitas: "Stabilitas",
  performaBasah: "Performa Basah",
};

export const filterTabs: { key: "semua" | TireCategory; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "steer", label: "Steer / Kemudi" },
  { key: "drive", label: "Drive / Penggerak" },
  { key: "trailer", label: "Trailer" },
  { key: "offroad", label: "Off-Road / Tambang" },
  { key: "forklift", label: "Forklift" },
  { key: "ribtype", label: "Rib Type" },
  { key: "lugtype", label: "Lug Type" },
];

export const brands: Record<
  Brand,
  { name: string; tagline: string; note: string }
> = {
  tiron: {
    name: "Tiron",
    tagline: "Korea Technology Since 1951 · Indonesia Global Factory",
    note: "Korea Tech · 1951",
  },
  doublestar: {
    name: "Doublestar",
    tagline: "China · Kumho Group · Indonesia Since 2018",
    note: "China · Kumho Group",
  },
};

export const catalogHero = {
  breadcrumb: ["Beranda", "Produk", "Ban", "Truk"],
  eyebrow: "Katalog Produk",
  title: "Ban Truk & Kendaraan Niaga",
  accent: "Truk",
  description:
    "Pilihan ban truk terbaik dari Tiron & Doublestar — dirancang untuk ketahanan maksimal di berbagai medan.",
  // Unsplash (Rob Wingate) — close-up tapak ban; lisensi gratis, komersial, tanpa atribusi.
  image: "/assets/images/banner-ban-tread.webp",
};

export const infoStrip: {
  icon: "certificate" | "delivery" | "guarantee" | "headset";
  title: string;
  sub: string;
}[] = [
  {
    icon: "certificate",
    title: "SNI Certified",
    sub: "Seluruh produk tersertifikasi standar nasional",
  },
  {
    icon: "delivery",
    title: "Pengiriman Seluruh Indonesia",
    sub: "Stok tersedia di gudang Jakarta & Surabaya",
  },
  {
    icon: "guarantee",
    title: "Garansi Produk",
    sub: "Garansi resmi dari distributor resmi SaveMile",
  },
  {
    icon: "headset",
    title: "Konsultasi Teknis",
    sub: "Tim ahli siap bantu pilih ban yang tepat",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function relatedProducts(p: Product, n = 3): Product[] {
  return products
    .filter(
      (q) =>
        q.id !== p.id &&
        (q.brand === p.brand || q.categories.some((c) => p.categories.includes(c)))
    )
    .sort((a, b) => Number(b.brand === p.brand) - Number(a.brand === p.brand))
    .slice(0, n);
}

export const products: Product[] = [
  // ─── TIRON ───
  {
    id: "hs317",
    brand: "tiron",
    brandChip: "Tiron",
    series: "Tiron · Rib Type",
    name: "HS317",
    subname: "Rib Type — Steer / Kemudi",
    categories: ["ribtype", "steer"],
    fit: [true, true, false],
    characteristics: ["antiAus", "ketahanan"],
    description:
      "Ban kemudi dengan alur rib presisi untuk kestabilan lintasan aspal dan tol, jarak tempuh optimal.",
    tags: ["Steer", "Rib Type", "Long Mileage", "SHD"],
    sizes: ["7.50-15", "7.00-16", "7.50-16"],
  },
  {
    id: "hs308",
    brand: "tiron",
    brandChip: "Tiron",
    series: "Tiron · Rib Type",
    name: "HS308",
    subname: "Rib Type — Steer Truk Berat",
    categories: ["ribtype", "steer"],
    fit: [true, true, false],
    characteristics: ["antiAus", "ketahanan"],
    description:
      "Dioptimalkan untuk truk berat di jalan perkotaan dan tol, konstruksi SHD & Long Mileage.",
    tags: ["Steer", "Rib Type", "SHD"],
    sizes: ["7.50-16"],
  },
  {
    id: "hf1",
    brand: "tiron",
    brandChip: "Tiron",
    series: "Tiron · Rib Type",
    name: "HF1",
    subname: "Rib Type — Truk Medium",
    categories: ["ribtype", "steer"],
    fit: [true, true, false],
    characteristics: ["ketahanan", "beban"],
    description:
      "Kombinasi traksi maju dan kestabilan kemudi untuk truk sedang, cocok jalan aspal campuran.",
    tags: ["Steer", "Rib Type", "RE"],
    sizes: ["7.50-16", "8.25-16"],
  },
  {
    id: "hs315",
    brand: "tiron",
    brandChip: "Tiron",
    series: "Tiron · Rib Type",
    name: "HS315",
    subname: "Rib Type — Truk Besar 10.00",
    categories: ["ribtype", "steer"],
    fit: [false, true, true],
    characteristics: ["beban", "ketahanan"],
    description:
      "Untuk truk besar 10.00-20, Long Mileage, stabilitas tinggi di semua jenis truk angkut.",
    tags: ["Long Mileage", "Rib Type"],
    sizes: ["10.00-20"],
  },
  {
    id: "hs307",
    brand: "tiron",
    brandChip: "Tiron",
    series: "Tiron · Lug Type",
    name: "HS307",
    subname: "Lug Type — Drive / Off-Road",
    categories: ["lugtype", "offroad"],
    fit: [false, true, true],
    characteristics: ["cengkeraman", "ketahanan"],
    description:
      "Pola lug agresif untuk traksi kuat di jalan tanah, berbatu, dan medan off-road ringan hingga berat.",
    tags: ["Drive", "Lug Type", "Off-Road", "SHD"],
    sizes: ["7.00-16", "7.50-16"],
  },
  {
    id: "hs314",
    brand: "tiron",
    brandChip: "Tiron",
    series: "Tiron · Lug Type",
    name: "HS314",
    subname: "Lug Type — All Position Heavy",
    categories: ["lugtype", "offroad", "drive"],
    fit: [false, true, true],
    characteristics: ["ketahanan", "antiTusukan"],
    description:
      "Ban serbaguna posisi apapun, pilihan utama tambang dan konstruksi berat, beban hingga 3350 kg.",
    tags: ["All Position", "Tambang", "SHD", "Long Mileage"],
    sizes: ["7.50-16", "8.25-16", "10.00-20", "11.00-20"],
    badge: "Terlaris",
    best: true,
  },
  {
    id: "hs320",
    brand: "tiron",
    brandChip: "Tiron",
    series: "Tiron · Rib-Lug Type",
    name: "HS320",
    subname: "Rib-Lug — Serba Medan",
    categories: ["lugtype", "offroad", "drive"],
    fit: [false, true, true],
    characteristics: ["cengkeraman", "stabilitas"],
    description:
      "Kombinasi rib dan lug untuk traksi optimal di jalan campuran aspal-tanah, konstruksi Premium & SHD.",
    tags: ["All Position", "Rib-Lug", "Premium"],
    sizes: ["7.50-16", "8.25-16", "10.00-20", "11.00-20"],
  },
  {
    id: "hra16",
    brand: "tiron",
    brandChip: "Tiron Radial",
    series: "Tiron Radial · Steer",
    name: "HRA16",
    subname: "Radial — Aspal / Toll Urban",
    categories: ["steer", "ribtype"],
    fit: [true, true, false],
    characteristics: ["antiAus", "hematBbm"],
    description:
      "Grip dan traksi maksimal di jalan aspal dan tol. Sangat cocok perkotaan & jarak tempuh panjang (Toll).",
    tags: ["Radial", "Urban", "Toll"],
    sizes: ["7.50R16"],
  },
  {
    id: "hmd54",
    brand: "tiron",
    brandChip: "Tiron Radial",
    series: "Tiron Radial · Drive",
    name: "HMD54",
    subname: "Radial — Heavy Duty On/Off",
    categories: ["drive", "offroad"],
    fit: [false, true, true],
    characteristics: ["antiTusukan", "ketahanan"],
    description:
      "Untuk beban maksimal truk heavy duty, telapak tahan benturan dan tusukan di jalan berbatu off-road.",
    tags: ["Drive", "Heavy Duty", "On/Off Road"],
    sizes: ["10.00R20", "11.00R20"],
  },
  {
    id: "hfd73",
    brand: "tiron",
    brandChip: "Tiron Radial",
    series: "Tiron Radial · Drive",
    name: "HFD73",
    subname: "Radial — Pertambangan & Berbatu",
    categories: ["drive", "offroad"],
    fit: [false, true, true],
    characteristics: ["antiTusukan", "ketahanan"],
    description:
      "Untuk beban maksimal di pertambangan dan jalan berbatu. Tahan kerusakan ekstrem, beban hingga 5600 kg.",
    tags: ["Tambang", "Drive", "Off-Road"],
    sizes: ["7.50R16", "10.00R20", "11.00R20", "12.00R20", "12.00R24"],
    badge: "Tambang",
    best: true,
  },
  {
    id: "hma51",
    brand: "tiron",
    brandChip: "Tiron Radial",
    series: "Tiron Radial · All Position",
    name: "HMA51",
    subname: "Super Steel Belt — On/Off",
    categories: ["steer", "drive"],
    fit: [true, true, false],
    characteristics: ["antiTusukan", "ketahanan"],
    description:
      "Super Steel Belt untuk ketahanan benturan dan tusukan. Sesuai light truck sampai heavy duty on/off road.",
    tags: ["Steel Belt", "On/Off", "All Position"],
    sizes: ["7.50R16", "10.00R20", "11.00R20"],
  },
  {
    id: "hs800",
    brand: "tiron",
    brandChip: "Tiron",
    series: "Tiron · Forklift",
    name: "HS800",
    subname: "Pneumatic Forklift Industrial",
    categories: ["forklift"],
    fit: [true, false, false],
    characteristics: ["beban", "ketahanan"],
    description:
      "Ban forklift pneumatik industrial, daya dukung hingga 3830 kg, cocok gudang & terminal peti kemas.",
    tags: ["Forklift", "Pneumatic", "Industrial"],
    sizes: ["6.00-9", "6.50-10", "7.00-12", "8.25-15"],
  },

  // ─── DOUBLESTAR ───
  {
    id: "dsr688",
    brand: "doublestar",
    brandChip: "Doublestar",
    series: "Doublestar · All Position",
    name: "DSR688",
    subname: "Drive — Off Road 12.00R24",
    categories: ["drive", "offroad"],
    fit: [false, true, true],
    characteristics: ["antiAus", "ketahanan"],
    description:
      "Kinerja pemuat lebih kuat, anti-aus yang baik. Performa berkendara baik & area pembuangan panas lebih besar.",
    tags: ["Drive", "Off-Road", "All Position"],
    sizes: ["12.00R24"],
  },
  {
    id: "dfa100",
    brand: "doublestar",
    brandChip: "Doublestar",
    series: "Doublestar · All Position",
    name: "DFA100",
    subname: "Drive — Off Road 11.00/12.00R",
    categories: ["drive", "offroad"],
    fit: [false, true, true],
    characteristics: ["antiAus", "ketahanan"],
    description:
      "Kinerja pemuat lebih kuat dan kinerja anti-aus yang baik. Performa berkendara optimal di medan berat.",
    tags: ["Drive", "Off-Road", "All Position"],
    sizes: ["11.00R20", "12.00R24"],
  },
  {
    id: "dsr162",
    brand: "doublestar",
    brandChip: "Doublestar",
    series: "Doublestar · All Position",
    name: "DSR162",
    subname: "Drive — 10.00/11.00R20",
    categories: ["drive", "offroad"],
    fit: [false, true, true],
    characteristics: ["antiAus", "hematBbm"],
    description:
      "Kinerja pemuat kuat dan anti-aus baik. Performa berkendara baik dan area pembuangan panas lebih besar.",
    tags: ["Drive", "Off-Road", "All Position"],
    sizes: ["10.00R20", "11.00R20"],
  },
  {
    id: "s86",
    brand: "doublestar",
    brandChip: "Doublestar",
    series: "Doublestar · All Position",
    name: "S86",
    subname: "Radial Steer — 295/80R22.5",
    categories: ["steer", "ribtype"],
    fit: [true, false, true],
    characteristics: ["performaBasah", "ketahanan"],
    description:
      "Ketahanan basah baik, kinerja disipasi panas baik. Anti gores, jarak tempuh lebih aman dan efisien.",
    tags: ["Wet Grip", "Steer", "All Position", "NEW"],
    sizes: ["295/80R22.5"],
    badge: "NEW",
    best: true,
  },
  {
    id: "d902",
    brand: "doublestar",
    brandChip: "Doublestar",
    series: "Doublestar · All Position",
    name: "D902",
    subname: "Radial — 11R22.5 / 295/80R",
    categories: ["steer", "drive"],
    fit: [true, false, true],
    characteristics: ["cengkeraman", "stabilitas"],
    description:
      "Anti gores jarak lebih aman. Anti-aus jarak tempuh panjang. Anti-slip, kemudi sangat baik untuk bus & truk.",
    tags: ["All Position", "Bus", "Truk", "NEW"],
    sizes: ["11R22.5", "295/80R22.5"],
    badge: "NEW",
  },
  {
    id: "dma107",
    brand: "doublestar",
    brandChip: "Doublestar",
    series: "Doublestar · Steer",
    name: "DMA107",
    subname: "Steer — 7.50R16-14PR",
    categories: ["steer", "ribtype"],
    fit: [true, false, false],
    characteristics: ["antiAus", "hematBbm"],
    description:
      "Anti-aus jarak tempuh panjang, kinerja pemuat lebih kuat. Jarak tempuh panjang dan hemat bahan bakar.",
    tags: ["Steer", "Long Mileage", "Fuel Save"],
    sizes: ["7.50R16-14PR"],
  },
  {
    id: "dua100",
    brand: "doublestar",
    brandChip: "Doublestar",
    series: "Doublestar · Belakang / Trailer",
    name: "DUA100 MAX",
    subname: "Rear — 7.50R16-14PR",
    categories: ["trailer", "steer"],
    fit: [true, false, false],
    characteristics: ["antiAus", "stabilitas"],
    description:
      "Anti gores jarak lebih aman. Anti-aus jarak tempuh panjang. Anti-slip, kemudi sangat baik.",
    tags: ["Belakang", "Bus", "Truk", "NEW"],
    sizes: ["7.50R16-14PR"],
  },
  {
    id: "dma106",
    brand: "doublestar",
    brandChip: "Doublestar",
    series: "Doublestar · Drive",
    name: "DMA106",
    subname: "Drive — 11.00R20",
    categories: ["drive", "offroad"],
    fit: [false, true, true],
    characteristics: ["cengkeraman", "stabilitas"],
    description:
      "Kemampuan cengkeraman sangat baik dan stabilitas pengemasan yang baik. Kinerja pemuat yang lebih kuat.",
    tags: ["Drive", "Construction", "NEW"],
    sizes: ["11.00R20"],
  },
  {
    id: "dsr668",
    brand: "doublestar",
    brandChip: "Doublestar",
    series: "Doublestar · All Position",
    name: "DSR668",
    subname: "Drive — 10.00/11.00R20",
    categories: ["drive", "offroad"],
    fit: [false, true, true],
    characteristics: ["antiAus", "antiTusukan"],
    description:
      "Kinerja pemuat lebih kuat. Kinerja anti-tusukan yang sangat baik untuk medan campuran.",
    tags: ["Drive", "All Position", "Off-Road"],
    sizes: ["10.00R20", "11.00R20"],
  },
];
