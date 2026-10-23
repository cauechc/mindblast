import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuoteSection } from "@/components/home/QuoteSection";
import { LinkGrid, PageHero, Prose } from "@/components/local/parts";
import { Container } from "@/components/ui";
import { serviceContent } from "@/config/content";
import { cities, serviceById, services, site } from "@/config/site";
import { pricePath, serviceCityPath, servicePath } from "@/lib/paths";

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ servico: s.id }));

type Props = { params: Promise<{ servico: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = serviceById((await params).servico);
  if (!service) return {};
  const c = serviceContent[service.id];
  return {
    title: `${c.howMuch} em Salto e região (2026)`,
    description: `Faixas de preço de ${c.noun} em Salto, Itu, Indaiatuba e Cabreúva, o que muda o valor e como economizar. Compare orçamentos sem ligar para dez empresas.`,
    alternates: { canonical: pricePath(service.id) },
  };
}

export default async function PricePage({ params }: Props) {
  const service = serviceById((await params).servico);
  if (!service) notFound();
  const c = serviceContent[service.id];
  const title = `${c.howMuch} em Salto e região?`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    dateModified: "2026-10-23",
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.parent.name, url: site.parent.url },
    mainEntityOfPage: `${site.url}${pricePath(service.id)}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <PageHero
        crumbs={[
          { name: service.name, href: servicePath(service.id) },
          { name: "Quanto custa", href: pricePath(service.id) },
        ]}
        title={title}
        subtitle={`Faixas de preço de referência, o que faz o valor subir ou cair e como economizar. Atualizado em ${c.pricing.updated}.`}
      />
      <Container className="max-w-4xl space-y-14 py-16 sm:py-20">
        <Prose title="Faixas de preço">
          <p>{c.pricing.intro}</p>
        </Prose>
        <div className="-mt-8 overflow-hidden rounded-2xl border border-navy-100">
          <table className="w-full text-left">
            <thead className="bg-navy-900 text-sm text-white">
              <tr>
                <th className="px-4 py-3 font-bold">Item</th>
                <th className="px-4 py-3 font-bold">Faixa de preço</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {c.pricing.ranges.map((r) => (
                <tr key={r.item}>
                  <td className="px-4 py-3 text-navy-900">{r.item}</td>
                  <td className="px-4 py-3 font-bold text-navy-900">
                    {r.range}
                    {r.note && <span className="block text-xs font-normal text-muted">{r.note}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="-mt-10 text-sm text-muted">
          Valores aproximados de mercado, apenas para referência. O preço final depende da visita técnica e do orçamento de cada profissional.
        </p>
        <Prose title="O que muda o preço">
          <ul className="list-disc space-y-2 pl-6">
            {c.pricing.factors.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Prose>
        <Prose title="Como economizar">
          <ul className="list-disc space-y-2 pl-6">
            {c.pricing.saveTips.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p>O jeito mais simples de saber o preço certo para a sua casa é comparar propostas. Peça abaixo: você não paga nada para pedir.</p>
        </Prose>
        <LinkGrid
          title={`Orçamento de ${c.noun} na sua cidade`}
          links={cities.map((city) => ({ href: serviceCityPath(service.id, city), label: `${service.name} em ${city}` }))}
        />
      </Container>
      <QuoteSection title={`Receba orçamentos de ${c.noun} para sua casa`} defaultService={service.id} />
    </>
  );
}
