import { ChevronDown } from "lucide-react";
import { Container, SectionHeading } from "../ui";

export const faq = [
  { q: "Quanto custa pedir um orçamento?", a: "Nada. O pedido de orçamento é 100% gratuito e sem compromisso. Você só fecha se gostar da proposta." },
  { q: "Quais cidades vocês atendem?", a: "Salto, Itu, Indaiatuba e Cabreúva, no interior de São Paulo." },
  { q: "Em quanto tempo recebo contato?", a: "Normalmente no mesmo dia útil, pelo WhatsApp que você informar." },
  { q: "Meus dados ficam seguros?", a: "Sim. Usamos seus dados só para responder ao seu pedido, conforme a LGPD. Você pode pedir a exclusão a qualquer momento." },
];

export function Faq() {
  return (
    <section id="duvidas" className="bg-navy-50 py-20 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" />
        <div className="mt-10 space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-2xl bg-white p-5 shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy-900">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-leaf transition group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
