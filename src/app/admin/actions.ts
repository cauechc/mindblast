"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, checkPassword, requireAdmin, sessionToken } from "@/lib/admin-auth";
import { notifyOwner, sendEmail } from "@/lib/notify";
import { recordPayment } from "@/lib/payments";
import { paymentLink } from "@/lib/admin-format";
import { formatMoney } from "@/lib/pricing";
import { getOrder, updateOrder, type OrderStatus } from "@/lib/store";

const statuses: OrderStatus[] = ["received", "in_progress", "preview_sent", "adjustments", "published"];

/** "12,50" ou "1.250,00" ou "1250.5" → centavos. */
function parseAmount(raw: string) {
  const s = raw.trim().replace(/[^\d.,]/g, "");
  const normalized = s.includes(",") ? s.replace(/\./g, "").replace(",", ".") : s;
  const value = Math.round(Number(normalized) * 100);
  return Number.isFinite(value) && value > 0 ? value : null;
}

export async function login(_: string | null, form: FormData) {
  if (!checkPassword(String(form.get("password") ?? ""))) return "Senha incorreta.";
  const token = sessionToken();
  (await cookies()).set(ADMIN_COOKIE, token.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: token.maxAge,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin/login");
}

export async function updateProject(id: string, form: FormData) {
  await requireAdmin();
  const order = await getOrder(id);
  if (!order) return;
  const status = String(form.get("status")) as OrderStatus;
  const previewUrl = String(form.get("previewUrl") ?? "").trim();
  const adminNotes = String(form.get("adminNotes") ?? "").trim();
  await updateOrder(id, {
    status: statuses.includes(status) ? status : order.status,
    previewUrl: previewUrl || undefined,
    adminNotes: adminNotes || undefined,
  });
  if (previewUrl && previewUrl !== order.previewUrl) {
    const pt = order.locale === "pt";
    await sendEmail(
      order.customer.email,
      pt ? `A prévia do seu site está pronta · ${order.id}` : `Your site preview is ready · ${order.id}`,
      pt ? `Olá, ${order.customer.name}! Veja a prévia do seu site: ${previewUrl}` : `Hi ${order.customer.name}! See your site preview: ${previewUrl}`,
    );
  }
  revalidatePath(`/admin/pedidos/${id}`);
}

/** Define o valor de um pedido "Sob consulta" e libera o link de pagamento. */
export async function setCustomQuote(id: string, form: FormData) {
  await requireAdmin();
  const order = await getOrder(id);
  const amount = parseAmount(String(form.get("amount") ?? ""));
  const description = String(form.get("description") ?? "").trim().slice(0, 2000);
  if (!order || !amount || (order.paymentStatus !== "quote_requested" && !(order.paymentStatus === "awaiting_payment" && order.customQuote))) return;
  const at = new Date().toISOString();
  await updateOrder(id, {
    customQuote: { amount, description, at },
    quote: { ...order.quote, requiresQuote: false, subtotal: amount, discount: 0, total: amount, dueNow: amount, dueLater: 0 },
    paymentStatus: "awaiting_payment",
  });
  const pt = order.locale === "pt";
  const value = formatMoney(amount, order.quote.currency);
  await sendEmail(
    order.customer.email,
    pt ? `Seu orçamento Mind Blast · ${order.id}` : `Your Mind Blast quote · ${order.id}`,
    pt
      ? `Olá, ${order.customer.name}! Seu orçamento ficou em ${value}.\n\n${description}\n\nPara pagar: ${paymentLink(order)}`
      : `Hi ${order.customer.name}! Your quote is ${value}.\n\n${description}\n\nPay here: ${paymentLink(order)}`,
  );
  revalidatePath(`/admin/pedidos/${id}`);
}

/** Confirmação manual (ex.: Pix pela chave, conferido no extrato do banco). */
export async function markPaid(id: string) {
  await requireAdmin();
  const order = await getOrder(id);
  if (!order || order.paymentStatus !== "awaiting_payment") return;
  await recordPayment(id, "manual", `manual-${Date.now()}`, order.quote.dueNow);
  await notifyOwner(`Pagamento marcado manualmente ${id}`, `${formatMoney(order.quote.dueNow, order.quote.currency)} confirmado no painel.`);
  revalidatePath(`/admin/pedidos/${id}`);
}

/** Libera a cobrança dos 50% restantes. */
export async function requestBalance(id: string) {
  await requireAdmin();
  const order = await getOrder(id);
  if (!order || order.paymentStatus !== "deposit_paid" || order.quote.dueLater <= 0) return;
  const balance = order.quote.dueLater;
  await updateOrder(id, { quote: { ...order.quote, dueNow: balance, dueLater: 0 }, paymentStatus: "awaiting_payment" }, "deposit_paid");
  const pt = order.locale === "pt";
  const value = formatMoney(balance, order.quote.currency);
  await sendEmail(
    order.customer.email,
    pt ? `Pagamento final · ${order.id}` : `Final payment · ${order.id}`,
    pt ? `Olá, ${order.customer.name}! Seu site está pronto. Falta o pagamento final de ${value}: ${paymentLink(order)}` : `Hi ${order.customer.name}! Your site is ready. The final payment is ${value}: ${paymentLink(order)}`,
  );
  revalidatePath(`/admin/pedidos/${id}`);
}
