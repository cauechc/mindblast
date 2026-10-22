import { Check } from "lucide-react";
import { images, photoBriefs } from "@/config/images";
import { services } from "@/config/pricing";
import { currencyFor, type Dictionary, type Locale } from "@/i18n";
import { formatPrice } from "@/lib/pricing";
import { waService } from "@/lib/whatsapp";
import { PhotoSlot } from "../PhotoSlot";
import { Reveal } from "../Reveal";
import { Container, LinkButton, SectionHeading, WhatsAppButton } from "../ui";

export function Services({ locale, t }: { locale: Locale; t: Dictionary }) {
  const currency = currencyFor(locale);
  return (
    <section id="servicos" className="py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => {
            const copy = t.services.items[s.id];
            const price = formatPrice(s.from, currency);
            return (
              <Reveal key={s.id} delay={i * 90}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-navy-800/70 shadow-card transition duration-300 hover:-translate-y-1 hover:border-blast/40">
                  <PhotoSlot
                    src={images[s.id].src}
                    credit={images[s.id].credit}
                    alt={photoBriefs[locale][s.id]}
                    label={t.common.photoSlot}
                    className="aspect-[16/10]"
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-2xl text-white">{copy.title}</h3>
                    <p className="mt-2 text-soft">{copy.description}</p>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-soft/70">{t.services.included}</p>
                    <ul className="mt-3 space-y-2 text-sm text-ice">
                      {copy.includes.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-blast-400" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-7">
                      <p className="text-sm text-soft">
                        {price ? (
                          <>
                            {t.common.from} <span className="font-display text-3xl text-white">{price}</span>
                          </>
                        ) : (
                          <span className="font-display text-3xl text-white">{t.common.onRequest}</span>
                        )}
                      </p>
                      <div className="mt-5 flex flex-col gap-2.5">
                        <LinkButton href={`/${locale}/pedido?servico=${s.id}`} className="flex-1">
                          {price ? t.common.choose : t.common.requestQuote}
                        </LinkButton>
                        <WhatsAppButton href={waService(t, s.id, currency)} className="flex-1">
                          {t.common.negotiate}
                        </WhatsAppButton>
                      </div>
                    </div>
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
