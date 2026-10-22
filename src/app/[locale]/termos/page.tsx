import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { terms } from "@/config/legal";
import type { Locale } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: terms[locale].title };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <LegalPage doc={terms[locale]} locale={locale} />;
}
