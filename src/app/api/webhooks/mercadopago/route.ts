import { NextResponse } from "next/server";
import { getPayment, verifyWebhookSignature } from "@/lib/mercadopago";
import { recordPayment } from "@/lib/payments";

/** Webhook do Mercado Pago. Só confia na assinatura e na consulta do pagamento à API. */
export async function POST(req: Request) {
  const url = new URL(req.url);
  const body = (await req.json().catch(() => ({}))) as { type?: string; data?: { id?: string | number } };
  const dataId = String(url.searchParams.get("data.id") ?? body.data?.id ?? "");
  if (!dataId) return NextResponse.json({ ok: true });

  if (!verifyWebhookSignature(req.headers, dataId)) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }
  if ((url.searchParams.get("type") ?? body.type) !== "payment") return NextResponse.json({ ok: true });

  const payment = await getPayment(dataId);
  if (payment.status === "approved" && payment.currency_id === "BRL" && payment.external_reference) {
    await recordPayment(payment.external_reference, "mercadopago", String(payment.id), Math.round(payment.transaction_amount * 100));
  }
  return NextResponse.json({ ok: true });
}
