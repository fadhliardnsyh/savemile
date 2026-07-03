/**
 * Sumber konten terpusat untuk landing page SaveMile.
 *
 * Semua teks & data section diambil dari sini. Saat CMS dipasang nanti
 * (Sanity / Payload), cukup ganti isi konstanta di file ini agar menarik
 * data dari CMS — komponen UI tidak perlu diubah.
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
        label: "Ban",
        href: "/solusi/ban",
        desc: "Katalog ban truk, bus & kendaraan komersial",
      },
      {
        label: "Tire Monitoring System",
        href: "/solusi/tire-monitoring-system",
        desc: "Kelola ban berbasis data dari awal sampai akhir",
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
      { label: "About Brand", href: "/company/about", desc: "Tentang SaveMile" },
      { label: "Career", href: "/company/career", desc: "Bergabung dengan tim kami" },
      { label: "Contact", href: "/company/contact", desc: "Hubungi kami" },
    ],
  },
];

/* ---------- Hero ---------- */

export const hero = {
  eyebrow: "Tire Consultant & Distributor",
  // Foto background hero (Ban + Sistem + Truk). Taruh file di
  // public/assets/images/hero.jpg lalu isi path di bawah. Biarkan kosong ("")
  // untuk menampilkan fallback gelap bertekstur.
  // Sumber saat ini: Unsplash (foto truk di jalan, di-crop ke bagian roda) — lisensi gratis, komersial, tanpa atribusi.
  image: "/assets/images/hero-wheels.webp",
  description:
    "Solusi ban berkualitas untuk kendaraan Anda, dilengkapi teknologi pengelolaan ban berbasis data dalam satu platform.",
  finder: {
    label: "Cari ban berdasarkan",
    byVehicle: {
      label: "Tipe Kendaraan",
      sub: "Truk, bus, & komersial",
      href: "/solusi/ban?f=kendaraan",
    },
    bySize: {
      label: "Ukuran Ban",
      sub: "mis. 1000-20 · 11R22.5",
      href: "/solusi/ban?f=ukuran",
    },
  },
};

/* ---------- Section 1: Klien & Statistik ---------- */

export const clients = {
  title: "Dipercaya oleh klien dan mitra industri",
  body: "Dari BUMN hingga perusahaan swasta terbaik di Indonesia memilih SaveMile.",
  logos: [
    "BGR Logistics",
    "BRI",
    "Cleo",
    "DAMRI",
    "Pelindo",
    "Pertamina",
    "PLN",
    "Paragon",
    "Nestlé",
    "GrahaTrans",
  ],
};

export const stats = [
  { value: "30.000+", label: "Ban kendaraan aktif terpasang", icon: "tire" },
  { value: "99%", label: "Bebas dari fraud", icon: "shield" },
  { value: "340+", label: "Jaringan mitra di seluruh Indonesia", icon: "pin" },
  { value: "30%", label: "Efisiensi biaya operasional per tahun", icon: "consult" },
] as const;

/* ---------- Section 2: Kenapa memilih SaveMile ---------- */

export type WhyItem = {
  icon: "consult" | "laser" | "bell" | "shield";
  tag: string;
  title: string;
  body: string;
  image?: string; // mis. "/assets/images/tire-consulting.jpg"
};

export const whyChoose = {
  title: "Kenapa ribuan pengguna memilih SaveMile",
  body: "Kami tidak hanya menyediakan ban berkualitas — kami membantu mengelola aset ban Anda dengan lebih efektif, efisien, dan berbasis data.",
  items: [
    {
      icon: "consult",
      tag: "Tire Consulting",
      title:
        "Kurangi biaya operasional secara signifikan dengan jenis ban yang tepat",
      body: "Kami membantu menganalisa data ban kendaraan dan rute untuk merekomendasikan ban dengan cost per kilometer terendah.",
    },
    {
      icon: "laser",
      tag: "Laser Tire Marking",
      title: "Kurangi risiko kehilangan ban hingga 99%",
      body: "Tandai ban dengan teknologi laser permanen. Setiap ban teridentifikasi secara akurat, mudah dilacak, dan aman dari penyalahgunaan.",
    },
    {
      icon: "bell",
      tag: "Automate Notification",
      title: "Ketahui kerusakan lebih awal sebelum jadi kerugian besar",
      body: "Notifikasi otomatis ketika umur ban mendekati batas aman, sehingga kendaraan tetap produktif dan biaya operasional tetap terkendali.",
    },
    {
      icon: "shield",
      tag: "Authentic Product Guarantee",
      title: "Jaminan keaslian 100% produk resmi",
      body: "Seluruh produk kami bersumber langsung dari pabrikan resmi untuk keamanan kendaraan Anda.",
    },
  ] as WhyItem[],
};

/* ---------- Section 3: Success Story ---------- */

export type Story = {
  tag: string;
  title: string;
  units: string;
  description: string;
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
      tag: "Logistik",
      title: "PT Trimitra Trans Persada: 20% penghematan biaya CPK ban",
      units: "3.000 unit armada",
      description:
        "Mengelola ban armada berbasis data menekan cost-per-kilometer dan downtime secara signifikan dalam 6 bulan pertama.",
      href: "/insight/success-story",
      image: "/assets/images/cases/logistik.webp",
    },
    {
      tag: "Distribusi",
      title: "PT Yosua Berhasil Beruntung: nol insiden ban aus sepanjang tahun",
      units: "200 unit",
      description:
        "Notifikasi penggantian tepat waktu menjaga armada tetap produktif tanpa insiden ban aus.",
      href: "/insight/success-story",
      image: "/assets/images/cases/distribusi.webp",
    },
    {
      tag: "Konstruksi",
      title: "PT Selaras Cipta Bersatu: umur ban lebih panjang, biaya turun drastis",
      units: "300 unit",
      description:
        "Rekomendasi ban yang tepat untuk medan berat memperpanjang umur ban dan memangkas biaya penggantian.",
      href: "/insight/success-story",
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
};

/** CTA penutup home page. */
export const finalCta: CtaContent = {
  eyebrow: "Siap menghemat?",
  titleLead: "Siap membuat setiap kilometer lebih ",
  titleAccent: "bernilai?",
  description:
    "Temukan solusi ban yang sesuai dengan kendaraan Anda dan ketahui seberapa besar biaya yang bisa dihemat.",
  whatsappLabel: "Konsultasi Gratis Sekarang",
};

/** CTA konsultasi (halaman katalog & detail). */
export const consultCta: CtaContent = {
  eyebrow: "Butuh bantuan memilih?",
  titleLead: "Konsultasikan kebutuhan ban ",
  titleAccent: "armada Anda",
  description:
    "Tim teknis SaveMile siap membantu memilih ban yang paling sesuai untuk kendaraan, rute, dan anggaran Anda.",
  whatsappLabel: "Chat WhatsApp",
};

/* ---------- Tire Monitoring System (TMS) ---------- */

export type TmsIcon = "laser" | "route" | "bell" | "consult";

export const tms = {
  hero: {
    eyebrow: "Tire Monitoring System",
    titleLead: "Kelola setiap ban, hingga kilometer ",
    titleAccent: "terakhir",
    description:
      "Dari identitas laser hingga notifikasi penggantian otomatis — satu sistem untuk fleet manager yang tidak mau tebak-tebakan soal ban.",
    primary: { label: "Coba Gratis 30 Hari" },
    secondary: { label: "Lihat Demo", href: "#dashboard" },
    // Unsplash (Alex Kalinin) — armada truk; lisensi gratis, komersial, tanpa atribusi.
    image: "/assets/images/tms-hero.webp",
  },
  how: {
    eyebrow: "Cara Kerja",
    titleLead: "Empat langkah, ",
    titleAccent: "satu sistem",
    description:
      "SaveMile menghubungkan setiap tahap — dari pemasangan sampai pengakhiran — dalam satu sistem yang saling terhubung.",
    steps: [
      {
        icon: "laser" as TmsIcon,
        tag: "Laser Marking",
        title: "Identitas Permanen",
        desc: "Setiap ban yang dibeli lewat SaveMile diberi kode unik dengan laser — tidak bisa dihapus, tidak bisa dipalsukan.",
      },
      {
        icon: "route" as TmsIcon,
        tag: "Kilometer Tracking",
        title: "Hitung Setiap KM",
        desc: "Setelah ban terpasang, sistem menghitung jarak tempuh. Data ini jadi dasar Tire Health Report tiap ban.",
      },
      {
        icon: "bell" as TmsIcon,
        tag: "Auto Notification",
        title: "Alert Sebelum Rusak",
        desc: "Notifikasi otomatis dikirim ke fleet manager saat ban mendekati batas aman kilometer. Penggantian bisa direncanakan.",
      },
      {
        icon: "consult" as TmsIcon,
        tag: "Analytics",
        title: "Data Jadi Keputusan",
        desc: "Dashboard lengkap: merk ban, umur km, posisi di kendaraan mana. Semua dalam satu tampilan, real-time.",
      },
    ],
  },
  features: {
    eyebrow: "Fitur",
    titleLead: "Kelola ban dari awal hingga akhir dalam ",
    titleAccent: "satu sistem",
    items: [
      {
        icon: "laser" as TmsIcon,
        tag: "Fitur 01 · Laser Tire Marking",
        title: "Identitas permanen untuk setiap ban",
        product: "Laser Permanent ID System",
        desc: "Setiap ban yang dibeli melalui SaveMile mendapatkan identitas unik yang diukir permanen dengan teknologi laser. Marking ini tidak bisa dihapus, dipalsukan, atau pudar — tanda yang bertahan selama ban itu digunakan.",
        bullets: [
          "Kode unik per-ban, terhubung langsung ke database SaveMile",
          "Dapat diverifikasi kapan saja dengan scan sederhana di lapangan",
          "Mencegah ban ilegal masuk ke armada tanpa sepengetahuan Anda",
        ],
        stat: { value: "99%", label: "Risiko kehilangan ban", sub: "turun setelah laser marking" },
      },
      {
        icon: "route" as TmsIcon,
        tag: "Fitur 02 · Tire Health Report",
        title: "Lacak setiap kilometer yang ditempuh ban Anda",
        product: "Kilometer-Based Health Scoring",
        desc: "Begitu ban terpasang, sistem otomatis menghitung jarak tempuhnya. Data ini menjadi dasar Tire Health Report, sehingga Anda mendapat gambaran akurat kondisi ban dari waktu ke waktu.",
        bullets: [
          "Health score real-time: km tempuh vs umur rekomendasi pabrikan",
          "Laporan per-ban, per-kendaraan, per-rute dalam satu dashboard",
          "Histori lengkap sejak ban dipasang hingga dilepas",
        ],
        stat: { value: "±0.1 km", label: "Akurasi tracking", sub: "per siklus perjalanan" },
      },
      {
        icon: "bell" as TmsIcon,
        tag: "Fitur 03 · Automate Notification",
        title: "Ganti ban di waktu yang tepat, bukan saat darurat",
        product: "Smart Alert System",
        desc: "Notifikasi otomatis dikirim ke fleet manager saat umur ban mendekati batas aman — jauh sebelum bermasalah di jalan. Rencanakan penggantian sesuai jadwal dan anggaran Anda.",
        bullets: [
          "Alert via WhatsApp, email, atau notifikasi in-app",
          "Threshold bisa diatur: 80%, 90%, atau 95% umur ban",
          "Armada tetap produktif, downtime mendadak turun drastis",
        ],
        stat: { value: "Rp 4,2 jt", label: "Rata-rata penghematan", sub: "per kendaraan per tahun" },
      },
      {
        icon: "consult" as TmsIcon,
        tag: "Fitur 04 · Fleet Analytics",
        title: "Pantau ban paling sesuai kebutuhan dalam satu tampilan",
        product: "Tire Intelligence Dashboard",
        desc: "Dashboard analytics khusus fleet manager. Lihat merk ban yang paling awet di rute Anda, ban mana di kendaraan mana, dan sisa umur tiap ban — tanpa perlu tanya satu per satu.",
        bullets: [
          "Filter: merk, jenis kendaraan, rute, kondisi jalan, periode",
          "Bandingkan performa antar merk di rute & beban yang sama",
          "Export laporan untuk audit, budgeting, atau evaluasi vendor",
        ],
        stat: { value: "12+", label: "Metrik per ban", sub: "terpantau setiap saat" },
      },
    ],
  },
  dashboard: {
    eyebrow: "Preview Dashboard",
    titleLead: "Semua ban kendaraan, terpantau dalam ",
    titleAccent: "satu layar",
    description:
      "Kelola kondisi ban seluruh armada Anda dalam satu dashboard, kapan saja dan di mana saja.",
  },
};

export const tmsCta: CtaContent = {
  eyebrow: "Mulai pantau hari ini",
  titleLead: "Siap membuat setiap kilometer lebih ",
  titleAccent: "bernilai?",
  description:
    "Setup dalam 2 jam, hemat mulai bulan pertama. Pantau seluruh armada Anda dalam satu sistem.",
  whatsappLabel: "Coba Gratis 30 Hari",
};

/* ---------- Company: About ---------- */

export const about = {
  hero: {
    eyebrow: "Tentang SaveMile",
    titleLead: "Kami bukan sekadar ",
    titleAccent: "distributor ban",
    description:
      "Kami hadir untuk memastikan setiap kendaraan Anda menggunakan ban yang tepat — biaya operasional lebih efisien, tanpa mengorbankan kualitas.",
  },
  story: {
    eyebrow: "Misi Kami",
    title: "Menekan biaya operasional armada, berbasis data",
    body: [
      "Sejak pertama kali berdiri, SaveMile telah mendistribusikan ribuan ban untuk perusahaan di seluruh Indonesia dengan satu tujuan: menekan biaya operasional armada secara signifikan.",
      "Kami tidak hanya menjual ban — kami menganalisa data kendaraan dan rute untuk merekomendasikan ban dengan cost-per-kilometer terendah, lalu membantu mengelolanya lewat Tire Monitoring System.",
    ],
    points: [
      { icon: "consult", title: "Berbasis data", desc: "Rekomendasi ban dari analisa rute & beban nyata." },
      { icon: "shield", title: "Produk resmi", desc: "Bersumber langsung dari pabrikan resmi." },
      { icon: "route", title: "Dikelola end-to-end", desc: "Dari pemasangan sampai penggantian ban." },
    ],
  },
  trust: {
    title: "Dari BUMN hingga swasta terkemuka di Indonesia",
    body: "Mereka mempercayakan kebutuhan ban armadanya kepada SaveMile.",
  },
};

/* ---------- Company: Career ---------- */

export const career = {
  hero: {
    eyebrow: "Karier",
    titleLead: "Wujudkan karir impian bersama ",
    titleAccent: "SaveMile",
    description:
      "Ambil bagian dalam menciptakan solusi yang memberi dampak nyata bagi banyak bisnis di Indonesia.",
  },
  values: {
    eyebrow: "Nilai Kami",
    title: "Nilai yang membentuk cara kami bekerja",
    body: "Bukan sekadar tulisan — keyakinan yang memandu cara kami bekerja dan bertumbuh setiap hari.",
    items: [
      { icon: "target", title: "Ownership", desc: "Bertanggung jawab penuh atas setiap pekerjaan dan menyelesaikannya dengan standar terbaik." },
      { icon: "bulb", title: "Invert Thinking", desc: "Menemukan solusi dari sudut pandang yang belum pernah terpikirkan." },
      { icon: "bolt", title: "Speed", desc: "Kemajuan kecil yang konsisten lebih berharga dari kesempurnaan yang ditunda." },
      { icon: "badge", title: "Integrity", desc: "Apa yang diucapkan selalu sama dengan apa yang dilakukan." },
      { icon: "growth", title: "Growth Mindset", desc: "Pencapaian besar berasal dari orang yang tidak pernah berhenti belajar." },
      { icon: "users", title: "Collaboration", desc: "Hasil terbaik lahir ketika semua bergerak menuju tujuan yang sama." },
    ],
  },
  join: {
    eyebrow: "Gabung Tim",
    titleLead: "Bergabunglah dengan tim ",
    titleAccent: "SaveMile",
    description:
      "Kirimkan CV terbaik Anda — kami akan meninjau dan menghubungi kandidat yang sesuai.",
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
      "Pilih kontak yang sesuai dengan kebutuhan Anda, dan tim kami akan dengan senang hati membantu.",
  },
  help: {
    eyebrow: "Hubungi Kami",
    title: "Bagaimana kami dapat membantu Anda?",
    options: [
      {
        icon: "whatsapp",
        tag: "Layanan Pelanggan",
        title: "Pertanyaan produk & platform",
        desc: "Pertanyaan seputar produk ban, layanan, atau platform SaveMile? Tim kami siap membantu.",
        actionLabel: "Chat WhatsApp",
        href: site.whatsapp,
        external: true,
      },
      {
        icon: "users",
        tag: "Karier",
        title: "Gabung dengan tim kami",
        desc: "Kirim CV Anda dan mulai perjalanan bersama SaveMile.",
        actionLabel: `Kirim CV ke ${site.hrEmail}`,
        href: `mailto:${site.hrEmail}`,
        external: false,
      },
    ],
  },
  info: [
    { icon: "pin", label: "Alamat", value: site.address },
    { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: "phone", label: "Telepon", value: "+62 812-3456-7890", href: `tel:${site.phone}` },
  ],
};

/* ---------- Footer ---------- */

export const footerColumns = [
  {
    title: "Solution",
    links: [
      { label: "Ban", href: "/solusi/ban" },
      { label: "Tire Monitoring System", href: "/solusi/tire-monitoring-system" },
    ],
  },
  {
    title: "Insight",
    links: [{ label: "Success Story", href: "/insight/success-story" }],
  },
  {
    title: "Company",
    links: [
      { label: "About Brand", href: "/company/about" },
      { label: "Career", href: "/company/career" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
];
