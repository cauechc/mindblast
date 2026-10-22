import { NextResponse } from "next/server";
import { getOrder } from "@/lib/store";

/**
 * Cobrança Pix dinâmica (BRL). O provedor (Mercado Pago, Asaas ou Efí) ainda será escolhido;
 * até lá, responde "não configurado". O valor cobrado virá sempre de order.quote.dueNow.
 */
export async function POST(req: Request) {
  const { orderId } = (await req.json().catch(() => ({}))) as { orderId?: string };
  const order = orderId ? await getOrder(orderId) : null;
  if (!order || order.quote.requiresQuote || order.paymentStatus !== "awaiting_payment") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ error: "not_configured" }, { status: 503 });
}
