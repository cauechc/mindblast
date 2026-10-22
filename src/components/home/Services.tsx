import { Check } from "lucide-react";
import { services } from "@/config/site";
import { serviceIcons } from "../icons";
import { Container, LinkButton, SectionHeading } from "../ui";

export function Services() {
  return (
    <section id="servicos" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Serviços"
          title="Tudo o que sua casa nova precisa"
          subtitle="Comprou, construiu ou está reformando? Peça orçamento dos serviços mais procurados da região."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s) => {
            const Icon = serviceIcons[s.id];
            return (
              <article key={s.id} className="flex flex-col rounded-3xl border border-navy-100 bg-white p-7 shadow-card">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-leaf-50 text-leaf">
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-navy-900">{s.name}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.short}</p>
                <ul className="mt-5 space-y-2 text-sm font-semibold text-navy-900">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-leaf" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <LinkButton href={`/?servico=${s.id}#orcamento`} scroll={false} variant="outline" className="mt-7 w-full">
                  Pedir orçamento
                </LinkButton>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
