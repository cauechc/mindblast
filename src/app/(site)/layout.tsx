import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { cities, services, site } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#empresa`,
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: `+${site.whatsapp.number}`,
  email: site.email,
  image: `${site.url}/opengraph-image`,
  priceRange: "Orçamento grátis",
  parentOrganization: { "@type": "Organization", name: site.parent.name, url: site.parent.url },
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.state, addressCountry: "BR" },
  areaServed: cities.map((c) => ({ "@type": "City", name: `${c}, SP` })),
  contactPoint: { "@type": "ContactPoint", telephone: `+${site.whatsapp.number}`, contactType: "customer service", availableLanguage: "Portuguese" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços residenciais",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
      description: "Orçamento gratuito",
      itemOffered: { "@type": "Service", name: s.name, description: s.short },
    })),
  },
};

/** Cabeçalho, rodapé e botão de WhatsApp das páginas públicas. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
