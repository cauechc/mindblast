import { site } from "@/config/site";
import type { Order, OrderStatus, PaymentStatus } from "./store";

export const paymentLink = (order: Pick<Order, "id" | "locale">) =>
  `${site.url.replace(/\/$/, "")}/${order.locale}/checkout/${order.id}`;

export const orderStatusLabel: Record<OrderStatus, string> = {
  received: "Pedido recebido",
  in_progress: "Em criação",
  preview_sent: "Prévia enviada",
  adjustments: "Ajustes",
  published: "Publicado",
};

export const paymentStatusLabel: Record<PaymentStatus, { label: string; tone: string }> = {
  quote_requested: { label: "Orçamento pendente", tone: "bg-amber-300/15 text-amber-200" },
  awaiting_payment: { label: "Aguardando pagamento", tone: "bg-blast/15 text-blast-400" },
  deposit_paid: { label: "Entrada paga", tone: "bg-wa/15 text-wa" },
  paid: { label: "Pago", tone: "bg-wa/25 text-wa" },
};

/** Link de WhatsApp para o número do cliente (assume Brasil quando vier sem DDI). */
export function clientWhatsapp(phone: string, text: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) digits = `55${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export const dateTime = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(new Date(iso));
