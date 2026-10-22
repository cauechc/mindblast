import {
  addons,
  paymentRules,
  plans,
  services,
  type AddonId,
  type PlanId,
  type Price,
  type ServiceId,
} from "@/config/pricing";
import { z } from "zod";

export type Currency = "BRL" | "USD";
export type PaymentOption = "deposit" | "full";

export const orderSelectionSchema = z.object({
  service: z.enum(["landing", "institucional", "app"]),
  plan: z.enum(["essencial", "profissional", "premium"]).nullable(),
  addons: z
    .array(z.enum(["dominio", "hospedagem", "google", "logo", "copywriting", "manutencao"]))
    .max(6)
    .transform((a) => Array.from(new Set(a))),
  paymentOption: z.enum(["deposit", "full"]),
  currency: z.enum(["BRL", "USD"]),
});

export type OrderSelection = z.infer<typeof orderSelectionSchema>;

export type QuoteLine = {
  kind: "service" | "plan" | "addon";
  id: string;
  /** Valor em centavos, ou null se "Sob consulta". */
  amount: number | null;
};

export type OrderQuote = {
  currency: Currency;
  lines: QuoteLine[];
  /** true quando o serviço/plano é "Sob consulta": não vai para o checkout. */
  requiresQuote: boolean;
  /** Adicionais sem preço definido, orçados à parte. */
  unpricedAddons: AddonId[];
  subtotal: number;
  discount: number;
  total: number;
  dueNow: number;
  dueLater: number;
};

const cents = (price: Price, currency: Currency) =>
  price === null ? null : Math.round((currency === "BRL" ? price.brl : price.usd) * 100);

export function plansFor(service: ServiceId) {
  return plans.filter((p) => p.services.includes(service));
}

/** Corrige combinações inválidas (ex.: plano que não pertence ao serviço). */
export function normalizeSelection(sel: OrderSelection): OrderSelection {
  const service = services.find((s) => s.id === sel.service)!;
  const available = plansFor(service.id);
  let plan: PlanId | null = sel.plan;
  if (available.length === 0) plan = null;
  else if (!plan || !available.some((p) => p.id === plan)) plan = service.defaultPlan;
  return { ...sel, plan };
}

/**
 * Calcula o pedido a partir da tabela de preços.
 * Usado no navegador só para exibição; o servidor chama de novo antes de cobrar.
 */
export function quoteOrder(input: OrderSelection): OrderQuote {
  const sel = normalizeSelection(input);
  const { currency } = sel;
  const lines: QuoteLine[] = [];

  const plan = plans.find((p) => p.id === sel.plan);
  if (plan) lines.push({ kind: "plan", id: plan.id, amount: cents(plan.price, currency) });
  else lines.push({ kind: "service", id: sel.service, amount: null });

  const unpricedAddons: AddonId[] = [];
  for (const id of sel.addons) {
    const addon = addons.find((a) => a.id === id)!;
    const amount = cents(addon.price, currency);
    if (amount === null) unpricedAddons.push(id);
    lines.push({ kind: "addon", id, amount });
  }

  const requiresQuote = lines[0].amount === null;
  const subtotal = lines.reduce((sum, l) => sum + (l.amount ?? 0), 0);

  if (requiresQuote) {
    return { currency, lines, requiresQuote, unpricedAddons, subtotal: 0, discount: 0, total: 0, dueNow: 0, dueLater: 0 };
  }

  const discount =
    sel.paymentOption === "full" ? Math.round(subtotal * paymentRules.fullPaymentDiscount) : 0;
  const total = subtotal - discount;
  const dueNow =
    sel.paymentOption === "full" ? total : Math.round(total * paymentRules.depositShare);

  return { currency, lines, requiresQuote, unpricedAddons, subtotal, discount, total, dueNow, dueLater: total - dueNow };
}

export function formatMoney(amountCents: number, currency: Currency) {
  const digits = amountCents % 100 === 0 ? 0 : 2;
  const n = new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : "en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amountCents / 100);
  return `${currency === "BRL" ? "R$" : "US$"}\u00a0${n}`;
}

/** "R$ 250" / "US$ 50" para preços inteiros da tabela. */
export function formatPrice(price: Price, currency: Currency) {
  const c = cents(price, currency);
  return c === null ? null : formatMoney(c, currency);
}
