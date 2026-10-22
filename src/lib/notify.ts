import { site } from "@/config/site";

/**
 * Avisos por e-mail (Resend). Sem RESEND_API_KEY, apenas registra no log do servidor.
 * Variáveis: RESEND_API_KEY, EMAIL_FROM, OWNER_EMAIL.
 */
export async function sendEmail(to: string, subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) {
    console.info(`[email:stub] to=${to} subject=${subject}\n${text}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`, to, subject, text }),
  });
  if (!res.ok) console.error("[email] falha ao enviar", res.status, await res.text());
}

export const notifyOwner = (subject: string, text: string) =>
  sendEmail(process.env.OWNER_EMAIL ?? site.email, `[${site.name}] ${subject}`, text);
