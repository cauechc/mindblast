import { ClipboardList, MessageCircle, MousePointerClick } from "lucide-react";
import { Container, LinkButton, SectionHeading } from "../ui";

const steps = [
  { icon: MousePointerClick, title: "Escolha o serviço", text: "Energia solar, móveis planejados ou ar-condicionado." },
  { icon: ClipboardList, title: "Preencha seu pedido", text: "Conte rapidamente o que você precisa. Leva menos de 1 minuto." },
  { icon: MessageCircle, title: "Receba contato especializado", text: "Até 3 profissionais da sua região enviam orçamentos pelo WhatsApp." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-navy-50 py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Como funciona" title="Seu orçamento em 3 passos" />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-3xl bg-white p-7 shadow-card">
              <span className="absolute right-6 top-5 text-5xl font-extrabold text-navy-100" aria-hidden>
                {i + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-leaf-400">
                <s.icon className="h-6 w-6" aria-hidden />
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-wider text-leaf">Passo {i + 1}</p>
              <h3 className="mt-1 text-xl font-extrabold text-navy-900">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <LinkButton href="#orcamento">Solicitar Orçamento</LinkButton>
        </div>
      </Container>
    </section>
  );
}
