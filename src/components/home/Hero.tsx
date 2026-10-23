import { ArrowRight, CircleCheck, MapPin } from "lucide-react";
import { cities, services, site, whatsappUrl } from "@/config/site";
import { serviceIcons, WhatsAppIcon } from "../icons";
import { QuoteLink } from "../QuoteLink";
import { Container, LinkButton } from "../ui";

const perks = ["Um pedido só", "Sem compromisso", "Profissionais da região"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="bg-dots absolute inset-0" aria-hidden />
      <div className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-leaf/20 blur-3xl" aria-hidden />
      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-semibold text-navy-100">
            <MapPin className="h-4 w-4 text-leaf-400" aria-hidden />
            {cities.join(" · ")}
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Compare orçamentos para sua casa <span className="text-leaf-400">sem ligar para dez empresas</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100 sm:text-xl">
            Você não paga nada para pedir. Conte o que precisa e receba o retorno pelo WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LinkButton href="#orcamento" className="text-lg sm:!px-8 sm:!py-4">
              Solicitar Orçamento <ArrowRight className="h-5 w-5" aria-hidden />
            </LinkButton>
            <a
              href={whatsappUrl("Olá! Quero um orçamento para minha casa.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-2 py-3 font-semibold text-navy-100 hover:text-white"
            >
              <WhatsAppIcon className="h-5 w-5 text-wa" />
              <span>ou chame no WhatsApp <span className="whitespace-nowrap">{site.whatsapp.display}</span></span>
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-navy-100">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-leaf-400" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl sm:p-8">
          <p className="text-sm font-bold uppercase tracking-wider text-leaf">Comece aqui</p>
          <h2 className="mt-1 text-2xl font-extrabold text-navy-900">Qual serviço você precisa?</h2>
          <div className="mt-6 grid gap-3">
            {services.map((s) => {
              const Icon = serviceIcons[s.id];
              return (
                <QuoteLink
                  key={s.id}
                  service={s.id}
                  className="group flex items-center gap-4 rounded-2xl border-2 border-navy-100 p-4 transition hover:border-leaf hover:bg-leaf-50"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-leaf-400">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="flex-1 text-lg font-bold text-navy-900">{s.name}</span>
                  <ArrowRight className="h-5 w-5 text-muted transition group-hover:translate-x-1 group-hover:text-leaf" aria-hidden />
                </QuoteLink>
              );
            })}
          </div>
          <p className="mt-5 text-center text-sm text-muted">Leva menos de 1 minuto. Você recebe contato pelo WhatsApp.</p>
        </div>
      </Container>
    </section>
  );
}
