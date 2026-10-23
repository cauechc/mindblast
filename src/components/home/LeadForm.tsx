"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleCheck, Lock } from "lucide-react";
import { cities, propertyTypes, services, type City, type ServiceId } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { serviceIcons, WhatsAppIcon } from "../icons";
import { buttonStyles } from "../ui";

type Errors = Partial<Record<string, string>>;

/** (11) 99999-9999 enquanto digita. */
function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const isService = (v: string | null): v is ServiceId => services.some((s) => s.id === v);

const input =
  "mt-1.5 w-full rounded-xl border-2 border-navy-100 bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/60 focus:border-leaf";

/** Em páginas locais, o serviço e a cidade já vêm preenchidos. */
export function LeadForm({ defaultService, defaultCity }: { defaultService?: ServiceId; defaultCity?: City }) {
  const params = useSearchParams();
  const [service, setService] = useState<ServiceId | "">(defaultService ?? "");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [done, setDone] = useState<{ id: string; whatsappUrl: string } | null>(null);

  const fromUrl = params.get("servico");
  useEffect(() => {
    if (isService(fromUrl)) setService(fromUrl);
  }, [fromUrl]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const source = Object.fromEntries([...params.entries()].filter(([k]) => k.startsWith("utm_") || k === "gclid" || k === "fbclid"));
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          whatsapp: f.get("whatsapp"),
          city: f.get("city"),
          propertyType: f.get("propertyType"),
          service: f.get("service"),
          description: f.get("description"),
          consent: f.get("consent") === "on",
          website: f.get("website") || undefined,
          source: Object.keys(source).length ? source : undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        trackEvent("generate_lead", { service: f.get("service"), city: f.get("city") });
        setDone(data);
        setStatus("idle");
        return;
      }
      if (data.fields) setErrors(data.fields);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-2xl" role="status">
        <CircleCheck className="mx-auto h-14 w-14 text-leaf" aria-hidden />
        <h3 className="mt-4 text-2xl font-extrabold text-navy-900">Pedido recebido!</h3>
        <p className="mt-2 text-muted">
          Número do pedido <strong className="font-mono text-navy-900">{done.id}</strong>. Vamos buscar orçamentos para você comparar, e os especialistas entram em contato pelo seu WhatsApp.
        </p>
        <a href={done.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${buttonStyles.primary} mt-6 w-full !bg-wa hover:!bg-[#1ebe5a]`}>
          <WhatsAppIcon className="h-5 w-5" />
          Agilizar pelo WhatsApp
        </a>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <p className="mt-1.5 text-sm font-semibold text-red-600">{errors[k]}</p>;

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
      <p className="mb-5 rounded-xl bg-leaf-50 px-4 py-2.5 text-center text-sm font-bold text-leaf-600">Compare orçamentos sem ligar para dez empresas</p>
      <fieldset>
        <legend className="text-sm font-bold text-navy-900">Serviço desejado</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {services.map((s) => {
            const Icon = serviceIcons[s.id];
            const active = service === s.id;
            return (
              <label
                key={s.id}
                className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center text-xs font-bold transition sm:text-sm ${
                  active ? "border-leaf bg-leaf-50 text-navy-900" : "border-navy-100 text-muted hover:border-navy-700/30"
                }`}
              >
                <input type="radio" name="service" value={s.id} checked={active} onChange={() => setService(s.id)} className="sr-only" required />
                <Icon className={`h-6 w-6 ${active ? "text-leaf" : ""}`} aria-hidden />
                {s.name}
              </label>
            );
          })}
        </div>
        {err("service")}
      </fieldset>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-bold text-navy-900 sm:col-span-2">
          Nome completo
          <input name="name" required autoComplete="name" placeholder="Seu nome e sobrenome" className={input} />
          {err("name")}
        </label>
        <label className="block text-sm font-bold text-navy-900">
          WhatsApp
          <input
            name="whatsapp"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(11) 99999-9999"
            value={phone}
            onChange={(e) => setPhone(maskPhone(e.target.value))}
            className={input}
          />
          {err("whatsapp")}
        </label>
        <label className="block text-sm font-bold text-navy-900">
          Cidade
          <select name="city" required defaultValue={defaultCity ?? ""} className={input}>
            <option value="" disabled>
              Selecione
            </option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {err("city")}
        </label>
        <label className="block text-sm font-bold text-navy-900 sm:col-span-2">
          Tipo de imóvel
          <select name="propertyType" required defaultValue="" className={input}>
            <option value="" disabled>
              Selecione
            </option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {err("propertyType")}
        </label>
        <label className="block text-sm font-bold text-navy-900 sm:col-span-2">
          Descrição da necessidade
          <textarea
            name="description"
            rows={3}
            maxLength={2000}
            placeholder="Ex.: casa nova com 3 quartos, quero ar-condicionado em 2 cômodos."
            className={`${input} resize-y`}
          />
        </label>
      </div>

      {/* Armadilha para robôs: invisível para pessoas. */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-leaf" />
        <span>
          Concordo com a{" "}
          <Link href="/privacidade" target="_blank" className="font-semibold text-navy-900 underline underline-offset-2">
            Política de Privacidade
          </Link>{" "}
          e autorizo o contato pelo WhatsApp sobre este orçamento.
        </span>
      </label>
      {err("consent")}

      <button type="submit" disabled={status === "sending"} className={`${buttonStyles.primary} mt-6 w-full !py-4 text-lg`}>
        {status === "sending" ? "Enviando…" : "Solicitar Orçamento"}
      </button>
      {status === "error" && Object.keys(errors).length === 0 && (
        <p className="mt-3 text-center text-sm font-semibold text-red-600">Não foi possível enviar agora. Tente de novo ou chame no WhatsApp.</p>
      )}
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
        <Lock className="h-3.5 w-3.5" aria-hidden /> Seus dados estão protegidos pela LGPD.
      </p>
    </form>
  );
}
