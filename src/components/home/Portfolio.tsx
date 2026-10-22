import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { projects } from "@/config/portfolio";
import type { Dictionary, Locale } from "@/i18n";
import { DevicePair } from "../DeviceMockup";
import { Reveal } from "../Reveal";
import { Container, SectionHeading } from "../ui";

export function ProjectCard({ project, locale, t }: { project: (typeof projects)[number]; locale: Locale; t: Dictionary }) {
  const copy = project[locale];
  return (
    <Link
      href={`/${locale}/projetos/${project.slug}`}
      className="group block h-full overflow-hidden rounded-3xl border border-white/8 bg-navy-800/60 transition duration-300 hover:-translate-y-1 hover:border-blast/40"
    >
      <div className="relative overflow-hidden px-6 pb-10 pt-8" style={{ background: `radial-gradient(90% 70% at 50% 0%, ${project.accent}26, transparent 70%)` }}>
        {project.example && (
          <span className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-navy-950/70 px-2.5 py-1 text-[11px] font-medium text-soft backdrop-blur">
            {t.common.example}
          </span>
        )}
        <DevicePair
          site={{ ...copy, accent: project.accent, city: project.city, image: project.image }}
          className="transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-end justify-between gap-4 border-t border-white/5 p-5">
        <div>
          <h3 className="font-semibold text-white">{copy.type}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-soft">
            <MapPin className="h-3.5 w-3.5" aria-hidden /> {project.city}
          </p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-soft transition group-hover:border-blast group-hover:bg-blast group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" aria-label={t.portfolio.view} />
        </span>
      </div>
    </Link>
  );
}

export function Portfolio({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="portfolio" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={t.portfolio.eyebrow} title={t.portfolio.title} subtitle={t.portfolio.subtitle} />
          <p className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-xs text-soft">{t.portfolio.notice}</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 80}>
              <ProjectCard project={p} locale={locale} t={t} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
