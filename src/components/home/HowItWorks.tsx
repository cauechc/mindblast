import type { Dictionary } from "@/i18n";
import { Reveal } from "../Reveal";
import { Container, SectionHeading } from "../ui";

export function HowItWorks({ t }: { t: Dictionary }) {
  return (
    <section id="como-funciona" className="border-y border-white/5 bg-navy-900 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} subtitle={t.how.subtitle} center />
        <ol className="relative mt-16 grid gap-8 lg:grid-cols-5 lg:gap-5">
          <div aria-hidden className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-blast/60 via-blast/20 to-transparent lg:left-0 lg:right-0 lg:top-5 lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r" />
          {t.how.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <li className="relative pl-16 lg:pl-0 lg:pt-16">
                <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-blast/50 bg-navy-950 font-display text-sm text-blast-400 shadow-glow">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-soft">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
