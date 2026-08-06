/**
 * Data katalog Solusi -> Ban.
 * Produk & data diambil dari spreadsheet resmi SaveMile (Tiron & Doublestar).
 * Foto produk diunduh dari Google Drive spreadsheet -> /assets/images/produk/.
 */

export type Brand = "tiron" | "doublestar" | (string & {});
export type Tipe = "radial" | "bias" | (string & {});
export type Compatible = "bus" | "trukBerat" | "trukRingan" | (string & {});
export type Medan = "perjalananPanjang" | "jalanPerkotaan" | "standar" | "offRoad" | (string & {});
export type Fitur =
  | "jarakTempuh"
  | "handling"
  | "fuelEfficiency"
  | "antiTear"
  | "antiAus"
  | "bebanBerat"
  | (string & {});

export type Product = {
  id: string;
  brand: Brand;
  brandChip: string;
  name: string;
  tipe: Tipe;
  compatible: Compatible[];
  medan: Medan[];
  fitur: Fitur[];
  sizes: string[];
  description: string;
  image?: string;
};

/* ---------- Label filter (urutan mengikuti brief) ---------- */

export const brandOptions: { key: Brand; label: string }[] = [
  { key: "tiron", label: "Tiron" },
  { key: "doublestar", label: "Doublestar" },
];

export const tipeOptions: { key: Tipe; label: string }[] = [
  { key: "radial", label: "Radial" },
  { key: "bias", label: "Bias" },
];

export const compatibleOptions: { key: Compatible; label: string }[] = [
  { key: "bus", label: "Bus" },
  { key: "trukBerat", label: "Truk Berat" },
  { key: "trukRingan", label: "Truk Ringan" },
];

export const medanOptions: { key: Medan; label: string }[] = [
  { key: "perjalananPanjang", label: "Perjalanan Panjang" },
  { key: "jalanPerkotaan", label: "Jalan Perkotaan" },
  { key: "standar", label: "Standar" },
  { key: "offRoad", label: "Off Road" },
];

export const fiturOptions: { key: Fitur; label: string }[] = [
  { key: "antiAus", label: "Anti Aus" },
  { key: "handling", label: "Handling" },
  { key: "fuelEfficiency", label: "Fuel Efficiency" },
  { key: "antiTear", label: "Anti Tear" },
  { key: "bebanBerat", label: "Beban Berat" },
  { key: "jarakTempuh", label: "Jarak Tempuh Tinggi" },
];

import type { IconName } from "@/components/ui/Icon";

export const medanIcons: Record<Medan, IconName> = {
  perjalananPanjang: "highway",
  jalanPerkotaan: "city",
  standar: "road",
  offRoad: "mountain",
};

export const tipeLabels: Record<string, string> = Object.fromEntries(
  tipeOptions.map((o) => [o.key, o.label])
);
export const compatibleLabels: Record<string, string> = Object.fromEntries(
  compatibleOptions.map((o) => [o.key, o.label])
);
export const medanLabels: Record<string, string> = Object.fromEntries(
  medanOptions.map((o) => [o.key, o.label])
);
export const fiturLabels: Record<string, string> = Object.fromEntries(
  fiturOptions.map((o) => [o.key, o.label])
);

export const brands: Record<Brand, { name: string; tagline: string; note: string }> = {
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
  title: "Ban Truk & Kendaraan Niaga",
  accent: "Truk",
  image: "/assets/images/banner-ban-tread.webp",
};

export const infoStrip: {
  icon: "certificate" | "delivery" | "guarantee" | "headset";
  title: string;
  sub: string;
}[] = [
  { icon: "certificate", title: "SNI Certified", sub: "Seluruh produk tersertifikasi standar nasional" },
  { icon: "delivery", title: "Pengiriman Seluruh Indonesia", sub: "Stok tersedia di gudang Jakarta & Surabaya" },
  { icon: "guarantee", title: "Garansi Produk", sub: "Garansi resmi dari distributor resmi SaveMile" },
  { icon: "headset", title: "Konsultasi Teknis", sub: "Tim ahli siap bantu pilih ban yang tepat" },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function relatedProducts(p: Product, n = 3): Product[] {
  return products
    .filter(
      (q) =>
        q.id !== p.id &&
        (q.brand === p.brand ||
          q.medan.some((m) => p.medan.includes(m)) ||
          q.fitur.some((f) => p.fitur.includes(f)))
    )
    .sort((a, b) => Number(b.brand === p.brand) - Number(a.brand === p.brand))
    .slice(0, n);
}

export const products: Product[] = [
  {
    id: "hs317",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS317",
    tipe: "bias",
    compatible: ["trukRingan"],
    medan: ["perjalananPanjang", "jalanPerkotaan"],
    fitur: ["jarakTempuh"],
    sizes: ["7.50-15", "7.00-16", "7.50-16", "7.50-16"],
    description: "1. Sesuai untuk jalanan perkotaan dan juga jalan tol",
    image: "/assets/images/produk/hs317-t.webp",
  },
  {
    id: "hs308",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS308",
    tipe: "bias",
    compatible: ["trukRingan"],
    medan: ["perjalananPanjang", "jalanPerkotaan"],
    fitur: ["jarakTempuh", "handling"],
    sizes: ["7.50-16", "7.50-16"],
    description: "1. Sesuai untuk jalanan perkotaan dan juga jalan tol 2. Cocok untuk digunakan pada jalanan berkelok",
    image: "/assets/images/produk/hs308-t.webp",
  },
  {
    id: "hf1",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HF1",
    tipe: "bias",
    compatible: ["trukRingan"],
    medan: ["perjalananPanjang", "jalanPerkotaan"],
    fitur: ["jarakTempuh", "handling"],
    sizes: ["7.50-16", "8.25-16"],
    description: "1. Sesuai untuk jalanan perkotaan dan juga jalan tol 2. Cocok untuk jalan perdesaan dengan permukaan tanah/kerikil keras (bukan lumpur yang dalam)",
    image: "/assets/images/produk/hf1-t.webp",
  },
  {
    id: "hf5",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HF5",
    tipe: "bias",
    compatible: ["trukBerat"],
    medan: ["perjalananPanjang", "jalanPerkotaan"],
    fitur: ["handling"],
    sizes: ["9.00-20"],
    description: "1. Sangat optimal untuk yang sering masuk ke area lanskap tanah, proyek konstruksi, atau jalan perkebunan kelapa sawit/karet 2. Bisa digunakan di jalan raya untuk pengiriman hasil alam",
    image: "/assets/images/produk/hf5-t.webp",
  },
  {
    id: "hs315",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS315",
    tipe: "bias",
    compatible: ["trukBerat"],
    medan: ["perjalananPanjang", "jalanPerkotaan"],
    fitur: ["jarakTempuh", "fuelEfficiency"],
    sizes: ["10.00-20"],
    description: "1. Didesain khusus untuk truk yang beroperasi di jalan tol atau jalan aspal halus antarkota dengan jarak tempuh yang jauh 2. Keawetan tapak, dan efisiensi bahan bakar maksimal",
    image: "/assets/images/produk/hs315-t.webp",
  },
  {
    id: "hs500",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS500",
    tipe: "bias",
    compatible: ["trukBerat"],
    medan: ["perjalananPanjang", "jalanPerkotaan"],
    fitur: ["antiTear"],
    sizes: ["10.00-20", "11.00-20"],
    description: "1. Desain alur (rib) yang lebih lebar dan dalam. Pola ini mengombinasikan kelancaran ban jalan raya dengan ketangguhan ban medan kasar 2. Sangat tahan terhadap sayatan benda tajam, gesekan trotoar, dan gejala gompal (chipping) akibat medan jalan yang buruk",
    image: "/assets/images/produk/hs500-t.webp",
  },
  {
    id: "hs311",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS311",
    tipe: "bias",
    compatible: ["trukBerat"],
    medan: ["perjalananPanjang", "jalanPerkotaan"],
    fitur: ["handling", "antiAus"],
    sizes: ["10.00-20", "11.00-20"],
    description: "1. Spesialis rute regional/jalan tol yang mengutamakan ketahanan terhadap keausan tidak merata dan traksi jalan basah yang superior di posisi kemudi 2. Dirancang secara akustik untuk meredam gemuruh ban saat bergesekan dengan aspal, memberikan kenyamanan lebih bagi pengemudi selama perjalanan panjang",
    image: "/assets/images/produk/hs311-t.webp",
  },
  {
    id: "hs366",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS366",
    tipe: "bias",
    compatible: ["trukBerat"],
    medan: ["perjalananPanjang", "jalanPerkotaan"],
    fitur: ["handling"],
    sizes: ["12.00-20"],
    description: "1. Ban ini memberikan cengkeraman mekanis yang sangat kuat agar truk tidak mudah selip (spin), terutama saat membawa muatan berat di tanjakan 2. Sangat ideal untuk truk logistik, truk jungkit (dump truck), atau truk kargo yang rutenya mengombinasikan jalan aspal kasar, jalanan proyek konstruksi, area pertambangan ringan, hingga jalan perkebunan",
    image: "/assets/images/produk/hs366-t.webp",
  },
  {
    id: "hs307",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS307",
    tipe: "bias",
    compatible: ["trukRingan"],
    medan: ["offRoad"],
    fitur: ["fuelEfficiency", "antiAus"],
    sizes: ["7.00-16", "7.50-16", "7.50-16"],
    description: "1. Kemampuannya menahan keausan tidak merata (seperti botak sebelah atau bergelombang) yang sering terjadi pada roda depan truk. Bahu ban dirancang kaku (rigid shoulder) agar tekanan beban tersebar merata 2. Dirancang untuk meminimalkan energi yang hilang akibat gesekan, menjadikannya pilihan ekonomis bagi perusahaan logistik yang ingin memangkas biaya operasional bahan bakar",
    image: "/assets/images/produk/hs307-t.webp",
  },
  {
    id: "hs600",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS600",
    tipe: "bias",
    compatible: ["trukRingan"],
    medan: ["offRoad"],
    fitur: ["handling"],
    sizes: ["7.50-16"],
    description: "1. Memberikan cengkeraman mekanis maksimal pada permukaan yang sangat tidak stabil, seperti lumpur dalam, tanah gembur, dan tumpukan batu pecah 2. Dibuat sangat renggang agar ban memiliki kemampuan self-cleaning (membersihkan diri) yang luar biasa. Lumpur pekat atau tanah liat tidak akan menyumbat ban, sehingga traksi tetap terjaga",
    image: "/assets/images/produk/hs600-t.webp",
  },
  {
    id: "hs314",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS314",
    tipe: "bias",
    compatible: ["trukRingan", "trukBerat"],
    medan: ["offRoad"],
    fitur: ["handling"],
    sizes: ["7.50-16", "8.25-16", "10.00-20", "11.00-20"],
    description: "1. Ban ini sering diaplikasikan pada truk yang sesekali harus masuk ke area light off-road, seperti jalan tanah kering yang padat, jalan berbatu sirtu (pasir batu), atau area proyek/konstruksi yang permukaannya sudah diratakan",
    image: "/assets/images/produk/hs314-t.webp",
  },
  {
    id: "ht5",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HT5",
    tipe: "bias",
    compatible: ["trukRingan", "trukBerat"],
    medan: ["offRoad"],
    fitur: ["handling"],
    sizes: ["7.00-16", "9.00-20"],
    description: "1. HT5 terkenal sangat kokoh, tebal, dan punya daya tahan benturan yang tinggi 2. mengatasi medan off-road yang sangat ringan, seperti jalanan tanah kering yang rata, jalan berbatu halus/kerikil di area pedesaan, atau rumput basah",
    image: "/assets/images/produk/ht5-t.webp",
  },
  {
    id: "431",
    brand: "tiron",
    brandChip: "Tiron",
    name: "431",
    tipe: "bias",
    compatible: ["trukBerat"],
    medan: ["offRoad"],
    fitur: ["handling"],
    sizes: ["10.00-20", "11.00-20"],
    description: "1. Sangat ideal untuk dump truck (indeks tronton/engkel) yang bekerja di dalam area pertambangan batubara/mineral, proyek pembangunan bendungan, pembukaan lahan hutan (logging), serta area lanskap perkebunan kelapa sawit yang jalannya masih didominasi tanah merah dan batuan keras",
    image: "/assets/images/produk/431-t.webp",
  },
  {
    id: "hs700",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS700",
    tipe: "bias",
    compatible: ["trukBerat"],
    medan: ["offRoad"],
    fitur: ["antiTear"],
    sizes: ["11.00-20"],
    description: "1. Dibuat khusus agar tapak ban tidak mudah robek, teriris (cut), atau gempil (chipping/gompal) saat harus melindas bebatuan tajam sisa blasting (peledakan tambang) atau sisa puing proyek konstruksi",
    image: "/assets/images/produk/hs700-t.webp",
  },
  {
    id: "hs389",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS389",
    tipe: "bias",
    compatible: ["trukBerat"],
    medan: ["offRoad"],
    fitur: ["handling", "bebanBerat"],
    sizes: ["12.00-20"],
    description: "1. Memberikan kendali yang presisi, namun struktur internalnya juga sangat siap dipasang di posisi roda penggerak belakang (Drive) atau roda gandengan (Trailer) untuk kapasitas muatan yang masif",
    image: "/assets/images/produk/hs389-t.webp",
  },
  {
    id: "hs309",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS309",
    tipe: "bias",
    compatible: ["trukRingan", "trukBerat"],
    medan: ["offRoad"],
    fitur: ["handling", "fuelEfficiency", "antiAus"],
    sizes: ["7.50-16", "10.00-20"],
    description: "1. Fokus pada kenyamanan kemudi, efisiensi solar, dan ketahanan terhadap aus tidak merata di jalan raya beraspal/jalan tol 2. ban ini juga sangat fleksibel untuk dipasang di roda trailer (gandengan) atau roda belakang pada truk kargo dengan muatan standar yang rutenya murni jalan aspal",
    image: "/assets/images/produk/hs309-t.webp",
  },
  {
    id: "hs320",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS320",
    tipe: "bias",
    compatible: ["trukRingan", "trukBerat"],
    medan: ["offRoad"],
    fitur: ["jarakTempuh", "fuelEfficiency", "bebanBerat"],
    sizes: ["7.50-16", "8.25-16", "10.00-20", "11.00-20"],
    description: "1. Fokus pada umur tapak yang panjang (high mileage), stabilitas kemudi, dan efisiensi bahan bakar di jalan aspal mulus antarkota (steer/trailer) 2. Sangat tangguh dalam menahan beban berat, tahan terhadap suhu panas akibat gesekan konstan di jalan tol, serta mempertahankan integritas kerangka ban (casing) agar tetap prima untuk kebutuhan vulkanisir (retreading) di masa depan",
    image: "/assets/images/produk/hs320-t.webp",
  },
  {
    id: "hs800-pneumatic",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HS800 Pneumatic",
    tipe: "bias",
    compatible: ["trukRingan"],
    medan: ["perjalananPanjang", "jalanPerkotaan"],
    fitur: [],
    sizes: ["6.00-0", "6.50-10", "7.00-12", "8.25-15", "28x9-15"],
    description: "1. Ban pneumatic lebih toleran terhadap panas akibat gesekan, sehingga alat berat dapat berjalan sedikit lebih cepat dibanding jika menggunakan ban solid 2. Di permukaan tanah yang agak gembur, ban isi angin cenderung tidak mudah amblas dibandingkan ban solid",
    image: "/assets/images/produk/hs800-pneumatic-t.webp",
  },
  {
    id: "tube-forklift",
    brand: "tiron",
    brandChip: "Tiron",
    name: "Tube Forklift",
    tipe: "bias",
    compatible: ["trukRingan"],
    medan: [],
    fitur: [],
    sizes: ["6.00-9", "6.50-10", "7.00-12", "8.25-15"],
    description: "Ukuran harus sama dengan ukuran ban luar",
    image: "/assets/images/produk/tube-forklift-t.webp",
  },
  {
    id: "tube-flap",
    brand: "tiron",
    brandChip: "Tiron",
    name: "Tube Flap",
    tipe: "bias",
    compatible: ["trukRingan", "trukBerat"],
    medan: [],
    fitur: [],
    sizes: ["7.00-15", "7.00-16", "7.50-16", "8.25-16", "8-25-20", "9.00-20", "10.00-20", "11.00-20", "12.00-20", "12.00-24"],
    description: "Ukuran harus sama dengan ukuran ban luar",
    image: "/assets/images/produk/tube-flap-t.webp",
  },
  {
    id: "hra16",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HRA16",
    tipe: "radial",
    compatible: ["trukRingan"],
    medan: [],
    fitur: [],
    sizes: ["7.50R16 (HD)"],
    description: "",
    image: "/assets/images/produk/hra16-t.webp",
  },
  {
    id: "hua95",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HUA95",
    tipe: "radial",
    compatible: ["trukBerat", "bus"],
    medan: ["perjalananPanjang", "jalanPerkotaan", "standar"],
    fitur: ["handling", "antiAus"],
    sizes: ["295/80R22.5", "11R22.5"],
    description: "1. Grip dan traksi telapak yang maksimal di jalan asphalt / toll 2. Sangat cocok untuk perkotaan dan jarak tempuh panjang (toll)",
    image: "/assets/images/produk/hua95-t.webp",
  },
  {
    id: "hmd54",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HMD54",
    tipe: "radial",
    compatible: ["trukBerat"],
    medan: ["offRoad"],
    fitur: ["antiTear", "bebanBerat"],
    sizes: ["10.00R20", "11.00R20"],
    description: "1. Untuk beban maksimal pada truck heavy duty on/off 2. Telapak tahan benturan / tusukan di jalan off road berbatu",
  },
  {
    id: "hfd73",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HFD73",
    tipe: "radial",
    compatible: ["trukRingan", "trukBerat"],
    medan: ["offRoad"],
    fitur: ["antiTear", "bebanBerat"],
    sizes: ["7.50R16(HD)", "10.00R20", "11.00R20", "12.00R20", "12.00R24"],
    description: "1. Untuk beban maksimal di pertambangan dan jalan berbatu 2. Tahan terhadap kerusakan di jalan off road dan berbatu",
    image: "/assets/images/produk/hfd73-t.webp",
  },
  {
    id: "hfd74",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HFD74",
    tipe: "radial",
    compatible: ["trukBerat"],
    medan: ["offRoad"],
    fitur: ["antiTear"],
    sizes: ["11.00R20", "12.00R20"],
    description: "1. Traksi Maksimal untuk jalan pertambangan dan berbatu 2. Tahan terhadap kerusakan di jalan off road dan berbatu",
    image: "/assets/images/produk/hfd74-t.webp",
  },
  {
    id: "hma51",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HMA51",
    tipe: "radial",
    compatible: ["trukRingan", "trukBerat"],
    medan: ["offRoad"],
    fitur: ["bebanBerat"],
    sizes: ["7.50R16(HD)", "10.00R20", "11.00R20"],
    description: "1. Super Steel Belt untuk ketahanan benturan dan tusukan 2. Sesuai untuk Light truck / Truck heavy Duty",
    image: "/assets/images/produk/hma51-t.webp",
  },
  {
    id: "hma52",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HMA52",
    tipe: "radial",
    compatible: ["trukRingan", "trukBerat"],
    medan: ["perjalananPanjang", "jalanPerkotaan"],
    fitur: ["bebanBerat"],
    sizes: ["7.50R16(HD)", "10.00R20", "11.00R20"],
    description: "1. Super Steel Belt untuk ketahanan beban maksimum 2. Sesuai untuk jalan Asphalt perkotaan dan Toll",
    image: "/assets/images/produk/hma52-t.webp",
  },
  {
    id: "hmd53",
    brand: "tiron",
    brandChip: "Tiron",
    name: "HMD53",
    tipe: "radial",
    compatible: ["trukRingan"],
    medan: ["offRoad"],
    fitur: ["bebanBerat"],
    sizes: ["7.50R16(HD)"],
    description: "1. Kapasitas Beban Maksimal untuk Light Truck Heavy Duty 2. Ketahanan Pada kerusakan di Off Road",
    image: "/assets/images/produk/hmd53-t.webp",
  },
  {
    id: "dfa100",
    brand: "doublestar",
    brandChip: "Doublestar",
    name: "DFA100",
    tipe: "radial",
    compatible: ["trukBerat"],
    medan: ["offRoad"],
    fitur: ["antiTear", "antiAus", "bebanBerat"],
    sizes: ["11.00R20", "12.00R20", "12.00R24"],
    description: "1. Anti Tear, kuat untuk berbagai medan berat 2. Kinerja pemuatan yang lebih kuat dan anti aus yang baik",
    image: "/assets/images/produk/dfa100-t.webp",
  },
  {
    id: "dsr688",
    brand: "doublestar",
    brandChip: "Doublestar",
    name: "DSR688",
    tipe: "radial",
    compatible: ["trukBerat"],
    medan: ["offRoad"],
    fitur: ["antiTear", "bebanBerat"],
    sizes: ["12.00R24"],
    description: "1. Anti Tear, kuat untuk berbagai medan berat 2. Kinerja pemuatan yang lebih kuat",
    image: "/assets/images/produk/dsr688-t.webp",
  },
  {
    id: "dfa602s",
    brand: "doublestar",
    brandChip: "Doublestar",
    name: "DFA602S",
    tipe: "radial",
    compatible: ["trukBerat"],
    medan: ["offRoad"],
    fitur: ["antiAus", "bebanBerat"],
    sizes: ["16.00R25-E4"],
    description: "1. Kinerja pemuatan yang lebih kuat 2. Kinerja anti-aus yang baik",
    image: "/assets/images/produk/dfa602s-t.webp",
  },
  {
    id: "d902",
    brand: "doublestar",
    brandChip: "Doublestar",
    name: "D902",
    tipe: "radial",
    compatible: ["trukBerat", "bus"],
    medan: ["perjalananPanjang", "jalanPerkotaan", "standar"],
    fitur: ["jarakTempuh", "handling"],
    sizes: ["11R22.5"],
    description: "1. Kemampuan cengkraman dan stabilitas yang baik 2. Jarak tempuh yang panjang dan lebih hemat bahan bakar 3. Anti Aus, jarak tempuh lebih panjang",
    image: "/assets/images/produk/d902-t.webp",
  },
  {
    id: "f10628pro",
    brand: "doublestar",
    brandChip: "Doublestar",
    name: "F10628PRO",
    tipe: "radial",
    compatible: ["trukBerat"],
    medan: ["offRoad"],
    fitur: ["antiTear"],
    sizes: ["10.00RR20"],
    description: "1. Anti Tear, kuat untuk berbagai medan berat 2. Anti Gores, jauh lebih aman dan performa berkendara yang baik",
    image: "/assets/images/produk/f10628pro-t.webp",
  },
  {
    id: "dua100-max",
    brand: "doublestar",
    brandChip: "Doublestar",
    name: "DUA100 MAX",
    tipe: "radial",
    compatible: ["trukRingan"],
    medan: ["jalanPerkotaan", "standar"],
    fitur: ["jarakTempuh", "handling", "antiAus"],
    sizes: ["7.50R16-14PR"],
    description: "1. Anti Aus, jarak tempuh lebih panjang 2. Anti Gores, jauh lebih aman dan performa berkendara yang baik 3. Kemampuan cengkraman dan stabilitas yang baik",
    image: "/assets/images/produk/dua100-max-t.webp",
  },
  {
    id: "dma105pro",
    brand: "doublestar",
    brandChip: "Doublestar",
    name: "DMA105PRO",
    tipe: "radial",
    compatible: ["trukBerat"],
    medan: ["jalanPerkotaan", "standar"],
    fitur: ["handling", "antiAus", "bebanBerat"],
    sizes: ["10.00R20", "11.00R20"],
    description: "1. Kinerja anti aus yang baik 2. Kinerja pemuatan yang lebih kuat 3. Kemampuan cengkraman dan stabilitas yang baik",
    image: "/assets/images/produk/dma105pro-t.webp",
  },
  {
    id: "dma108pro",
    brand: "doublestar",
    brandChip: "Doublestar",
    name: "DMA108PRO",
    tipe: "radial",
    compatible: ["trukRingan", "trukBerat"],
    medan: ["jalanPerkotaan", "standar"],
    fitur: ["fuelEfficiency", "antiAus", "bebanBerat"],
    sizes: ["7.50R16", "10.00R20"],
    description: "1. Anti Aus, jarak tempuh lebih panjang 2. Kinerja pemuatan yang lebih kuat 3. Performa berkendara yang baik dan lebih hemat bahan bakar",
    image: "/assets/images/produk/dma108pro-t.webp",
  },
  {
    id: "dsr758",
    brand: "doublestar",
    brandChip: "Doublestar",
    name: "DSR758",
    tipe: "radial",
    compatible: ["trukRingan"],
    medan: ["perjalananPanjang", "jalanPerkotaan", "offRoad"],
    fitur: ["fuelEfficiency", "antiAus", "bebanBerat"],
    sizes: ["7.50R16-14PR"],
    description: "1. Anti Aus, jarak tmpuh lebih panjang 2. Performa berkendara yang baik dan lebih hemat bahan bakar 3. Kinerja pemuatan yang lebih kuat",
    image: "/assets/images/produk/dsr758-t.webp",
  },
  {
    id: "dma106pro",
    brand: "doublestar",
    brandChip: "Doublestar",
    name: "DMA106PRO",
    tipe: "radial",
    compatible: ["trukBerat"],
    medan: ["standar", "offRoad"],
    fitur: ["handling", "bebanBerat"],
    sizes: ["11.00R20"],
    description: "1. Kemampuan cengkraman yang sangat baik dan stabilitas penanganan yang baik 2. Kinerja pemuatan yang lebih kuat",
    image: "/assets/images/produk/dma106pro-t.webp",
  },
  {
    id: "dma107pro",
    brand: "doublestar",
    brandChip: "Doublestar",
    name: "DMA107PRO",
    tipe: "radial",
    compatible: ["trukRingan"],
    medan: ["jalanPerkotaan", "standar"],
    fitur: ["jarakTempuh", "antiAus", "bebanBerat"],
    sizes: ["7.50R16-14PR"],
    description: "1. Anti Aus, jarak tempuh lebih panjang 2. Kinerja pemuatan yang lebih kuat 3. Performa berkendara yang baik dan lebih hemat bahan bakar",
    image: "/assets/images/produk/dma107pro-t.webp",
  },
  {
    id: "dsr188pro",
    brand: "doublestar",
    brandChip: "Doublestar",
    name: "DSR188PRO",
    tipe: "radial",
    compatible: ["trukRingan"],
    medan: ["perjalananPanjang", "jalanPerkotaan", "offRoad"],
    fitur: ["fuelEfficiency", "antiAus", "bebanBerat"],
    sizes: ["7.50R16-14PR"],
    description: "1. Anti Aus, jarak tmpuh lebih panjang 2. Performa berkendara yang baik dan lebih hemat bahan bakar 3. Kinerja pemuatan yang lebih kuat",
    image: "/assets/images/produk/dsr188pro-t.webp",
  },
];


