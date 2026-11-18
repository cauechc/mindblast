import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Check, Mail, MapPin, Send } from "lucide-react";
import { genericWhatsappText, needs, site, whatsappUrl, type NeedId } from "@/config/site";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { Container, buttonStyles, type QuotePreset } from "./ui";

type Form = { name: string; whatsapp: string; business: string; city: string; hasSite: "" | "Sim" | "Não"; deadline: string; details: string };
const empty: Form = { name: "", whatsapp: "", business: "", city: "", hasSite: "", deadline: "", details: "" };
const deadlines = ["O quanto antes", "Em até 30 dias", "Sem pressa"];

/** Monta a mensagem que chega no WhatsApp da Mind Blast. */
function buildMessage(f: Form, selected: NeedId[]) {
  const labels = needs.filter((n) => selected.includes(n.id)).map((n) => n.label);
  const lines = [
    "Olá, Mind Blast! Vim pelo site e quero um orçamento.",
    "",
    `*Nome:* ${f.name.trim()}`,
    `*Meu WhatsApp:* ${f.whatsapp.trim()}`,
    `*Empresa / ramo:* ${f.business.trim()}`,
    `*Cidade:* ${f.city.trim()}`,
    `*Preciso de:* ${labels.join(", ")}`,
  ];
  if (f.hasSite) lines.push(`*Já tenho site:* ${f.hasSite}`);
  if (f.deadline) lines.push(`*Prazo:* ${f.deadline}`);
  lines.push("", `*Detalhes:* ${f.details.trim()}`);
  return lines.join("\n");
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ice">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-[#ff8a8a]">{error}</span>}
    </label>
  );
}

const inputCls =
  "mt-1.5 w-full rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3 text-ice placeholder:text-soft/40 outline-none transition focus:border-blast focus:ring-2 focus:ring-blast/30";

export function QuoteForm() {
  const [form, setForm] = useState<Form>(empty);
  const [selected, setSelected] = useState<NeedId[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof Form | "needs", string>>>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  // Botões do site ("Pedir orçamento", planos, portfólio) já marcam o serviço aqui.
  useEffect(() => {
    const onPreset = (e: Event) => {
      const { needs: n, note } = (e as CustomEvent<QuotePreset>).detail ?? {};
      setSentUrl(null);
      if (n?.length) setSelected(n);
      if (note) setForm((f) => (f.details.includes(note) ? f : { ...f, details: f.details ? `${note}\n${f.details}` : note }));
      setErrors((er) => ({ ...er, needs: "", details: "" }));
    };
    window.addEventListener("mb:quote", onPreset);
    return () => window.removeEventListener("mb:quote", onPreset);
  }, []);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const toggle = (id: NeedId) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    setErrors((er) => ({ ...er, needs: "" }));
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    const er: typeof errors = {};
    if (!form.name.trim()) er.name = "Informe seu nome";
    if (form.whatsapp.replace(/\D/g, "").length < 10) er.whatsapp = "Informe um WhatsApp com DDD";
    if (!form.business.trim()) er.business = "Informe a empresa ou o ramo";
    if (!form.city.trim()) er.city = "Informe a cidade";
    if (selected.length === 0) er.needs = "Escolha pelo menos uma opção";
    if (!form.details.trim()) er.details = "Conte um pouco do que você precisa";
    setErrors(er);
    if (Object.keys(er).length) return;

    const url = whatsappUrl(buildMessage(form, selected));
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (sentUrl) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-white/[0.08] bg-navy-950/50 p-8 text-center sm:p-10" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-wa/15 text-wa">
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>
        <p className="mt-6 font-display text-2xl text-white">Pedido pronto!</p>
        <p className="mt-3 text-soft">Abrimos o WhatsApp com o seu pedido já escrito. É só tocar em enviar. Respondemos rápido.</p>
        <a href={sentUrl} target="_blank" rel="noopener noreferrer" className={`${buttonStyles.whatsapp} mt-6`}>
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          Abrir o WhatsApp de novo
        </a>
        <button type="button" onClick={() => { setSentUrl(null); setForm(empty); setSelected([]); }} className="mt-4 text-sm text-soft underline-offset-4 hover:text-white hover:underline">
          Fazer outro pedido
        </button>
      </div>
    );
  }

  return (
    <form id="orcamento" onSubmit={submit} noValidate className="space-y-4 rounded-3xl border border-white/[0.08] bg-navy-950/50 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Seu nome" error={errors.name}>
          <input className={inputCls} autoComplete="name" value={form.name} onChange={set("name")} />
        </Field>
        <Field label="Seu WhatsApp" error={errors.whatsapp}>
          <input className={inputCls} type="tel" inputMode="tel" autoComplete="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={set("whatsapp")} />
        </Field>
        <Field label="Empresa ou ramo" error={errors.business}>
          <input className={inputCls} placeholder="Ex.: pet shop, clínica, oficina" value={form.business} onChange={set("business")} />
        </Field>
        <Field label="Cidade" error={errors.city}>
          <input className={inputCls} placeholder="Ex.: Salto/SP" value={form.city} onChange={set("city")} />
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ice">O que você precisa?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {needs.map((n) => {
            const on = selected.includes(n.id);
            return (
              <button
                key={n.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(n.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition ${on ? "border-blast bg-blast/15 text-white" : "border-white/10 text-soft hover:border-blast/50 hover:text-white"}`}
              >
                {on && <Check className="h-3.5 w-3.5 text-blast-400" strokeWidth={3} />}
                {n.label}
              </button>
            );
          })}
        </div>
        {errors.needs && <span className="mt-1 block text-xs text-[#ff8a8a]">{errors.needs}</span>}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Já tem site? (opcional)">
          <select className={inputCls} value={form.hasSite} onChange={set("hasSite")}>
            <option value="">Selecione</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
        </Field>
        <Field label="Prazo (opcional)">
          <select className={inputCls} value={form.deadline} onChange={set("deadline")}>
            <option value="">Selecione</option>
            {deadlines.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Conte o que você precisa" error={errors.details}>
        <textarea
          className={`${inputCls} min-h-28 resize-y`}
          placeholder="Ex.: quero que meus clientes agendem horário pelo celular e recebam lembrete no WhatsApp."
          value={form.details}
          onChange={set("details")}
        />
      </Field>

      <button type="submit" className={`${buttonStyles.whatsapp} w-full !py-4 text-base`}>
        <Send className="h-[18px] w-[18px]" />
        Enviar pedido pelo WhatsApp
      </button>
      <p className="text-center text-xs text-soft/80">
        O pedido abre no WhatsApp da Mind Blast, {site.whatsapp.display}, já escrito. Você só confirma o envio.
      </p>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contato" className="py-24 sm:py-32">
      <Container>
        <div className="relative grid overflow-hidden rounded-[2rem] border border-white/[0.08] bg-navy-800 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blast/20 blur-[100px]" />
          <div className="relative p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blast-400">Orçamento</p>
            <h2 className="mt-3 font-display text-3xl leading-[1.05] text-white sm:text-5xl">Vamos tirar seu projeto do papel?</h2>
            <p className="mt-4 text-lg text-soft">Site, aplicativo, sistema ou automação com IA: preencha o pedido e ele chega direto no nosso WhatsApp. Respondemos rápido.</p>
            <p className="mt-8 text-sm text-soft">WhatsApp</p>
            <a href={`tel:+${site.whatsapp.number}`} className="mt-1 block font-display text-3xl text-white sm:text-4xl">
              {site.whatsapp.display}
            </a>
            <a href={whatsappUrl(genericWhatsappText)} target="_blank" rel="noopener noreferrer" className={`${buttonStyles.whatsapp} mt-5 !px-7 !py-4 text-base`}>
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Falar no WhatsApp
            </a>
            <ul className="mt-10 space-y-3 text-soft">
              <li>
                <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white">
                  <InstagramIcon className="h-5 w-5 text-blast-400" /> @{site.instagram}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-white">
                  <Mail className="h-5 w-5 text-blast-400" aria-hidden /> {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blast-400" aria-hidden /> {site.region}
              </li>
            </ul>
          </div>
          <div className="relative p-4 sm:p-8 lg:p-10 lg:pl-0">
            <QuoteForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
