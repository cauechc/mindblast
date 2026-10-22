import { MessageCircle, Search, Star } from "lucide-react";
import { projects } from "@/config/portfolio";
import type { Dictionary, Locale } from "@/i18n";
import { Phone } from "../DeviceMockup";
import { Reveal } from "../Reveal";
import { Container, SectionHeading } from "../ui";

const icons = [Search, Star, MessageCircle];

export function Explainer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const sample = projects[3];
  return (
    <section className="relative border-y border-white/5 bg-navy-900 py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <SectionHeading eyebrow={t.explainer.eyebrow} title={t.explainer.title} subtitle={t.explainer.body} />
          <ol className="mt-12 grid gap-4 sm:grid-cols-3">
            {t.explainer.steps.map((step, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={step} delay={i * 100}>
                  <li className="relative h-full rounded-2xl border border-white/8 bg-navy-800 p-5">
                    <span className="absolute right-4 top-4 font-display text-4xl text-white/5">{i + 1}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-blast/15 text-blast-400">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <p className="mt-4 text-sm font-medium text-ice">{step}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
        <Reveal className="mx-auto w-56 sm:w-64">
          <Phone site={{ ...sample[locale], accent: sample.accent, city: sample.city, image: sample.image }} className="shadow-glow" />
        </Reveal>
      </Container>
    </section>
  );
}
