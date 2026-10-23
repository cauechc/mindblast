import Link from "next/link";
import { ArrowRight, Check, ChevronRight, CircleCheck } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { Container, LinkButton } from "../ui";

export type Crumb = { name: string; href: string };

/** Lista de navegação + JSON-LD BreadcrumbList. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Início", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${site.url}${c.href}` })),
  };
  return (
    <nav aria-label="Você está em" className="text-sm text-navy-100/80">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-1">
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
            {i < all.length - 1 ? (
              <Link href={c.href} className="hover:text-white">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-white">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ crumbs, title, subtitle, children }: { crumbs: Crumb[]; title: string; subtitle: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="bg-dots absolute inset-0" aria-hidden />
      <Container className="relative py-12 sm:py-16">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">{subtitle}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <LinkButton href="#orcamento" className="text-lg">
            Comparar orçamentos <ArrowRight className="h-5 w-5" aria-hidden />
          </LinkButton>
          <p className="flex items-center gap-2 text-sm font-semibold text-navy-100">
            <CircleCheck className="h-5 w-5 text-leaf-400" aria-hidden /> Sem ligar para dez empresas. Você não paga nada para pedir.
          </p>
        </div>
        {children}
      </Container>
    </section>
  );
}

export function Prose({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3 rounded-2xl bg-navy-50 p-4 text-base font-semibold text-navy-900">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf" aria-hidden />
          {i}
        </li>
      ))}
    </ul>
  );
}

/** Bloco de links internos (outras cidades, outros serviços). */
export function LinkGrid({ title, links }: { title: string; links: { href: string; label: string; hint?: string }[] }) {
  return (
    <section>
      <h2 className="text-xl font-extrabold text-navy-900">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-navy-100 p-4 transition hover:border-leaf hover:bg-leaf-50">
              <span>
                <span className="block font-bold text-navy-900">{l.label}</span>
                {l.hint && <span className="block text-sm text-muted">{l.hint}</span>}
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-leaf" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** JSON-LD de um serviço oferecido em uma ou mais cidades. */
export function ServiceJsonLd({ name, description, cities, url }: { name: string; description: string; cities: readonly string[]; url: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${url}`,
    serviceType: name,
    provider: { "@id": `${site.url}/#empresa` },
    areaServed: cities.map((c) => ({ "@type": "City", name: `${c}, SP` })),
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL", description: "Você não paga nada para pedir" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
