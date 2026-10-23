import { Suspense } from "react";
import { CircleCheck } from "lucide-react";
import { site, type City, type ServiceId } from "@/config/site";
import { WhatsAppIcon } from "../icons";
import { Container } from "../ui";
import { LeadForm } from "./LeadForm";

const benefits = ["Você não paga nada para pedir", "Profissionais que atendem a sua cidade", "Contato rápido pelo WhatsApp"];

export function QuoteSection({
  title = "Conte o que sua casa precisa",
  defaultService,
  defaultCity,
}: {
  title?: string;
  defaultService?: ServiceId;
  defaultCity?: City;
}) {
  return (
    <section id="orcamento" className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
      <div className="bg-dots absolute inset-0" aria-hidden />
      <Container className="relative grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="lg:pt-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-400">Peça e compare</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-navy-100">Um pedido só, e você compara orçamentos de especialistas da sua região sem ligar para dez empresas.</p>
          <ul className="mt-8 space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 font-semibold">
                <CircleCheck className="h-6 w-6 shrink-0 text-leaf-400" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-10 flex items-center gap-2 text-navy-100">
            <WhatsAppIcon className="h-5 w-5 text-wa" />
            Prefere falar direto? WhatsApp <strong className="text-white">{site.whatsapp.display}</strong>
          </p>
        </div>
        <Suspense fallback={<div className="h-[640px] rounded-3xl bg-white/90" />}>
          <LeadForm defaultService={defaultService} defaultCity={defaultCity} />
        </Suspense>
      </Container>
    </section>
  );
}
