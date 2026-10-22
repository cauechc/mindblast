import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { recordPayment } from "@/lib/payments";

/** Tolerância para o horário da assinatura (proteção contra reenvio). */
const TOLERANCE_SECONDS = 300;

/** Confere o cabeçalho Stripe-Signature: HMAC-SHA256 de "{t}.{corpo bruto}" com STRIPE_WEBHOOK_SECRET. */
function verify(rawBody: string, header: string | null, secret: string) {
  if (!header) return false;
  const parts = header.split(",").map((p) => p.split("=") as [string, string]);
  const t = parts.find(([k]) => k === "t")?.[1];
  const signatures = parts.filter(([k]) => k === "v1").map(([, v]) => v);
  if (!t || signatures.length === 0) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > TOLERANCE_SECONDS) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(`${t}.${rawBody}`).digest("hex"));
  return signatures.some((s) => {
    const b = Buffer.from(s);
    return b.length === expected.length && timingSafeEqual(b, expected);
  });
}

/** Webhook do Stripe: marca o pedido como pago quando o Checkout é concluído. */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const raw = await req.text();
  if (!verify(raw, req.headers.get("stripe-signature"), secret)) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  const event = JSON.parse(raw) as {
    type: string;
    data: { object: { id: string; payment_status?: string; amount_total?: number; currency?: string; metadata?: { orderId?: string } } };
  };
  const session = event.data.object;
  if (
    (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") &&
    session.payment_status === "paid" &&
    session.currency === "usd" &&
    session.metadata?.orderId
  ) {
    await recordPayment(session.metadata.orderId, "stripe", session.id, session.amount_total ?? 0);
  }
  return NextResponse.json({ received: true });
}
