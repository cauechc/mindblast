import { NextResponse } from "next/server";
import { z } from "zod";
import { getDictionary } from "@/i18n";
import { notifyOwner, sendEmail } from "@/lib/notify";
import { formatMoney, normalizeSelection, orderSelectionSchema, quoteOrder } from "@/lib/pricing";
import { customerSchema, localeSchema } from "@/lib/schemas";
import { createOrder, newId, type Order } from "@/lib/store";
import { orderMessage } from "@/lib/whatsapp";

const bodySchema = z.object({
  locale: localeSchema,
  selection: orderSelectionSchema,
  customer: customerSchema,
});

/**
 * Cria um pedido ou pedido de orçamento.
 * O preço enviado pelo navegador é ignorado: o total é recalculado aqui a partir de config/pricing.ts.
 */
export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const { locale, customer } = parsed.data;
  // A moeda segue o idioma: PT → BRL (Pix), EN → USD (Stripe).
  const selection = normalizeSelection({ ...parsed.data.selection, currency: locale === "en" ? "USD" : "BRL" });
  const quote = quoteOrder(selection);

  if (quote.requiresQuote && !customer.needs) {
    return NextResponse.json({ error: "invalid", fields: { needs: ["required"] } }, { status: 400 });
  }

  const order: Order = {
    id: newId("MB"),
    createdAt: new Date().toISOString(),
    locale,
    selection,
    quote,
    customer,
    status: "received",
    paymentStatus: quote.requiresQuote ? "quote_requested" : "awaiting_payment",
  };
  await createOrder(order);

  const t = getDictionary(locale);
  const summary = [
    `Pedido ${order.id}`,
    orderMessage(getDictionary("pt"), selection),
    "",
    `Cliente: ${customer.name} (${customer.company})`,
    `WhatsApp: ${customer.whatsapp} · E-mail: ${customer.email}`,
    `Ramo: ${customer.industry} · Cidade: ${customer.city} · Instagram: ${customer.instagram || "-"}`,
    `Tem logo: ${customer.hasLogo ? "sim" : "não"} · Tem domínio: ${customer.hasDomain ? "sim" : "não"}`,
    customer.needs ? `Necessidade: ${customer.needs}` : "",
    customer.notes ? `Observações: ${customer.notes}` : "",
    quote.requiresQuote ? "" : `Total: ${formatMoney(quote.total, quote.currency)} · Agora: ${formatMoney(quote.dueNow, quote.currency)}`,
  ]
    .filter(Boolean)
    .join("\n");

  await Promise.all([
    notifyOwner(quote.requiresQuote ? `Pedido de orçamento ${order.id}` : `Novo pedido ${order.id}`, summary),
    quote.requiresQuote ? sendEmail(customer.email, t.order.sent.quoteTitle, `${t.order.sent.quoteText}\n\n${order.id}`) : null,
  ]);

  return NextResponse.json({ id: order.id, requiresQuote: quote.requiresQuote, quote });
}
