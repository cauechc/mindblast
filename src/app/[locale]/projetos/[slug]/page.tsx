import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin, X } from "lucide-react";
import { DevicePair } from "@/components/DeviceMockup";
import { PhotoSlot } from "@/components/PhotoSlot";
import { ProjectCard } from "@/components/home/Portfolio";
import { Container, LinkButton, WhatsAppButton } from "@/components/ui";
import { projects } from "@/config/portfolio";
import { getDictionary, locales, type Locale } from "@/i18n";
import { waProject } from "@/lib/whatsapp";

export const generateStaticParams = () => locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p[locale].type } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const t = getDictionary(locale);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const copy = project[locale];
  const others = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="pb-24 pt-28 sm:pt-36">
      <Container>
        <Link href={`/${locale}#portfolio`} className="inline-flex items-center gap-2 text-sm text-soft hover:text-white">
          <ArrowLeft className="h-4 w-4" /> {t.common.back}
        </Link>
        <div className="mt-8 grid items-center gap-14 lg:grid-cols-2">
          <div>
            {project.example && (
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-soft">{t.common.example}</span>
            )}
            <h1 className="mt-4 font-display text-4xl leading-[1.05] text-white sm:text-5xl">{copy.type}</h1>
            <p className="mt-3 flex items-center gap-1.5 text-soft">
              <MapPin className="h-4 w-4" /> {project.city}
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-navy-800/60 p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-soft/80">
                  <X className="h-4 w-4 text-red-300" /> {t.portfolio.before}
                </p>
                <p className="mt-3 text-sm text-soft">{t.portfolio.beforeText}</p>
              </div>
              <div className="rounded-2xl border border-blast/40 bg-blast/10 p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blast-400">
                  <Check className="h-4 w-4" /> {t.portfolio.after}
                </p>
                <p className="mt-3 text-sm text-ice">{t.portfolio.afterText}</p>
              </div>
            </div>
            <h2 className="mt-10 font-semibold text-white">{t.portfolio.features}</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {copy.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-ice">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blast-400" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={`/${locale}/pedido`}>{t.portfolio.want}</LinkButton>
              <WhatsAppButton href={waProject(t, copy.type)}>{t.common.negotiate}</WhatsAppButton>
            </div>
          </div>
          <div className="rounded-[2rem] p-8 sm:p-12" style={{ background: `radial-gradient(80% 70% at 50% 20%, ${project.accent}33, transparent 70%)` }}>
            <DevicePair site={{ ...copy, accent: project.accent, city: project.city, image: project.image }} />
          </div>
        </div>

        {project.image && (
          <PhotoSlot src={project.image} alt={copy.type} label={t.common.photoSlot} className="mt-16 aspect-[16/9] rounded-3xl" />
        )}

        <h2 className="mt-24 font-display text-2xl text-white">{t.portfolio.others}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} t={t} />
          ))}
        </div>
      </Container>
    </div>
  );
}
