import { notifyOwner, sendEmail } from "./notify";
import { formatMoney } from "./pricing";
import { getOrder, updateOrder } from "./store";

/**
 * Registra um pagamento confirmado pelo provedor. Só é chamado a partir de webhooks verificados.
 * Ignora valores diferentes do que o servidor calculou e pagamentos repetidos.
 */
export async function recordPayment(orderId: string, provider: "mercadopago" | "stripe", paymentId: string, amountCents: number) {
  const order = await getOrder(orderId);
  if (!order || order.paymentStatus !== "awaiting_payment") return order;
  if (order.payments?.some((p) => p.id === paymentId)) return order;
  if (amountCents !== order.quote.dueNow) {
    console.error(`[payment] valor divergente no pedido ${orderId}: recebido ${amountCents}, esperado ${order.quote.dueNow}`);
    await notifyOwner(`Pagamento com valor divergente ${orderId}`, `Recebido ${amountCents}, esperado ${order.quote.dueNow} (${provider} ${paymentId}). Conferir manualmente.`);
    return order;
  }
  const updated = await updateOrder(
    orderId,
    {
      paymentStatus: order.quote.dueLater > 0 ? "deposit_paid" : "paid",
      payments: [...(order.payments ?? []), { provider, id: paymentId, amount: amountCents, at: new Date().toISOString() }],
    },
    "awaiting_payment",
  );
  // Outro webhook já registrou este pagamento.
  if (!updated) return getOrder(orderId);
  const amount = formatMoney(amountCents, order.quote.currency);
  const pt = order.locale === "pt";
  await Promise.all([
    notifyOwner(`Pagamento confirmado ${orderId}`, `${order.customer.name} (${order.customer.company}) pagou ${amount} via ${provider}.\nWhatsApp: ${order.customer.whatsapp}`),
    sendEmail(
      order.customer.email,
      pt ? `Pagamento confirmado · Pedido ${orderId}` : `Payment confirmed · Order ${orderId}`,
      pt
        ? `Olá, ${order.customer.name}! Recebemos ${amount} do pedido ${orderId}. Próximo passo: envie logo, fotos e textos do seu negócio. Qualquer dúvida, fale com a gente no WhatsApp.`
        : `Hi ${order.customer.name}! We received ${amount} for order ${orderId}. Next step: send us your logo, photos and texts. Questions? Message us on WhatsApp.`,
    ),
  ]);
  return updated;
}
