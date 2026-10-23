import type { Metadata, Viewport } from "next";
import { cities, services, site } from "@/config/site";
import { jakarta } from "./fonts";
import "./globals.css";

const title = "Orçamentos grátis para sua casa em Salto, Itu e região | Casa Nova Interior";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | Casa Nova Interior" },
  description: site.description,
  keywords: [
    ...services.flatMap((s) => cities.map((c) => `${s.name.toLowerCase()} ${c}`)),
    "orçamento grátis",
    "casa nova",
    "reforma",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: "Receba orçamentos gratuitos para sua casa em poucos minutos",
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: "Casa Nova Interior", description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#0A1B3D" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <body className="min-h-dvh overflow-x-hidden">{children}</body>
    </html>
  );
}
