import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Services } from "@/components/home/Services";
import { QuoteSection } from "@/components/home/QuoteSection";
import { LinkGrid, PageHero, Prose, ServiceJsonLd } from "@/components/local/parts";
import { Container } from "@/components/ui";
import { cityContent } from "@/config/content";
import { cities, cityBySlug, citySlug, services } from "@/config/site";
import { cityPath } from "@/lib/paths";

export const dynamicParams = false;
export const generateStaticParams = () => cities.map((c) => ({ cidade: citySlug(c) }));

type Props = { params: Promise<{ cidade: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cityBySlug((await params).cidade);
  if (!city) return {};
  return {
    title: `Serviços para sua casa em ${city}/SP: orçamentos grátis`,
    description: `Energia solar, móveis planejados e ar-condicionado em ${city}/SP. Receba até 3 orçamentos gratuitos de profissionais da cidade.`,
    alternates: { canonical: cityPath(city) },
  };
}

export default async function CityPage({ params }: Props) {
  const city = cityBySlug((await params).cidade);
  if (!city) notFound();
  const cc = cityContent[city];

  return (
    <>
      <ServiceJsonLd name={`Serviços residenciais em ${city}`} description={cc.intro} cities={[city]} url={cityPath(city)} />
      <PageHero
        crumbs={[{ name: city, href: cityPath(city) }]}
        title={`Serviços para sua casa em ${city}/SP`}
        subtitle={`Comprou, construiu ou está reformando em ${city}? Peça orçamentos de energia solar, móveis planejados e ar-condicionado em um só lugar.`}
      />
      <Container className="max-w-4xl space-y-14 py-16 sm:py-20">
        <Prose title={`Casa nova em ${city}`}>
          <p>{cc.intro}</p>
          <p>{cc.neighborhoods}</p>
        </Prose>
      </Container>
      <Services city={city} />
      <Container className="max-w-4xl py-14">
        <LinkGrid
          title="Outras cidades atendidas"
          links={cities.filter((x) => x !== city).map((x) => ({ href: cityPath(x), label: x, hint: services.map((s) => s.name).join(", ") }))}
        />
      </Container>
      <QuoteSection title={`Peça seu orçamento em ${city}`} defaultCity={city} />
    </>
  );
}
