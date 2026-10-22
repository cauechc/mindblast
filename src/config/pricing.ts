/**
 * TABELA DE PREÇOS — fonte única de verdade.
 * O servidor recalcula todo pedido a partir deste arquivo; o navegador nunca define o preço.
 *
 * Preço `null` = "Sob consulta" (não vai para o checkout, vira pedido de orçamento).
 * BRL é cobrado via Pix; USD via Stripe (tabela fixa, sem conversão ao vivo).
 * Valores em unidades inteiras (R$ 250 = 250).
 */

export type Price = { brl: number; usd: number } | null;

export type ServiceId = "landing" | "institucional" | "app";
export type PlanId = "essencial" | "profissional" | "premium";
export type AddonId =
  | "dominio"
  | "hospedagem"
  | "google"
  | "logo"
  | "copywriting"
  | "manutencao";

export type Plan = {
  id: PlanId;
  /** Serviços em que o plano aparece. */
  services: ServiceId[];
  price: Price;
};

export type Service = {
  id: ServiceId;
  /** Preço "a partir de" mostrado nos cards. */
  from: Price;
  /** Plano pré-selecionado ao escolher o serviço. */
  defaultPlan: PlanId | null;
};

export const services: Service[] = [
  { id: "landing", from: { brl: 250, usd: 50 }, defaultPlan: "essencial" },
  { id: "institucional", from: { brl: 500, usd: 100 }, defaultPlan: "profissional" },
  // Aplicativos: sem escolha de plano, vai direto para o pedido de orçamento.
  { id: "app", from: null, defaultPlan: null },
];

export const plans: Plan[] = [
  { id: "essencial", services: ["landing"], price: { brl: 250, usd: 50 } },
  { id: "profissional", services: ["institucional"], price: { brl: 500, usd: 100 } },
  { id: "premium", services: ["landing", "institucional"], price: null },
];

/** Adicionais. Defina `price` para torná-los pagáveis no checkout. */
export const addons: { id: AddonId; price: Price; recurring?: "year" | "month" }[] = [
  { id: "dominio", price: null, recurring: "year" },
  { id: "hospedagem", price: null, recurring: "year" },
  { id: "google", price: null },
  { id: "logo", price: null },
  { id: "copywriting", price: null },
  { id: "manutencao", price: null, recurring: "month" },
];

export const paymentRules = {
  /** Fração cobrada como entrada na opção 50/50. */
  depositShare: 0.5,
  /** Desconto ao pagar 100% à vista. */
  fullPaymentDiscount: 0.05,
};
