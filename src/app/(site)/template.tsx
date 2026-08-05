/**
 * template.tsx di-remount setiap navigasi (beda dari layout.tsx yang persist),
 * sehingga animasi `.route-fade` diputar ulang di tiap perpindahan halaman.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-fade flex flex-1 flex-col">{children}</div>;
}
