import { NextResponse } from "next/server";
import { createPixCharge, mercadoPagoConfigured } from "@/lib/mercadopago";
import { pixPayload, pixQrDataUrl, staticPixConfigured } from "@/lib/pix";
import { getOrder } from "@/lib/store";

/**
 * Cobrança Pix (BRL). O valor vem sempre de order.quote.dueNow, calculado no servidor.
 * Com MERCADOPAGO_ACCESS_TOKEN: Pix dinâmico, confirmado automaticamente pelo webhook.
 * Sem ele, mas com PIX_KEY: Pix estático com a chave, confirmação manual pelo dono.
 */
export async function POST(req: Request) {
  const { orderId } = (await req.json().catch(() => ({}))) as { orderId?: string };
  const order = orderId ? await getOrder(orderId) : null;
  if (!order || order.quote.requiresQuote || order.paymentStatus !== "awaiting_payment" || order.quote.currency !== "BRL") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  if (mercadoPagoConfigured()) {
    try {
      const charge = await createPixCharge(order);
      return NextResponse.json({
        mode: "dynamic",
        payload: charge.payload,
        qr: `data:image/png;base64,${charge.qrBase64}`,
        amount: order.quote.dueNow,
        expiresAt: charge.expiresAt,
      });
    } catch (e) {
      console.error("[pix]", e);
      return NextResponse.json({ error: "provider" }, { status: 502 });
    }
  }

  if (staticPixConfigured()) {
    const payload = pixPayload({ amountCents: order.quote.dueNow, txid: order.id });
    return NextResponse.json({ mode: "static", payload, qr: await pixQrDataUrl(payload), amount: order.quote.dueNow });
  }

  return NextResponse.json({ error: "not_configured" }, { status: 503 });
}
