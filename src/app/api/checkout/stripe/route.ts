import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { getDictionary } from "@/i18n";
import { getOrder } from "@/lib/store";

/**
 * Cria uma sessão do Stripe Checkout (USD) para o valor calculado no servidor.
 * Requer STRIPE_SECRET_KEY. O pedido só é marcado como pago pelo webhook (próxima etapa).
 */
export async function POST(req: Request) {
  const { orderId } = (await req.json().catch(() => ({}))) as { orderId?: string };
  const order = orderId ? await getOrder(orderId) : null;
  if (!order || order.quote.requiresQuote || order.paymentStatus !== "awaiting_payment") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (order.quote.currency !== "USD") return NextResponse.json({ error: "currency" }, { status: 400 });

  const t = getDictionary(order.locale);
  const base = site.url.replace(/\/$/, "");
  const form = new URLSearchParams({
    mode: "payment",
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(order.quote.dueNow),
    "line_items[0][price_data][product_data][name]": `Mind Blast · ${t.services.items[order.selection.service].title} (${order.id})`,
    customer_email: order.customer.email,
    client_reference_id: order.id,
    "metadata[orderId]": order.id,
    success_url: `${base}/${order.locale}/sucesso/${order.id}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/${order.locale}/checkout/${order.id}`,
  });
  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("[stripe]", data);
    return NextResponse.json({ error: "provider" }, { status: 502 });
  }
  return NextResponse.json({ url: data.url });
}
