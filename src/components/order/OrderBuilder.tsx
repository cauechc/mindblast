"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { Check, Loader2, ShieldCheck } from "lucide-react";
import { addons, services, type AddonId, type PlanId, type ServiceId } from "@/config/pricing";
import { currencyFor, fill, type Dictionary, type Locale } from "@/i18n";
import { formatMoney, formatPrice, normalizeSelection, plansFor, quoteOrder, type OrderSelection, type PaymentOption } from "@/lib/pricing";
import { waOrder } from "@/lib/whatsapp";
import { toast } from "../Toaster";
import { buttonStyles, WhatsAppButton } from "../ui";
import { Input, StepCard, Textarea, YesNo } from "./fields";

type Customer = {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  industry: string;
  city: string;
  instagram: string;
  hasLogo: boolean;
  hasDomain: boolean;
  notes: string;
  needs: string;
};

const emptyCustomer: Customer = {
  name: "",
  company: "",
  whatsapp: "",
  email: "",
  industry: "",
  city: "",
  instagram: "",
  hasLogo: false,
  hasDomain: false,
  notes: "",
  needs: "",
};

function Choice({ checked, onChange, name, children }: { checked: boolean; onChange: () => void; name: string; children: React.ReactNode }) {
  return (
    <label
      className={`relative flex h-full cursor-pointer flex-col rounded-2xl border p-5 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blast ${checked ? "border-blast bg-blast/10 shadow-glow" : "border-white/10 hover:border-white/25"}`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span className={`absolute right-4 top-4 grid h-5 w-5 place-items-center rounded-full border ${checked ? "border-blast bg-blast text-white" : "border-white/25"}`}>
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      {children}
    </label>
  );
}

export function OrderBuilder({
  locale,
  t,
  initialService,
  initialPlan,
}: {
  locale: Locale;
  t: Dictionary;
  initialService: ServiceId;
  initialPlan: PlanId | null;
}) {
  const router = useRouter();
  const currency = currencyFor(locale);
  const [selection, setSelection] = useState<OrderSelection>(() =>
    normalizeSelection({ service: initialService, plan: initialPlan, addons: [], paymentOption: "deposit", currency }),
  );
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sentQuote, setSentQuote] = useState<string | null>(null);

  const quote = useMemo(() => quoteOrder(selection), [selection]);
  const availablePlans = plansFor(selection.service);
  const update = (patch: Partial<OrderSelection>) => setSelection((s) => normalizeSelection({ ...s, ...patch }));
  const setField = <K extends keyof Customer>(k: K, v: Customer[K]) => {
    setCustomer((c) => ({ ...c, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const toggleAddon = (id: AddonId) =>
    update({ addons: selection.addons.includes(id) ? selection.addons.filter((a) => a !== id) : [...selection.addons, id] });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, selection, customer }),
      });
      const data = await res.json();
      if (!res.ok) {
        const map: Partial<Record<keyof Customer, string>> = {};
        for (const k of Object.keys(data.fields ?? {}) as (keyof Customer)[]) {
          map[k] = k === "email" ? t.order.form.invalidEmail : k === "whatsapp" ? t.order.form.invalidPhone : t.order.form.required;
        }
        setErrors(map);
        toast(t.order.sent.error, "error");
        return;
      }
      if (data.requiresQuote) {
        setSentQuote(data.id);
        toast(t.order.sent.quoteTitle);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast(fill(t.order.sent.orderText, { id: data.id }));
        router.push(`/${locale}/checkout/${data.id}`);
      }
    } catch {
      toast(t.order.sent.error, "error");
    } finally {
      setSubmitting(false);
    }
  }

  if (sentQuote) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-white/8 bg-navy-800/60 p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-wa/15 text-wa">
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>
        <h2 className="mt-6 font-display text-3xl text-white">{t.order.sent.quoteTitle}</h2>
        <p className="mt-3 text-soft">{t.order.sent.quoteText}</p>
        <p className="mt-4 font-mono text-sm text-blast-400">{sentQuote}</p>
        <WhatsAppButton href={waOrder(t, selection)} className="mt-8">
          {t.common.negotiate}
        </WhatsAppButton>
      </div>
    );
  }

  const label = (kind: string, id: string) =>
    kind === "plan"
      ? `${t.pricing.plans[id as PlanId].name}`
      : kind === "service"
        ? t.services.items[id as ServiceId].title
        : t.order.addons[id as AddonId];

  const summary = (
    <div className="rounded-3xl border border-white/8 bg-navy-800 p-6 shadow-card">
      <h2 className="font-display text-xl text-white">{t.order.summary.title}</h2>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-soft">{t.order.summary.service}</dt>
          <dd className="text-right font-medium text-white">{t.services.items[selection.service].title}</dd>
        </div>
        {quote.lines.map((l) => (
          <div key={`${l.kind}-${l.id}`} className="flex justify-between gap-4">
            <dt className="text-soft">
              {l.kind === "addon" ? "+ " : l.kind === "plan" ? `${t.order.summary.plan}: ` : ""}
              {label(l.kind, l.id)}
            </dt>
            <dd className="shrink-0 text-right text-ice">
              {l.amount === null ? (
                <span className="text-soft/80">{l.kind === "addon" && !quote.requiresQuote ? t.order.summary.unpriced : t.common.onRequest}</span>
              ) : (
                formatMoney(l.amount, currency)
              )}
            </dd>
          </div>
        ))}
      </dl>

      {quote.requiresQuote ? (
        <div className="mt-6 rounded-2xl border border-blast/30 bg-blast/10 p-4">
          <p className="font-semibold text-white">{t.order.summary.quoteTitle}</p>
          <p className="mt-1 text-sm text-soft">{t.order.summary.quoteText}</p>
        </div>
      ) : (
        <dl className="mt-5 space-y-2.5 border-t border-white/8 pt-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-soft">{t.order.summary.subtotal}</dt>
            <dd className="text-ice">{formatMoney(quote.subtotal, currency)}</dd>
          </div>
          {quote.discount > 0 && (
            <div className="flex justify-between">
              <dt className="text-soft">{t.order.summary.discount}</dt>
              <dd className="text-wa">− {formatMoney(quote.discount, currency)}</dd>
            </div>
          )}
          <div className="flex justify-between text-base">
            <dt className="font-semibold text-white">{t.order.summary.total}</dt>
            <dd className="font-semibold text-white">{formatMoney(quote.total, currency)}</dd>
          </div>
          <div className="mt-3 flex items-end justify-between rounded-2xl bg-navy-950/60 p-4">
            <dt className="text-soft">{t.order.summary.dueNow}</dt>
            <dd className="font-display text-3xl text-white">{formatMoney(quote.dueNow, currency)}</dd>
          </div>
          {quote.dueLater > 0 && (
            <div className="flex justify-between text-xs">
              <dt className="text-soft/80">{t.order.summary.dueLater}</dt>
              <dd className="text-soft">{formatMoney(quote.dueLater, currency)}</dd>
            </div>
          )}
        </dl>
      )}

      <div className="mt-6 flex flex-col gap-2.5">
        <button type="submit" form="order-form" disabled={submitting} className={buttonStyles.primary}>
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {quote.requiresQuote ? t.order.summary.quote : t.order.summary.pay}
        </button>
        <WhatsAppButton href={waOrder(t, selection)}>{t.common.negotiate}</WhatsAppButton>
      </div>
      <p className="mt-4 flex gap-2 text-xs text-soft/80">
        <ShieldCheck className="h-4 w-4 shrink-0 text-blast-400" aria-hidden />
        {t.order.summary.secure}
      </p>
    </div>
  );

  let n = 0;
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <form id="order-form" onSubmit={submit} className="space-y-6" noValidate={false}>
        <StepCard n={++n} label={t.order.step} title={t.order.steps.service}>
          <div className="grid gap-3 sm:grid-cols-3">
            {services.map((s) => {
              const price = formatPrice(s.from, currency);
              return (
                <Choice key={s.id} name="service" checked={selection.service === s.id} onChange={() => update({ service: s.id, plan: s.defaultPlan })}>
                  <span className="pr-6 font-semibold text-white">{t.services.items[s.id].title}</span>
                  <span className="mt-1 text-xs text-soft">{t.services.items[s.id].description}</span>
                  <span className="mt-auto pt-4 text-sm text-ice">{price ? `${t.common.from} ${price}` : t.common.onRequest}</span>
                </Choice>
              );
            })}
          </div>
        </StepCard>

        {availablePlans.length > 0 ? (
          <StepCard n={++n} label={t.order.step} title={t.order.steps.plan}>
            <div className="grid gap-3 sm:grid-cols-2">
              {availablePlans.map((p) => {
                const copy = t.pricing.plans[p.id];
                const price = formatPrice(p.price, currency);
                return (
                  <Choice key={p.id} name="plan" checked={selection.plan === p.id} onChange={() => update({ plan: p.id })}>
                    <span className="pr-6 font-semibold text-white">{copy.name}</span>
                    <span className="text-xs text-soft">{copy.service}</span>
                    <ul className="mt-3 space-y-1 text-xs text-soft">
                      {copy.features.map((f) => (
                        <li key={f} className="flex gap-1.5">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-blast-400" /> {f}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto pt-4 text-sm text-ice">{price ? `${t.common.from} ${price}` : t.common.onRequest}</span>
                  </Choice>
                );
              })}
            </div>
          </StepCard>
        ) : (
          <p className="rounded-2xl border border-blast/30 bg-blast/10 p-5 text-sm text-soft">{t.order.appNotice}</p>
        )}

        <StepCard n={++n} label={t.order.step} title={t.order.steps.addons}>
          <div className="grid gap-3 sm:grid-cols-2">
            {addons.map((a) => {
              const checked = selection.addons.includes(a.id);
              const price = formatPrice(a.price, currency);
              const suffix = a.recurring === "year" ? t.order.perYear : a.recurring === "month" ? t.order.perMonth : "";
              return (
                <label
                  key={a.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blast ${checked ? "border-blast bg-blast/10" : "border-white/10 hover:border-white/25"}`}
                >
                  <input type="checkbox" checked={checked} onChange={() => toggleAddon(a.id)} className="sr-only" />
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${checked ? "border-blast bg-blast text-white" : "border-white/25"}`}>
                    {checked && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  <span className="flex-1 text-sm text-ice">{t.order.addons[a.id]}</span>
                  <span className="shrink-0 text-xs text-soft">{price ? `${price}${suffix}` : t.common.onRequest}</span>
                </label>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-soft/80">{t.order.addonsNote}</p>
        </StepCard>

        <StepCard n={++n} label={t.order.step} title={t.order.steps.info}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label={t.order.form.name} required autoComplete="name" value={customer.name} error={errors.name} onChange={(e) => setField("name", e.target.value)} />
            <Input label={t.order.form.company} required autoComplete="organization" value={customer.company} error={errors.company} onChange={(e) => setField("company", e.target.value)} />
            <Input label={t.order.form.whatsapp} required type="tel" autoComplete="tel" placeholder="(11) 99999-9999" value={customer.whatsapp} error={errors.whatsapp} onChange={(e) => setField("whatsapp", e.target.value)} />
            <Input label={t.order.form.email} required type="email" autoComplete="email" value={customer.email} error={errors.email} onChange={(e) => setField("email", e.target.value)} />
            <Input label={t.order.form.industry} required value={customer.industry} error={errors.industry} onChange={(e) => setField("industry", e.target.value)} />
            <Input label={t.order.form.city} required autoComplete="address-level2" value={customer.city} error={errors.city} onChange={(e) => setField("city", e.target.value)} />
            <div className="sm:col-span-2">
              <Input label={t.order.form.instagram} placeholder="@" value={customer.instagram} onChange={(e) => setField("instagram", e.target.value)} />
            </div>
            <YesNo name="hasLogo" label={t.order.form.hasLogo} value={customer.hasLogo} onChange={(v) => setField("hasLogo", v)} yes={t.order.form.yes} no={t.order.form.no} />
            <YesNo name="hasDomain" label={t.order.form.hasDomain} value={customer.hasDomain} onChange={(v) => setField("hasDomain", v)} yes={t.order.form.yes} no={t.order.form.no} />
            {quote.requiresQuote && (
              <div className="sm:col-span-2">
                <Textarea label={t.order.form.describe} required placeholder={t.order.form.describePlaceholder} value={customer.needs} error={errors.needs} onChange={(e) => setField("needs", e.target.value)} />
              </div>
            )}
            <div className="sm:col-span-2">
              <Textarea label={t.order.form.notes} rows={3} value={customer.notes} onChange={(e) => setField("notes", e.target.value)} />
            </div>
          </div>
        </StepCard>

        {!quote.requiresQuote && (
          <StepCard n={++n} label={t.order.step} title={t.order.steps.payment}>
            <div className="grid gap-3 sm:grid-cols-2">
              {(["deposit", "full"] as PaymentOption[]).map((opt) => (
                <Choice key={opt} name="payment" checked={selection.paymentOption === opt} onChange={() => update({ paymentOption: opt })}>
                  <span className="pr-6 font-semibold text-white">{t.order.payment[opt]}</span>
                  {opt === "full" && (
                    <span className="mt-2 w-fit rounded-full bg-wa/15 px-2.5 py-0.5 text-xs font-semibold text-wa">{t.order.payment.fullBadge}</span>
                  )}
                </Choice>
              ))}
            </div>
          </StepCard>
        )}
      </form>

      <aside className="lg:sticky lg:top-24 lg:self-start">{summary}</aside>

      {/* Barra fixa no celular com o valor atual. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-navy-900/95 py-3 pl-4 pr-24 backdrop-blur lg:hidden">
        <p className="text-xs text-soft">{quote.requiresQuote ? t.order.summary.quoteTitle : t.order.summary.dueNow}</p>
        <p className="font-display text-xl text-white">{quote.requiresQuote ? t.common.onRequest : formatMoney(quote.dueNow, currency)}</p>
      </div>
    </div>
  );
}
