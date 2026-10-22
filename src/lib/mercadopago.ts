import { createHmac, timingSafeEqual } from "node:crypto";
import { site } from "@/config/site";
import type { Order } from "./store";

/**
 * Pix dinâmico pelo Mercado Pago.
 * Variáveis: MERCADOPAGO_ACCESS_TOKEN, MERCADOPAGO_WEBHOOK_SECRET.
 */
const API = "https://api.mercadopago.com";
const token = () => process.env.MERCADOPAGO_ACCESS_TOKEN;

export const mercadoPagoConfigured = () => Boolean(token());

/** Minutos até o Pix expirar. */
export const PIX_EXPIRATION_MINUTES = 30;

export type PixCharge = { id: string; payload: string; qrBase64: string; expiresAt: string };

export async function createPixCharge(order: Order): Promise<PixCharge> {
  const expiresAt = new Date(Date.now() + PIX_EXPIRATION_MINUTES * 60_000);
  const [firstName, ...rest] = order.customer.name.split(" ");
  const res = await fetch(`${API}/v1/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
      // Mesmo pedido + mesmo valor = mesma cobrança, evita duplicar se o cliente clicar duas vezes.
      "X-Idempotency-Key": `${order.id}-${order.quote.dueNow}-${order.paymentStatus}`,
    },
    body: JSON.stringify({
      transaction_amount: order.quote.dueNow / 100,
      payment_method_id: "pix",
      description: `Mind Blast · Pedido ${order.id}`,
      external_reference: order.id,
      date_of_expiration: expiresAt.toISOString().replace("Z", "-00:00"),
      notification_url: `${site.url.replace(/\/$/, "")}/api/webhooks/mercadopago`,
      payer: { email: order.customer.email, first_name: firstName, last_name: rest.join(" ") || undefined },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`mercadopago ${res.status}: ${JSON.stringify(data)}`);
  const tx = data.point_of_interaction?.transaction_data ?? {};
  return { id: String(data.id), payload: tx.qr_code, qrBase64: tx.qr_code_base64, expiresAt: data.date_of_expiration ?? expiresAt.toISOString() };
}

export async function getPayment(id: string) {
  const res = await fetch(`${API}/v1/payments/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${token()}` } });
  if (!res.ok) throw new Error(`mercadopago ${res.status}`);
  return (await res.json()) as { id: number; status: string; transaction_amount: number; external_reference: string; currency_id: string };
}

/**
 * Confere o cabeçalho x-signature do webhook (HMAC-SHA256 com a "assinatura secreta" do painel).
 * Modelo: id:{data.id};request-id:{x-request-id};ts:{ts};
 */
export function verifyWebhookSignature(headers: Headers, dataId: string) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  const signature = headers.get("x-signature");
  if (!secret || !signature) return false;
  const parts = Object.fromEntries(signature.split(",").map((p) => p.trim().split("=") as [string, string]));
  if (!parts.ts || !parts.v1) return false;
  const requestId = headers.get("x-request-id");
  const manifest = `id:${dataId.toLowerCase()};${requestId ? `request-id:${requestId};` : ""}ts:${parts.ts};`;
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(parts.v1);
  return a.length === b.length && timingSafeEqual(a, b);
}
