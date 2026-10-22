import { Contact } from "@/components/home/Contact";
import { Explainer } from "@/components/home/Explainer";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Portfolio } from "@/components/home/Portfolio";
import { Pricing } from "@/components/home/Pricing";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { getDictionary, type Locale } from "@/i18n";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <>
      <Hero locale={locale} t={t} />
      <Services locale={locale} t={t} />
      <Explainer locale={locale} t={t} />
      <Portfolio locale={locale} t={t} />
      <HowItWorks t={t} />
      <Pricing locale={locale} t={t} />
      <Testimonials t={t} />
      <Contact locale={locale} t={t} />
    </>
  );
}
