import { ArrowRight, Check } from "lucide-react";
import { images, photoBriefs } from "@/config/images";
import { projects } from "@/config/portfolio";
import type { Dictionary, Locale } from "@/i18n";
import { DevicePair } from "../DeviceMockup";
import { Arc } from "../icons";
import { PhotoSlot } from "../PhotoSlot";
import { Container, LinkButton } from "../ui";

export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const sample = projects[0];
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blast/15 blur-[120px]" />
      <Container className="relative grid items-center gap-14 pb-16 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-blast/30 bg-blast/10 px-3 py-1 text-xs font-medium text-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-blast animate-spark" />
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-[2.6rem] leading-[0.98] tracking-tight text-white sm:text-6xl xl:text-7xl">
            {t.hero.title}
          </h1>
          <Arc className="mt-5 h-5 w-40" />
          <p className="mt-5 max-w-xl text-lg text-soft sm:text-xl">{t.hero.subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={`/${locale}#servicos`} className="!px-7 !py-3.5 text-base">
              {t.hero.primary}
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href={`/${locale}/previa`} variant="secondary" className="!px-7 !py-3.5 text-base">
              {t.hero.secondary}
            </LinkButton>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <PhotoSlot
            src={images.hero.src}
            credit={images.hero.credit}
            alt={photoBriefs[locale].hero}
            label={t.common.photoSlot}
            priority
            className="aspect-[4/5] w-[78%] rounded-3xl shadow-card sm:aspect-[5/6]"
          />
          <div className="absolute -bottom-6 right-0 w-[78%] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            <DevicePair site={{ ...sample[locale], accent: sample.accent, city: sample.city }} />
          </div>
        </div>
      </Container>

      <div className="relative border-y border-white/5 bg-navy-900/60">
        <Container>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 py-5 text-sm font-medium text-ice md:flex md:justify-between">
            {t.trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blast/15 text-blast-400">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
