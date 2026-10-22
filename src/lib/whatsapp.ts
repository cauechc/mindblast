import { whatsappUrl } from "@/config/site";
import { plans, services, type ServiceId } from "@/config/pricing";
import { fill, type Dictionary } from "@/i18n";
import { formatMoney, formatPrice, quoteOrder, type Currency, type OrderSelection } from "./pricing";

export const waGeneric = (t: Dictionary) => whatsappUrl(t.wa.generic);

export function waService(t: Dictionary, id: ServiceId, currency: Currency) {
  const service = services.find((s) => s.id === id)!;
  const name = t.services.items[id].title;
  const price = formatPrice(service.from, currency);
  return whatsappUrl(
    price ? fill(t.wa.service, { service: name, price: `${t.common.from} ${price}` }) : fill(t.wa.serviceQuote, { service: name }),
  );
}

export function waPlan(t: Dictionary, planId: (typeof plans)[number]["id"], currency: Currency) {
  const plan = plans.find((p) => p.id === planId)!;
  const name = `${t.pricing.plans[planId].service} (${t.pricing.plans[planId].name})`;
  const price = formatPrice(plan.price, currency);
  return whatsappUrl(
    price ? fill(t.wa.service, { service: name, price: `${t.common.from} ${price}` }) : fill(t.wa.serviceQuote, { service: name }),
  );
}

export const waProject = (t: Dictionary, projectType: string) =>
  whatsappUrl(fill(t.wa.project, { project: projectType }));

/** Mensagem com o pedido montado: serviço, plano, adicionais e total. */
export function orderMessage(t: Dictionary, sel: OrderSelection) {
  const q = quoteOrder(sel);
  const lines = q.lines.map((l) => {
    const name =
      l.kind === "plan"
        ? `${t.pricing.plans[l.id as keyof Dictionary["pricing"]["plans"]].service} – ${t.pricing.plans[l.id as keyof Dictionary["pricing"]["plans"]].name}`
        : l.kind === "service"
          ? t.services.items[l.id as ServiceId].title
          : `+ ${t.order.addons[l.id as keyof Dictionary["order"]["addons"]]}`;
    const price = l.amount === null ? t.common.onRequest : formatMoney(l.amount, q.currency);
    return `• ${name}: ${price}`;
  });
  if (!q.requiresQuote) {
    const payment = sel.paymentOption === "full" ? t.order.payment.full : t.order.payment.deposit;
    lines.push(`• ${payment}`);
  }
  return q.requiresQuote
    ? fill(t.wa.orderQuote, { lines: lines.join("\n") })
    : fill(t.wa.order, { lines: lines.join("\n"), total: formatMoney(q.total, q.currency) });
}

export const waOrder = (t: Dictionary, sel: OrderSelection) => whatsappUrl(orderMessage(t, sel));
