import { ArrowRight, ArrowUpRight, Check, MapPin, MessageCircle, Search, Star } from "lucide-react";
import { formatBRL, plans, projects, services } from "@/config/site";
import { Arc } from "./icons";
import { ChatMock, DevicePair, Phone } from "./Mockups";
import { Container, Reveal, SectionHeading, buttonStyles, goToQuote } from "./ui";

const trust = ["Perfeito no celular", "Pronto para o Google", "Pedido direto no WhatsApp", "Entrega rápida"];

export function Hero() {
  const sample = projects[0];
  return (
    <section id="topo" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blast/15 blur-[120px]" />
      <Container className="relative grid items-center gap-14 pb-16 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-blast/30 bg-blast/10 px-3 py-1 text-xs font-medium text-soft">
            <span className="h-1.5 w-1.5 animate-spark rounded-full bg-blast" />
            Sites • Apps • Sistemas • Automação com IA · Salto/SP
          </p>
          <h1 className="mt-6 font-display text-[2.6rem] leading-[0.98] tracking-tight text-white sm:text-6xl xl:text-7xl">
            Seu negócio merece ser encontrado.
          </h1>
          <Arc className="mt-5 h-5 w-40" />
          <p className="mt-5 max-w-xl text-lg text-soft sm:text-xl">
            Sites, aplicativos, sistemas e automações com IA rápidos, bonitos e feitos para vender. Do pequeno ao alto padrão, sites a partir de R$ 250.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#servicos" className={`${buttonStyles.primary} !px-7 !py-3.5 text-base`}>
              Escolher meu serviço
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => goToQuote({ needs: ["landing"], note: "Quero uma prévia grátis do site do meu negócio." })}
              className={`${buttonStyles.secondary} !px-7 !py-3.5 text-base`}
            >
              Quero uma prévia grátis
            </button>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-3xl bg-[radial-gradient(120%_80%_at_20%_10%,#22306b_0%,#0E1638_45%,#070B1F_100%)] shadow-card sm:aspect-[5/6]">
            <div className="bg-grid absolute inset-0 opacity-60" />
            <div className="absolute inset-3 rounded-[1.25rem] border border-soft/10" />
            <ChatMock className="absolute left-6 right-6 top-6 h-[46%] rounded-2xl border border-white/10 shadow-card" />
          </div>
          <div className="absolute -bottom-6 right-0 w-[78%] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            <DevicePair site={sample} />
          </div>
        </div>
      </Container>

      <div className="relative border-y border-white/5 bg-navy-900/60">
        <Container>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 py-5 text-sm font-medium text-ice md:flex md:justify-between">
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blast/15 text-blast-400">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="servicos" className="py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="O que fazemos" title="Nossos serviços" subtitle="Escolha o formato certo para o momento do seu negócio. Você sabe o preço antes de começar." />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-navy-800/70 shadow-card transition duration-300 hover:-translate-y-1 hover:border-blast/40">
                {s.image ? (
                  <figure className="relative aspect-[16/10] overflow-hidden">
                    <img src={s.image} alt={s.imageAlt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                  </figure>
                ) : (
                  <ChatMock className="aspect-[16/10]" />
                )}
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-2xl text-white">{s.title}</h3>
                  <p className="mt-2 text-soft">{s.description}</p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-soft/70">O que está incluso</p>
                  <ul className="mt-3 space-y-2 text-sm text-ice">
                    {s.includes.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-blast-400" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <p className="text-sm text-soft">
                      {s.from ? (
                        <>
                          a partir de <span className="font-display text-3xl text-white">{formatBRL(s.from)}</span>
                        </>
                      ) : (
                        <span className="font-display text-3xl text-white">Sob consulta</span>
                      )}
                    </p>
                    <button type="button" onClick={() => goToQuote({ needs: [s.id] })} className={`${buttonStyles.primary} mt-5 w-full`}>
                      Pedir orçamento
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const explainerIcons = [Search, Star, MessageCircle];
const explainerSteps = ["O cliente encontra seu negócio no Google ou no Instagram", "Vê seus serviços, fotos e avaliações", "Chama você no WhatsApp com um clique"];

export function Explainer() {
  return (
    <section className="relative border-y border-white/5 bg-navy-900 py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <SectionHeading
            eyebrow="Sem complicação"
            title="O que é uma Landing Page?"
            subtitle="É uma página única, direta ao ponto, feita para transformar quem te encontra na internet em cliente. Nada de menus confusos: o visitante vê o que você faz, confia no seu trabalho e chama você no WhatsApp."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-3">
            {explainerSteps.map((step, i) => {
              const Icon = explainerIcons[i];
              return (
                <Reveal key={step} delay={i * 100}>
                  <li className="relative h-full rounded-2xl border border-white/[0.08] bg-navy-800 p-5">
                    <span className="absolute right-4 top-4 font-display text-4xl text-white/5">{i + 1}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-blast/15 text-blast-400">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <p className="mt-4 text-sm font-medium text-ice">{step}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
        <Reveal className="mx-auto w-56 sm:w-64">
          <Phone site={projects[3]} className="shadow-glow" />
        </Reveal>
      </Container>
    </section>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Portfólio"
            title="Projetos"
            subtitle="Exemplos do tipo de site que criamos para cada ramo. Os projetos de clientes reais entram aqui conforme forem autorizados."
          />
          <p className="shrink-0 self-start rounded-full border border-white/10 px-3 py-1.5 text-xs text-soft md:self-auto">Projetos ilustrativos: não são clientes reais.</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 80}>
              <button
                type="button"
                onClick={() => goToQuote({ needs: ["landing"], note: `Vi o projeto "${p.type}" no site e quero um site assim.` })}
                className="group block h-full w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-navy-800/60 text-left transition duration-300 hover:-translate-y-1 hover:border-blast/40"
              >
                <div className="relative overflow-hidden px-6 pb-10 pt-8" style={{ background: `radial-gradient(90% 70% at 50% 0%, ${p.accent}26, transparent 70%)` }}>
                  <span className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-navy-950/70 px-2.5 py-1 text-[11px] font-medium text-soft backdrop-blur">
                    Projeto exemplo
                  </span>
                  <DevicePair site={p} className="transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="flex items-end justify-between gap-4 border-t border-white/5 p-5">
                  <div>
                    <h3 className="font-semibold text-white">{p.type}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-soft">
                      <MapPin className="h-3.5 w-3.5" aria-hidden /> {p.city}
                    </p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-soft transition group-hover:border-blast group-hover:bg-blast group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" aria-label="Quero um site assim" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const howSteps = [
  { title: "Peça seu orçamento", text: "Conte o que você precisa no formulário. O pedido chega direto no nosso WhatsApp." },
  { title: "Envie as informações do seu negócio", text: "Logo, fotos, textos e o que precisa automatizar. Se não tiver, a gente ajuda." },
  { title: "Receba a prévia", text: "Você vê o site, o app ou a automação funcionando antes de ir para o ar." },
  { title: "Ajustes até você aprovar", text: "Trocamos cores, textos, fotos e fluxos até ficar do seu jeito." },
  { title: "No ar + cadastro no Google", text: "Publicamos tudo e deixamos seu negócio pronto para ser encontrado." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="border-y border-white/5 bg-navy-900 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Processo" title="Como funciona" subtitle="Do primeiro contato ao projeto no ar, você acompanha cada etapa." center />
        <ol className="relative mt-16 grid gap-8 lg:grid-cols-5 lg:gap-5">
          <div aria-hidden className="absolute bottom-2 left-5 top-2 w-px bg-gradient-to-b from-blast/60 via-blast/20 to-transparent lg:bottom-auto lg:left-0 lg:right-0 lg:top-5 lg:h-px lg:w-auto lg:bg-gradient-to-r" />
          {howSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <li className="relative pl-16 lg:pl-0 lg:pt-16">
                <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-blast/50 bg-navy-950 font-display text-sm text-blast-400 shadow-glow">{i + 1}</span>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-soft">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="precos" className="py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Preços" title="Preço claro, sem surpresa" subtitle="Pague 50% para começar e 50% na entrega, ou pague à vista com 5% de desconto." center />
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {plans.map((plan, i) => {
            const featured = plan.id === "profissional";
            return (
              <Reveal key={plan.id} delay={i * 90}>
                <article className={`relative flex h-full flex-col rounded-3xl border p-7 ${featured ? "border-blast/60 bg-gradient-to-b from-blast/[0.12] to-navy-800 shadow-glow" : "border-white/[0.08] bg-navy-800/60"}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blast-400">{plan.service}</p>
                  <h3 className="mt-2 font-display text-2xl text-white">{plan.name}</h3>
                  <p className="mt-5 text-sm text-soft">
                    {plan.price ? (
                      <>
                        a partir de <span className="font-display text-4xl text-white">{formatBRL(plan.price)}</span>
                      </>
                    ) : (
                      <span className="font-display text-4xl text-white">Sob consulta</span>
                    )}
                  </p>
                  <ul className="mt-6 space-y-2.5 text-sm text-ice">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-blast-400" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <button
                      type="button"
                      onClick={() => goToQuote({ needs: plan.needs, note: `Tenho interesse no plano ${plan.name}.` })}
                      className={`${featured ? buttonStyles.primary : buttonStyles.secondary} w-full`}
                    >
                      {plan.price ? "Quero este plano" : "Solicitar orçamento"}
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
