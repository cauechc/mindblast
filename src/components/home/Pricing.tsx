import { Check } from "lucide-react";
import { plans } from "@/config/pricing";
import { currencyFor, type Dictionary, type Locale } from "@/i18n";
import { formatPrice } from "@/lib/pricing";
import { waPlan } from "@/lib/whatsapp";
import { Reveal } from "../Reveal";
import { Container, LinkButton, SectionHeading, WhatsAppButton } from "../ui";

export function Pricing({ locale, t }: { locale: Locale; t: Dictionary }) {
  const currency = currencyFor(locale);
  return (
    <section id="precos" className="py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.pricing.eyebrow} title={t.pricing.title} subtitle={t.pricing.subtitle} center />
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {plans.map((plan, i) => {
            const copy = t.pricing.plans[plan.id];
            const price = formatPrice(plan.price, currency);
            const featured = plan.id === "profissional";
            const service = plan.id === "essencial" ? "landing" : plan.id === "profissional" ? "institucional" : "institucional";
            return (
              <Reveal key={plan.id} delay={i * 90}>
                <article
                  className={`relative flex h-full flex-col rounded-3xl border p-7 ${featured ? "border-blast/60 bg-gradient-to-b from-blast/12 to-navy-800 shadow-glow" : "border-white/8 bg-navy-800/60"}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blast-400">{copy.service}</p>
                  <h3 className="mt-2 font-display text-2xl text-white">{copy.name}</h3>
                  <p className="mt-5 text-sm text-soft">
                    {price ? (
                      <>
                        {t.common.from} <span className="font-display text-4xl text-white">{price}</span>
                      </>
                    ) : (
                      <span className="font-display text-4xl text-white">{t.common.onRequest}</span>
                    )}
                  </p>
                  <ul className="mt-6 space-y-2.5 text-sm text-ice">
                    {copy.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-blast-400" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col gap-2.5 pt-8">
                    <LinkButton href={`/${locale}/pedido?servico=${service}&plano=${plan.id}`} variant={featured ? "primary" : "secondary"}>
                      {price ? t.pricing.build : t.common.requestQuote}
                    </LinkButton>
                    {!price && <WhatsAppButton href={waPlan(t, plan.id, currency)}>{t.common.negotiate}</WhatsAppButton>}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
