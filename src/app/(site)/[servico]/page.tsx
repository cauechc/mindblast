import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Faq } from "@/components/home/Faq";
import { QuoteSection } from "@/components/home/QuoteSection";
import { CheckList, FaqJsonLd, LinkGrid, PageHero, Prose, ServiceJsonLd } from "@/components/local/parts";
import { Container } from "@/components/ui";
import { serviceContent } from "@/config/content";
import { cities, serviceById, services } from "@/config/site";
import { pricePath, serviceCityPath, servicePath } from "@/lib/paths";

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ servico: s.id }));

type Props = { params: Promise<{ servico: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = serviceById((await params).servico);
  if (!service) return {};
  return {
    title: `${service.name} em Salto, Itu, Indaiatuba e Cabreúva: compare orçamentos`,
    description: `Compare orçamentos de ${serviceContent[service.id].noun} em Salto, Itu, Indaiatuba e Cabreúva/SP. ${service.short}`,
    alternates: { canonical: servicePath(service.id) },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = serviceById((await params).servico);
  if (!service) notFound();
  const c = serviceContent[service.id];

  return (
    <>
      <ServiceJsonLd name={service.name} description={c.intro} cities={cities} url={servicePath(service.id)} />
      <FaqJsonLd items={c.faq} />
      <PageHero
        crumbs={[{ name: service.name, href: servicePath(service.id) }]}
        title={`${service.name} em Salto, Itu, Indaiatuba e Cabreúva`}
        subtitle={`${service.short} Compare orçamentos de profissionais da sua cidade sem ligar para dez empresas.`}
      />
      <Container className="max-w-4xl space-y-14 py-16 sm:py-20">
        <Prose title={c.howTitle}>
          <p>{c.intro}</p>
          <p>{c.whyNow}</p>
        </Prose>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">O que o orçamento inclui</h2>
          <CheckList items={c.includes} />
        </section>
        <Prose title="Dicas antes de fechar">
          <ul className="list-disc space-y-2 pl-6">
            {c.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Prose>
        <LinkGrid
          title={`${service.name} na sua cidade`}
          links={cities.map((city) => ({ href: serviceCityPath(service.id, city), label: `${service.name} em ${city}`, hint: "Compare orçamentos" }))}
        />
        <LinkGrid title="Quanto custa?" links={[{ href: pricePath(service.id), label: c.howMuch, hint: "Faixas de preço e o que muda o valor" }]} />
      </Container>
      <QuoteSection title={`Peça seu orçamento de ${c.noun}`} defaultService={service.id} />
      <Faq items={c.faq} title={`Dúvidas sobre ${c.noun}`} />
    </>
  );
}
