import { Faq, faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { QuoteSection } from "@/components/home/QuoteSection";
import { Services } from "@/components/home/Services";
import { Trust } from "@/components/home/Trust";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Hero />
      <Services />
      <HowItWorks />
      <QuoteSection />
      <Trust />
      <Faq />
    </>
  );
}
