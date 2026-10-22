import { Quote } from "lucide-react";
import { testimonialSlots, testimonials } from "@/config/testimonials";
import type { Dictionary } from "@/i18n";
import { Container, SectionHeading } from "../ui";

export function Testimonials({ t }: { t: Dictionary }) {
  return (
    <section id="depoimentos" className="border-t border-white/5 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.length > 0
            ? testimonials.map((item) => (
                <figure key={item.name} className="rounded-3xl border border-white/8 bg-navy-800/60 p-7">
                  <Quote className="h-6 w-6 text-blast-400" aria-hidden />
                  <blockquote className="mt-4 text-ice">{item.text}</blockquote>
                  <figcaption className="mt-6 text-sm text-soft">
                    <span className="font-semibold text-white">{item.name}</span> · {item.business}, {item.city}
                  </figcaption>
                </figure>
              ))
            : Array.from({ length: testimonialSlots }, (_, i) => (
                <div key={i} className="flex min-h-48 flex-col justify-between rounded-3xl border border-dashed border-soft/20 p-7">
                  <Quote className="h-6 w-6 text-soft/30" aria-hidden />
                  <p className="text-sm text-soft/70">{t.testimonials.slot}</p>
                </div>
              ))}
        </div>
      </Container>
    </section>
  );
}
