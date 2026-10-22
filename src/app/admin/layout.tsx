import type { Metadata } from "next";

export const metadata: Metadata = { title: "Painel de leads", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-navy-50">{children}</div>;
}
