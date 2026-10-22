import { Mail, MapPin } from "lucide-react";
import { images, photoBriefs } from "@/config/images";
import { site, whatsappUrl } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { InstagramIcon } from "../icons";
import { PhotoSlot } from "../PhotoSlot";
import { Container, WhatsAppButton } from "../ui";

export function Contact({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="contato" className="py-24 sm:py-32">
      <Container>
        <div className="relative grid overflow-hidden rounded-[2rem] border border-white/8 bg-navy-800 lg:grid-cols-2">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blast/20 blur-[100px]" />
          <div className="relative p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blast-400">{t.contact.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl leading-[1.05] text-white sm:text-5xl">{t.contact.title}</h2>
            <p className="mt-4 text-lg text-soft">{t.contact.subtitle}</p>
            <p className="mt-8 text-sm text-soft">WhatsApp</p>
            <a href={`tel:+${site.whatsapp.number}`} className="mt-1 block font-display text-3xl text-white sm:text-4xl">
              {site.whatsapp.display}
            </a>
            <WhatsAppButton href={whatsappUrl(t.wa.generic)} className="mt-5 !px-7 !py-4 text-base">
              {t.common.whatsapp}
            </WhatsAppButton>
            <ul className="mt-10 space-y-3 text-soft">
              <li>
                <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white">
                  <InstagramIcon className="h-5 w-5 text-blast-400" /> @{site.instagram}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blast-400" aria-hidden /> {site.email}
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blast-400" aria-hidden /> {t.contact.location}
              </li>
            </ul>
          </div>
          <PhotoSlot
            src={images.contact.src}
            credit={images.contact.credit}
            alt={photoBriefs[locale].contact}
            label={t.common.photoSlot}
            className="min-h-72 lg:min-h-full"
          />
        </div>
      </Container>
    </section>
  );
}
