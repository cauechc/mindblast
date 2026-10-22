import type { Metadata } from "next";
import { archivo, grotesk } from "../fonts";
import "../globals.css";

export const metadata: Metadata = { title: "Painel · Mind Blast", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${grotesk.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
