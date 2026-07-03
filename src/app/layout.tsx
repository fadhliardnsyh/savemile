import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://savemile.vercel.app"),
  title: {
    default: "SaveMile — Pilih ban yang tepat, kelola lebih cerdas",
    template: "%s · SaveMile",
  },
  description:
    "Solusi ban berkualitas untuk kendaraan Anda, dilengkapi teknologi pengelolaan ban berbasis data dalam satu platform. Konsultan & distributor ban untuk armada dan logistik Indonesia.",
  keywords: [
    "distributor ban",
    "ban truk",
    "ban bus",
    "tire consultant",
    "tire management system",
    "cost per kilometer ban",
    "SaveMile",
  ],
  openGraph: {
    title: "SaveMile — Pilih ban yang tepat, kelola lebih cerdas",
    description:
      "Solusi ban berkualitas + teknologi pengelolaan ban berbasis data dalam satu platform.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col overflow-x-hidden">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
