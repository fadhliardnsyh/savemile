/**
 * Sumber konten terpusat untuk landing page SaveMile.
 *
 * Semua teks & data section diambil dari sini. Saat CMS dipasang nanti
 * (Sanity / Payload), cukup ganti isi konstanta di file ini agar menarik
 * data dari CMS, komponen UI tidak perlu diubah.
 */

export const site = {
  name: "SaveMile",
  tagline: "Pilih ban yang tepat, kelola lebih cerdas.",
  blurb:
    "Konsultan & distributor ban untuk armada dan logistik. Kami bantu pilih ban yang tepat dan tekan biaya operasional berbasis data.",
  email: "halo@savemile.id",
  hrEmail: "hr@savemile.id",
  whatsapp: "https://wa.me/6281234567890",
  phone: "+6281234567890",
  address: "Jl. Industri Raya No. 88, Jakarta 13920, Indonesia",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
} as const;

/* ---------- Navigasi (dengan submenu / dropdown) ---------- */

export type NavChild = { label: string; href: string; desc?: string };
export type NavItem = { label: string; children: NavChild[] };

export const nav: NavItem[] = [
  {
    label: "Solution",
    children: [
      {
        label: "Catalogue",
        href: "/solusi/ban",
        desc: "Katalog ban truk, bus & kendaraan komersial",
      },
      {
        label: "Tire Management Solution",
        href: "/solusi/tire-monitoring-system",
        desc: "Solusi pengelolaan ban armada menyeluruh",
      },
    ],
  },
  {
    label: "Insight",
    children: [
      {
        label: "Success Story",
        href: "/insight/success-story",
        desc: "Cerita armada yang berhasil menghemat",
      },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/company/about", desc: "Tentang SaveMile" },
      {
        label: "Career",
        href: "/company/career",
        desc: "Bergabung dengan tim kami",
      },
      {
        label: "Contact Us",
        href: "/company/contact",
        desc: "Terhubung dengan tim SaveMile",
      },
    ],
  },
];

/* ---------- Hero ---------- */

export const hero = {
  eyebrow: "Tire Consultant & Distributor",
  // Foto background hero (Ban + Sistem + Truk). Taruh file di
  // public/assets/images/hero.jpg lalu isi path di bawah. Biarkan kosong ("")
  // untuk menampilkan fallback gelap bertekstur.
  // Sumber saat ini: Unsplash (foto truk di jalan, di-crop ke bagian roda), lisensi gratis, komersial, tanpa atribusi.
  image: "/assets/images/hero-home.webp",
  description:
    "Solusi ban berkualitas untuk kendaraan Anda, dilengkapi teknologi pengelolaan ban berbasis data dalam satu platform.",
  finder: {
    caption: "Cari Ban",
    byVehicle: {
      label: "Berdasarkan Kendaraan",
      sub: "Truk, bus, & komersial",
      href: "/solusi/ban?f=kendaraan",
    },
    bySize: {
      label: "Berdasarkan Ukuran",
      sub: "mis. 1000-20 · 11R22.5",
      href: "/solusi/ban?f=ukuran",
    },
  },
};

/* ---------- Section 1: Klien & Statistik ---------- */

export const clients = {
  title: "Dipercaya oleh klien dan mitra industri",
  highlight: ["klien", "mitra industri"],
  body: "Dari BUMN hingga perusahaan swasta terbaik di Indonesia memilih SaveMile.",
  logos: [
    { name: "Shell", src: "/assets/logos/Logo Shell.svg" },
    { name: "Blog", src: "/assets/logos/Logo_Blog.png" },
    { name: "Doublestar", src: "/assets/logos/Logo_Doublestar.png" },
    { name: "SCB", src: "/assets/logos/Logo_SCB.png" },
    { name: "Tiron", src: "/assets/logos/Logo_Tiron.png" },
    { name: "Yosua", src: "/assets/logos/Logo_Yosua.png" },
  ],
};

export const stats = [
  {
    value: "10.000+",
    label: "Ban kendaraan aktif terpasang di seluruh Indonesia",
    icon: "tire",
  },
  { value: "99%", label: "Bebas dari fraud", icon: "shield" },
  {
    value: "60+",
    label: "Jaringan mitra & gudang di seluruh Indonesia",
    icon: "pin",
  },
  {
    value: "25%",
    label: "Efisiensi biaya operasional per tahun",
    icon: "consult",
  },
] as const;

/* ---------- Section 2: Kenapa memilih SaveMile ---------- */

export type WhyItem = {
  icon: "consult" | "laser" | "bell" | "shield";
  tag: string;
  title: string;
  highlight?: string[]; // kata/frasa di dalam title yang diberi aksen oranye
  body: string;
  image?: string; // mis. "/assets/images/tire-consulting.jpg"
};

export const whyChoose = {
  title: "Kenapa ribuan pengguna memilih SaveMile",
  titleLead: "Kenapa ribuan ",
  titleAccent: "pengguna",
  titleTail: " memilih SaveMile",
  highlight: ["pengguna"],
  body: "Kami tidak hanya menyediakan ban berkualitas, kami membantu mengelola aset ban Anda dengan lebih efektif, efisien, dan berbasis data.",
  items: [
    {
      icon: "consult",
      tag: "Tire Consulting",
      title:
        "Kurangi biaya operasional secara signifikan dengan jenis ban yang tepat",
      highlight: ["signifikan", "tepat"],
      body: "Kami membantu menganalisa data ban kendaraan dan rute untuk merekomendasikan ban dengan cost per kilometer terendah.",
      image: "/assets/images/why-consulting.webp",
    },
    {
      icon: "laser",
      tag: "Laser Tire Marking",
      title: "Kurangi risiko kehilangan ban hingga 99%",
      highlight: ["99%"],
      body: "Tandai ban dengan teknologi laser permanen. Setiap ban teridentifikasi secara akurat, mudah dilacak, dan aman dari penyalahgunaan.",
      image: "/assets/images/why-marking.webp",
    },
    {
      icon: "bell",
      tag: "Automate Notification",
      title: "Ketahui kerusakan lebih awal sebelum jadi kerugian besar",
      highlight: ["kerugian besar"],
      body: "Notifikasi otomatis ketika umur ban mendekati batas aman, sehingga kendaraan tetap produktif dan biaya operasional tetap terkendali.",
      image: "/assets/images/why-notification.webp",
    },
  ] as WhyItem[],
};

/* ---------- Section: Jaringan cabang (peta Indonesia) ---------- */

export type BranchType = "service" | "warehouse";

/** Lokasi tanpa posisi di peta — dipakai untuk daftar chip di bawah peta. */
export type Location = {
  city: string;
  types: BranchType[]; // bisa gudang & titik servis sekaligus
};

export type Branch = {
  city: string;
  // Koordinat piksel LANGSUNG di ruang viewBox peta (0..1014, 0..405),
  // bukan lat/lon — peta SVG yang dipakai bukan proyeksi geografis akurat,
  // jadi tiap titik dikalibrasi manual (visual) agar presisi jatuh di daratan.
  x: number;
  y: number;
  types: BranchType[];
};

export const coverage = {
  title: "Jangkauan layanan kami sampai di seluruh Indonesia",
  accent: "seluruh Indonesia",
  body: "Team SaveMile siap mendukung operasional Anda dari Sabang sampai Merauke",
  stats: [
    { value: "4", label: "Gudang (Warehouse)" },
    { value: "62", label: "Titik Servis" },
  ],
  // Daftar lokasi asli (ditampilkan sebagai chip di bawah peta).
  locations: [
    { city: "Tangerang", types: ["warehouse"] },
    { city: "Jabodetabek", types: ["service"] },
    { city: "Karawang", types: ["service"] },
    { city: "Bandung", types: ["warehouse", "service"] },
    { city: "Cilacap", types: ["service"] },
    { city: "Boyolali", types: ["service"] },
    { city: "Klaten", types: ["service"] },
    { city: "Solo", types: ["service"] },
    { city: "Rembang", types: ["service"] },
    { city: "Bali", types: ["warehouse", "service"] },
    { city: "Lombok", types: ["service"] },
    { city: "Sumbawa", types: ["service"] },
    { city: "Pontianak", types: ["warehouse", "service"] },
  ] as Location[],
  branches: [
    { city: "Tangerang", x: 240, y: 303, types: ["warehouse"] },
    { city: "Jabodetabek", x: 265, y: 298, types: ["service"] },
    { city: "Karawang", x: 285, y: 300, types: ["service"] },
    { city: "Bandung - WH", x: 266, y: 316, types: ["warehouse"] },
    { city: "Bandung - S", x: 280, y: 316, types: ["service"] },
    { city: "Cilacap", x: 351, y: 330, types: ["service"] },
    { city: "Boyolali", x: 305, y: 325, types: ["service"] },
    { city: "Klaten", x: 335, y: 326, types: ["service"] },
    { city: "Solo", x: 350, y: 320, types: ["service"] },
    { city: "Rembang", x: 355, y: 305, types: ["service"] },
    { city: "Bali - WH", x: 434, y: 343, types: ["warehouse"] },
    { city: "Bali - S", x: 447, y: 340, types: ["service"] },
    { city: "Lombok", x: 490, y: 350, types: ["service"] },
    { city: "Sumbawa", x: 467, y: 347, types: ["service"] },
    { city: "Pontianak - WH", x: 334, y: 161, types: ["warehouse"] },
    { city: "Pontianak - S", x: 320, y: 150, types: ["service"] },
  ] as Branch[],
};

/* ---------- Section 3: Success Story ---------- */

export type StoryMetric = {
  label: string;
  value: string;
};

export type Story = {
  slug: string;
  tag: string;
  title: string;
  units: string;
  description: string;
  challenge?: string;
  solution?: string;
  body?: string[];
  metrics?: StoryMetric[];
  href: string;
  image?: string;
};

export const successStory = {
  eyebrow: "Case Studies",
  title: "Terbukti di lapangan",
  accent: "lapangan",
  viewAll: { label: "Lihat semua", href: "/insight/success-story" },
  items: [
    {
      slug: "pt-trimitra-trans-persada",
      tag: "Logistik",
      title: "PT Trimitra Trans Persada: 20% penghematan biaya CPK ban",
      units: "3.000 unit armada",
      description:
        "Mengelola ban armada berbasis data menekan cost-per-kilometer dan downtime secara signifikan dalam 6 bulan pertama.",
      challenge:
        "PT Trimitra Trans Persada mengoperasikan lebih dari 3.000 unit armada logistik lintas pulau. Sebelum bekerja sama dengan SaveMile, tantangan utama mereka adalah kesulitan melacak kondisi ban secara konsisten di setiap wilayah operasional, tingginya angka kanibalisasi ban tanpa pencatatan resmi, dan biaya CPK (Cost Per Kilometer) ban yang membengkak akibat pemilihan tipe ban yang kurang presisi.",
      solution:
        "SaveMile melakukan implementasi sistem Laser Tire Marking pada seluruh ban baru dan terpasang untuk memberikan identitas unik permanen. Tim konsultasi SaveMile menganalisis rute muatan tinggi serta merekomendasikan kombinasi pola telapak ban (steer vs drive) yang paling optimal. Notifikasi otomatis diaktifkan untuk penguliran dan perputaran ban (rotation schedule).",
      body: [
        "Dalam skala operasional 3.000 armada, transparansi data adalah segalanya. Tanpa sistem penandaan dan sistem analitik ban, kebocoran biaya halus seperti rotasi terlambat atau keausan tidak rata sering tidak terdeteksi hingga ban rusak secara prematur.",
        "Melalui integrasi platform SaveMile Tire Monitoring System, setiap unit kendaraan mendapatkan jadwal perawatan ban yang terukur. Teknisi di lapangan dapat melakukan inspeksi cepat dan memverifikasi identitas fisik ban secara langsung.",
        "Hasilnya, penghematan langsung terlihat pada kuartal kedua penerapan. Umur pakai rata-rata ban meningkat hingga 18%, efisiensi pemakaian ban bekas meningkat, dan angka kehilangan ban berkurang hingga hampir 0%.",
      ],
      metrics: [
        { label: "Penghematan CPK Ban", value: "20%" },
        { label: "Total Armada Terintegrasi", value: "3.000+ Unit" },
        { label: "Risiko Kehilangan Ban", value: "< 1%" },
      ],
      href: "/insight/success-story/pt-trimitra-trans-persada",
      image: "/assets/images/cases/logistik.webp",
    },
    {
      slug: "pt-yosua-berhasil-beruntung",
      tag: "Distribusi",
      title: "PT Yosua Berhasil Beruntung: nol insiden ban aus sepanjang tahun",
      units: "200 unit",
      description:
        "Notifikasi penggantian tepat waktu menjaga armada tetap produktif tanpa insiden ban aus.",
      challenge:
        "Sebagai perusahaan distribusi bahan pokok dengan jadwal pengiriman harian yang ketat, insiden ban aus di tengah perjalanan menyebabkan keterlambatan armada dan biaya penanganan darurat yang tinggi.",
      solution:
        "Penerapan modul Auto Notification & Tire Health Report dari SaveMile. Setiap mendekati batas kedalaman alur aman, tim operasional menerima peringatan dini untuk melakukan penggantian terjadwal di depo terdekat.",
      body: [
        "Kecepatan dan ketepatan waktu pengiriman barang consumable tidak menoleransi downtime akibat gangguan teknis ban.",
        "Dengan pemantauan rutin dan peringatan otomatis sebelum kondisi kritis, penggantian ban kini dilakukan saat armada sedang dalam masa perawatan berkala di pool.",
        "Langkah preventif ini menghindarkan perusahaan dari risiko kecelakaan, kerusakan muatan, dan pengeluaran mendadak untuk penggantian ban darurat di jalan.",
      ],
      metrics: [
        { label: "Insiden Ban Aus di Jalan", value: "0 Cases" },
        { label: "On-Time Delivery Rate", value: "99.4%" },
        { label: "Total Armada", value: "200 Unit" },
      ],
      href: "/insight/success-story/pt-yosua-berhasil-beruntung",
      image: "/assets/images/cases/distribusi.webp",
    },
    {
      slug: "pt-selaras-cipta-bersatu",
      tag: "Konstruksi",
      title:
        "PT Selaras Cipta Bersatu: umur ban lebih panjang, biaya turun drastis",
      units: "300 unit",
      description:
        "Rekomendasi ban yang tepat untuk medan berat memperpanjang umur ban dan memangkas biaya penggantian.",
      challenge:
        "Operasional kendaraan di sektor konstruksi dan medan jalan berbatu tajam menyebabkan ban sering mengalami chipping, scaling, dan pecah dinding sebelum mencapai usia pakai standar.",
      solution:
        "SaveMile merekomendasikan seri ban off-road/mixed-service khusus berbahan kompon ekstra tahan benturan, dipadukan dengan pemantauan tekanan angin berkala.",
      body: [
        "Medan berat memerlukan perlakuan dan formulasi kompon ban yang berbeda dibanding kendaraan jalan tol.",
        "Setelah beralih ke spesifikasi ban yang direkomendasikan SaveMile, ketahanan telapak ban terhadap batuan tajam meningkat signifikan.",
        "Total pengeluaran tahunan untuk pembelian ban baru di divisi proyek mengalami penurunan dramatis karena umur ban meningkat lebih dari 35%.",
      ],
      metrics: [
        { label: "Peningkatan Umur Ban", value: "+35%" },
        { label: "Penurunan Biaya Penggantian", value: "28%" },
        { label: "Armada Proyek", value: "300 Unit" },
      ],
      href: "/insight/success-story/pt-selaras-cipta-bersatu",
      image: "/assets/images/cases/konstruksi.webp",
    },
  ] as Story[],
};

/* ---------- Section 4: Final CTA ---------- */

/* ---------- CTA (dipakai bersama via <CtaSection>) ---------- */

export type CtaContent = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  whatsappLabel: string;
  whatsappMessage?: string;
  whatsappUrl?: string;
};

/** CTA penutup home page. */
export const finalCta: CtaContent = {
  eyebrow: "Siap menghemat?",
  titleLead: "Siap membuat setiap kilometer lebih ",
  titleAccent: "bernilai?",
  description:
    "Temukan solusi ban yang sesuai dengan kendaraan Anda dan ketahui seberapa besar biaya yang bisa dihemat.",
  whatsappLabel: "Konsultasi Gratis Sekarang",
  whatsappMessage: "Halo SaveMile, saya ingin berkonsultasi mengenai ban armada.",
};

/** CTA konsultasi (halaman katalog & detail). */
export const consultCta: CtaContent = {
  eyebrow: "Butuh bantuan memilih?",
  titleLead: "Konsultasikan kebutuhan ban ",
  titleAccent: "armada Anda",
  description:
    "Tim teknis SaveMile siap membantu memilih ban yang paling sesuai untuk kendaraan, rute, dan anggaran Anda.",
  whatsappLabel: "Chat WhatsApp",
  whatsappMessage: "Halo SaveMile, saya ingin berkonsultasi mengenai kebutuhan ban armada kami.",
};

/* ---------- Tire Monitoring System (TMS) ---------- */

export type TmsIcon =
  | "laser"
  | "route"
  | "bell"
  | "consult"
  | "wrench"
  | "search"
  | "leaf";

export const tms = {
  hero: {
    eyebrow: "Tire Monitoring System",
    titleLead: "Kelola setiap ban, hingga kilometer ",
    titleAccent: "terakhir",
    description:
      "Dari identitas laser hingga notifikasi penggantian otomatis, satu sistem untuk fleet manager yang tidak mau tebak-tebakan soal ban.",
    primary: { label: "Coba Gratis 30 Hari" },
    secondary: { label: "Lihat Demo", href: "#dashboard" },
    // Unsplash (Alex Kalinin), armada truk; lisensi gratis, komersial, tanpa atribusi.
    image: "/assets/images/tms-hero.webp",
  },
  how: {
    eyebrow: "Cara Kerja",
    titleLead: "Kelola ban dari awal hingga akhir dalam ",
    titleAccent: "satu sistem",
    description:
      "SaveMile menghubungkan setiap tahap, dari pemasangan sampai pengakhiran, dalam satu alur yang saling terhubung.",
    steps: [
      {
        icon: "laser" as TmsIcon,
        title: "Laser Marking",
        desc: "Identitas permanen untuk setiap ban SaveMile.",
      },
      {
        icon: "wrench" as TmsIcon,
        title: "Bongkar Pasang Ban",
        desc: "Proses bongkar pasang dilakukan teknisi profesional di lokasi customer.",
      },
      {
        icon: "search" as TmsIcon,
        title: "Tire Age Tracking",
        desc: "Hitung umur ban per kilometer melalui inspeksi ban.",
      },
      {
        icon: "bell" as TmsIcon,
        title: "Auto Notification",
        desc: "Reminder penggantian ban sebelum rusak.",
      },
      {
        icon: "leaf" as TmsIcon,
        title: "Manajemen Ban Bekas",
        desc: "Pengelolaan ban bekas secara ramah lingkungan.",
      },
      {
        icon: "consult" as TmsIcon,
        title: "Analytics",
        desc: "Ambil keputusan pemilihan ban berbasis data.",
      },
    ],
  },
  features: {
    eyebrow: "Yang Anda dapatkan",
    title: "Kendali penuh atas ban armada, berbasis data",
    highlight: ["berbasis data"],
    items: [
      {
        icon: "laser" as TmsIcon,
        title: "Identitas permanen untuk setiap ban",
        desc: "Setiap ban yang dibeli melalui SaveMile mendapatkan identitas unik yang diukir secara permanen menggunakan teknologi laser. Marking ini tidak bisa dihapus, tidak bisa dipalsukan, dan tidak akan pudar seiring waktu, tanda yang akan bertahan selama ban itu digunakan.",
        image: "/assets/images/gambar-1.png",
      },
      {
        icon: "route" as TmsIcon,
        title: "Lacak setiap kilometer yang ditempuh ban Anda",
        desc: "Setelah ban terpasang, kami secara berkala menghitung jarak tempuh ban tersebut. Data ini menjadi dasar dari Tire Health Report, sehingga Anda mendapatkan gambaran akurat tentang kondisi ban dari waktu ke waktu.",
        image: "/assets/images/gambar-2.png",
      },
      {
        icon: "bell" as TmsIcon,
        title: "Ganti ban di waktu yang tepat, bukan saat darurat",
        desc: "Saat ban mendekati batas kilometer aman, Anda akan menerima notifikasi jauh sebelum menjadi masalah di jalan. Rencanakan penggantian sesuai jadwal dan anggaran Anda.",
        image: "/assets/images/gambar-3.png",
      },
      {
        icon: "consult" as TmsIcon,
        title: "Pantau ban yang paling sesuai kebutuhan dalam satu tampilan",
        desc: "Ketahui ban yang paling sesuai untuk Anda: merk ban apa yang paling awet di rute Anda, ban mana yang terpasang di kendaraan mana, dan berapa sisa umur tiap ban, tanpa perlu konfirmasi satu per satu.",
        image: "/assets/images/gambar-4.png",
      },
    ],
  },
  consultation: {
    eyebrow: "Konsultasi Berkala",
    titleLead: "Konsultasi berkualitas secara berkala, ",
    titleAccent: "berbasis data",
    description:
      "Kami selalu memberikan konsultasi laporan CPK ban untuk memastikan setiap ban yang Anda gunakan konsisten sesuai standar kualitas dan performa terbaik.",
  },
};

export const tmsCta: CtaContent = {
  eyebrow: "Konsultasi",
  titleLead: "Siap membuat setiap kilometer lebih ",
  titleAccent: "bernilai?",
  description:
    "Temukan solusi ban yang sesuai dengan kendaraan Anda dan ketahui seberapa besar biaya yang bisa dihemat.",
  whatsappLabel: "Konsultasi Gratis Sekarang",
  whatsappMessage: "Halo SaveMile, saya ingin tahu lebih lanjut mengenai Tire Management Solution (TMS).",
};

/* ---------- Company: About ---------- */

export const about = {
  hero: {
    eyebrow: "Tentang SaveMile",
    titleLead: "Tentang ",
    titleAccent: "Kami",
    description:
      "Kami hadir untuk memastikan setiap kendaraan Anda menggunakan ban yang tepat, biaya operasional lebih efisien, tanpa mengorbankan kualitas.",
  },
  story: {
    eyebrow: "Misi Kami",
    title: "Kami bukan sekadar distributor ban",
    highlight: ["distributor ban"],
    image: "/assets/images/why-consulting.webp",
    body: [
      "Kami hadir untuk memastikan setiap kendaraan Anda menggunakan ban yang tepat sehingga biaya operasional lebih efisien tanpa mengorbankan kualitas.",
      "Sejak pertama kali berdiri, SaveMile telah mendistribusikan ribuan ban untuk perusahaan di seluruh Indonesia dengan satu tujuan: menekan biaya operasional kendaraan secara signifikan berbasis data.",
    ],
    points: [
      {
        icon: "consult",
        title: "Berbasis data",
        desc: "Rekomendasi ban dari analisa rute & beban nyata.",
      },
      {
        icon: "shield",
        title: "Produk resmi",
        desc: "Bersumber langsung dari pabrikan resmi.",
      },
      {
        icon: "route",
        title: "Dikelola end-to-end",
        desc: "Dari pemasangan sampai penggantian ban.",
      },
    ],
  },
  trust: {
    title: "Dari BUMN hingga perusahaan swasta terkemuka di Indonesia",
    highlight: ["BUMN", "perusahaan swasta terkemuka"],
    body: "Mereka mempercayakan kebutuhan ban kendaraan mereka kepada SaveMile.",
  },
};

/* ---------- Company: Career ---------- */

export const career = {
  hero: {
    eyebrow: "Karier",
    titleLead: "Wujudkan karir impian bersama ",
    titleAccent: "SaveMile",
    description:
      "Ambil bagian dalam menciptakan solusi yang memberikan dampak nyata bagi banyak bisnis di Indonesia.",
  },
  values: {
    eyebrow: "Nilai Kami",
    title: "Nilai yang membentuk cara kami bekerja",
    titleLead: "Nilai yang membentuk ",
    titleAccent: "cara kami bekerja",
    body: "Nilai-nilai ini bukan sekadar tulisan, melainkan keyakinan yang memandu cara kami bekerja dan bertumbuh setiap harinya.",
    items: [
      {
        icon: "target",
        title: "Ownership",
        desc: "Bertanggung jawab penuh atas setiap pekerjaan dan menyelesaikannya dengan standar terbaik.",
      },
      {
        icon: "bulb",
        title: "Invert Thinking",
        desc: "Menemukan solusi dari sudut pandang yang belum pernah terpikirkan.",
      },
      {
        icon: "bolt",
        title: "Speed",
        desc: "Kemajuan kecil yang konsisten lebih berharga dari kesempurnaan yang ditunda.",
      },
      {
        icon: "badge",
        title: "Integrity",
        desc: "Apa yang diucapkan selalu sama dengan apa yang dilakukan.",
      },
      {
        icon: "growth",
        title: "Growth Mindset",
        desc: "Pencapaian besar berasal dari orang yang tidak pernah berhenti belajar.",
      },
      {
        icon: "users",
        title: "Collaboration",
        desc: "Hasil terbaik lahir ketika semua bergerak menuju tujuan yang sama.",
      },
    ],
  },
  join: {
    eyebrow: "Gabung Tim",
    titleLead: "Bergabunglah dengan tim ",
    titleAccent: "SaveMile",
    description:
      "Ambil bagian dalam menciptakan solusi yang memberikan dampak nyata bagi banyak bisnis di Indonesia.",
    whatsappLabel: `Kirim CV ke ${site.hrEmail}`,
    action: {
      label: `Kirim CV ke ${site.hrEmail}`,
      href: `mailto:${site.hrEmail}`,
      icon: "mail" as const,
    },
  },
};

/* ---------- Company: Contact ---------- */

export const contact = {
  hero: {
    eyebrow: "Kontak",
    titleLead: "Kami siap memberikan layanan terbaik untuk ",
    titleAccent: "Anda",
    description:
      "Pilih kontak yang sesuai dengan kebutuhan Anda, dan kami akan dengan senang hati menghubungi Anda.",
  },
  help: {
    eyebrow: "Hubungi Kami",
    title: "Bagaimana kami dapat membantu Anda?",
    highlight: ["membantu Anda?"],
    body: "Pilih kontak yang sesuai dengan kebutuhan Anda, dan kami akan dengan senang hati menghubungi Anda.",
    options: [
      {
        icon: "whatsapp",
        tag: "Layanan Pelanggan",
        title: "Pertanyaan produk & platform",
        desc: "Pertanyaan seputar produk, layanan, atau platform SaveMile? Kami siap membantu.",
        actionLabel: "Chat WhatsApp",
        href: site.whatsapp,
        external: true,
      },
    ],
  },
  info: [
    { icon: "pin", label: "Alamat", value: site.address },
    {
      icon: "mail",
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: "phone",
      label: "Telepon",
      value: "+62 812-3456-7890",
      href: `tel:${site.phone}`,
    },
  ],
};

/* ---------- Footer ---------- */

export const footerColumns = [
  {
    title: "Solution",
    links: [
      { label: "Catalogue", href: "/solusi/ban" },
      {
        label: "Tire Management Solution",
        href: "/solusi/tire-monitoring-system",
      },
    ],
  },
  {
    title: "Insight",
    links: [{ label: "Success Story", href: "/insight/success-story" }],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/company/about" },
      { label: "Career", href: "/company/career" },
      { label: "Contact Us", href: "/company/contact" },
    ],
  },
];


