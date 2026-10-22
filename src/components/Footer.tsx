import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { site, whatsappUrl } from "@/config/site";
import type { Dictionary, Locale } from "@/i18n";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";
import { Container } from "./ui";

const badges = ["Pix", "Visa", "Mastercard", "Stripe"];

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const home = `/${locale}`;
  return (
    <footer className="border-t border-white/5 bg-navy-950 pb-28 pt-16 lg:pb-12">
      <Container className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="text-xl" />
          <p className="mt-5 max-w-sm text-sm text-soft">{t.contact.location}</p>
          <div className="mt-5 flex flex-col gap-2 text-sm text-soft">
            <a href={whatsappUrl(t.wa.generic)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <WhatsAppIcon className="h-4 w-4" /> {site.whatsapp.display}
            </a>
            <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <InstagramIcon className="h-4 w-4" /> @{site.instagram}
            </a>
            <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> {site.email}</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {site.city}/{site.state}</span>
          </div>
        </div>
        <nav aria-label={t.footer.quickLinks}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blast-400">{t.footer.quickLinks}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-soft">
            <li><Link className="hover:text-white" href={`${home}#servicos`}>{t.nav.services}</Link></li>
            <li><Link className="hover:text-white" href={`${home}#portfolio`}>{t.nav.portfolio}</Link></li>
            <li><Link className="hover:text-white" href={`${home}/pedido`}>{t.order.title}</Link></li>
            <li><Link className="hover:text-white" href={`${home}/previa`}>{t.preview.title}</Link></li>
            <li><Link className="hover:text-white" href={`${home}/meu-projeto`}>{t.nav.clientArea}</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blast-400">{t.footer.payments}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {badges.map((b) => (
              <li key={b} className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-ice">{b}</li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="mt-14 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-soft/80 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Mind Blast · {t.footer.taxId}: {site.taxId} · {t.footer.rights}</p>
        <div className="flex gap-5">
          <Link className="hover:text-white" href={`${home}/privacidade`}>{t.footer.privacy}</Link>
          <Link className="hover:text-white" href={`${home}/termos`}>{t.footer.terms}</Link>
        </div>
      </Container>
    </footer>
  );
}
