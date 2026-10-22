import type { Metadata, Viewport } from "next";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/Toaster";
import { site } from "@/config/site";
import { getDictionary, isLocale, locales } from "@/i18n";
import "../globals.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo-black", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const viewport: Viewport = { themeColor: "#070B1F" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: "%s · Mind Blast" },
    description: t.meta.description,
    alternates: { canonical: `/${locale}`, languages: { "pt-BR": "/pt", en: "/en" } },
    openGraph: {
      type: "website",
      siteName: "Mind Blast",
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Mind Blast",
  description: "Criação de sites, landing pages e aplicativos.",
  url: site.url,
  telephone: `+${site.whatsapp.number}`,
  sameAs: [`https://instagram.com/${site.instagram}`],
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.state, addressCountry: "BR" },
  areaServed: ["BR", "Worldwide"],
  priceRange: "R$ 250+",
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html lang={locale === "pt" ? "pt-BR" : "en"} className={`${archivo.variable} ${grotesk.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header locale={locale} t={t} />
        <main>{children}</main>
        <Footer locale={locale} t={t} />
        <FloatingWhatsApp t={t} />
        <CookieBanner locale={locale} t={t} />
        <Toaster />
      </body>
    </html>
  );
}
