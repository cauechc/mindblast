import type { Metadata } from "next";
import { PreviewForm } from "@/components/PreviewForm";
import { Container } from "@/components/ui";
import { site } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);
  return { title: t.preview.title, description: t.preview.subtitle };
}

export default async function PreviewPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <div className="relative overflow-x-clip pb-24 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-blast/10 blur-[120px]" />
      <Container className="relative max-w-xl">
        <h1 className="font-display text-4xl text-white sm:text-5xl">{t.preview.title}</h1>
        <p className="mt-3 text-lg text-soft">{t.preview.subtitle}</p>
        <div className="mt-10">
          <PreviewForm locale={locale} t={t} hours={site.previewHours} />
        </div>
      </Container>
    </div>
  );
}
