import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Faq } from "@/components/home/Faq";
import { QuoteSection } from "@/components/home/QuoteSection";
import { CheckList, FaqJsonLd, LinkGrid, PageHero, Prose, ServiceJsonLd } from "@/components/local/parts";
import { Container } from "@/components/ui";
import { cityContent, serviceContent } from "@/config/content";
import { cities, cityBySlug, citySlug, serviceById, services } from "@/config/site";
import { cityPath, pricePath, serviceCityPath, servicePath } from "@/lib/paths";

export const dynamicParams = false;
export const generateStaticParams = () => services.flatMap((s) => cities.map((c) => ({ servico: s.id, cidade: citySlug(c) })));

type Props = { params: Promise<{ servico: string; cidade: string }> };

async function load(params: Props["params"]) {
  const p = await params;
  const service = serviceById(p.servico);
  const city = cityBySlug(p.cidade);
  return service && city ? { service, city } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load(params);
  if (!data) return {};
  const { service, city } = data;
  const noun = serviceContent[service.id].noun;
  return {
    title: `${service.name} em ${city}/SP: compare orçamentos`,
    description: `Precisa de ${noun} em ${city}? Compare orçamentos de profissionais que atendem ${city}/SP sem ligar para dez empresas. Você não paga nada para pedir.`,
    alternates: { canonical: serviceCityPath(service.id, city) },
  };
}

export default async function ServiceCityPage({ params }: Props) {
  const data = await load(params);
  if (!data) notFound();
  const { service, city } = data;
  const c = serviceContent[service.id];
  const cc = cityContent[city];
  const faq = [
    { q: `Vocês atendem todos os bairros de ${city}?`, a: cc.neighborhoods },
    { q: `Quanto custa pedir orçamento de ${c.noun} em ${city}?`, a: "Nada. Você não paga nada para pedir e não tem compromisso: compara as propostas e decide se quer fechar." },
    ...c.faq,
  ];

  return (
    <>
      <ServiceJsonLd name={`${service.name} em ${city}`} description={c.intro} cities={[city]} url={serviceCityPath(service.id, city)} />
      <FaqJsonLd items={faq} />
      <PageHero
        crumbs={[
          { name: service.name, href: servicePath(service.id) },
          { name: city, href: serviceCityPath(service.id, city) },
        ]}
        title={`${service.name} em ${city}/SP`}
        subtitle={`Compare orçamentos de ${c.noun} com profissionais que atendem ${city}, sem ligar para dez empresas. ${service.short}`}
      />
      <Container className="max-w-4xl space-y-14 py-16 sm:py-20">
        <Prose title={`${service.name} para sua casa em ${city}`}>
          <p>{cc.intro}</p>
          <p>{c.intro}</p>
          <p>{c.whyNow}</p>
        </Prose>
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">O que o orçamento inclui</h2>
          <CheckList items={c.includes} />
        </section>
        <Prose title={`Como escolher a empresa de ${c.noun} em ${city}`}>
          <ul className="list-disc space-y-2 pl-6">
            {c.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p>
            Com a Casa Nova Interior você descreve o que precisa uma vez e recebe propostas de profissionais que atendem {city}, sem precisar
            procurar empresa por empresa.
          </p>
        </Prose>
        <LinkGrid
          title={`Outros serviços em ${city}`}
          links={[
            ...services.filter((s) => s.id !== service.id).map((s) => ({ href: serviceCityPath(s.id, city), label: `${s.name} em ${city}` })),
            { href: cityPath(city), label: `Todos os serviços em ${city}` },
          ]}
        />
        <LinkGrid
          title={`${service.name} em outras cidades`}
          links={[
            ...cities.filter((x) => x !== city).map((x) => ({ href: serviceCityPath(service.id, x), label: `${service.name} em ${x}` })),
            { href: pricePath(service.id), label: c.howMuch, hint: "Faixas de preço" },
          ]}
        />
      </Container>
      <QuoteSection title={`Orçamento de ${c.noun} em ${city}`} defaultService={service.id} defaultCity={city} />
      <Faq items={faq} title={`Dúvidas sobre ${c.noun} em ${city}`} />
    </>
  );
}
