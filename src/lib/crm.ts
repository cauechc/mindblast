import { serviceName } from "@/config/site";
import type { Lead } from "./store";

/**
 * Integração com CRM / automações. Com LEAD_WEBHOOK_URL definido, cada lead novo é enviado
 * por POST em JSON (funciona com RD Station, HubSpot, Pipedrive via Make/Zapier/n8n, ou uma API própria).
 * LEAD_WEBHOOK_SECRET, se definido, vai no cabeçalho X-Webhook-Secret.
 */
export async function sendToCrm(lead: Lead): Promise<Lead["crm"] | undefined> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return undefined;
  const at = new Date().toISOString();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({ event: "lead.created", lead: { ...lead, serviceName: serviceName(lead.service) } }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? { ok: true, at } : { ok: false, at, error: `HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, at, error: e instanceof Error ? e.message : "erro" };
  }
}
