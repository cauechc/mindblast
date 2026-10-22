"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";
import { Logo } from "./Logo";
import { buttonStyles } from "./ui";

function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(pt|en)/, "");
  return (
    <div role="group" aria-label={label} className="flex items-center rounded-full border border-soft/20 p-0.5 text-xs font-semibold">
      {(["pt", "en"] as const).map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l === "pt" ? "pt-BR" : "en"}
          aria-current={l === locale ? "true" : undefined}
          onClick={() => {
            document.cookie = `locale=${l}; path=/; max-age=31536000; samesite=lax`;
          }}
          className={`rounded-full px-2.5 py-1 transition ${l === locale ? "bg-blast text-white" : "text-soft hover:text-white"}`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const home = `/${locale}`;
  const links = [
    { href: `${home}#servicos`, label: t.nav.services },
    { href: `${home}#portfolio`, label: t.nav.portfolio },
    { href: `${home}#como-funciona`, label: t.nav.how },
    { href: `${home}#precos`, label: t.nav.pricing },
    { href: `${home}#contato`, label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b border-white/5 bg-navy-950/90 backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href={home} aria-label="Mind Blast" className="text-lg" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-soft transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href={`/${locale}/meu-projeto`} className="text-sm text-soft transition hover:text-white">
            {t.nav.clientArea}
          </Link>
          <LanguageSwitch locale={locale} label={t.nav.language} />
          <Link href={`/${locale}/pedido`} className={`${buttonStyles.primary} !px-5 !py-2.5`}>
            {t.nav.cta}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitch locale={locale} label={t.nav.language} />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            className="rounded-full p-2 text-ice hover:bg-white/5"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Menu" className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/5 bg-navy-950 px-4 pb-24 pt-4 lg:hidden">
          <ul className="flex flex-col">
            {[...links, { href: `/${locale}/meu-projeto`, label: t.nav.clientArea }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block border-b border-white/5 py-4 font-display text-2xl text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/${locale}/pedido`} onClick={() => setOpen(false)} className={`${buttonStyles.primary} mt-8 w-full`}>
            {t.nav.cta}
          </Link>
        </nav>
      )}
    </header>
  );
}
