import { NextResponse } from "next/server";
import { serviceName } from "@/config/site";
import { sendToCrm } from "@/lib/crm";
import { notifyOwner } from "@/lib/notify";
import { leadSchema } from "@/lib/schemas";
import { createLead, newId, updateLead, type Lead } from "@/lib/store";
import { formatPhone, leadToPlatformUrl, platformToLeadUrl } from "@/lib/whatsapp";

// Limite simples por IP para conter spam: 5 pedidos a cada 10 minutos.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

/** Pedido de orçamento enviado pelo formulário. */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const parsed = leadSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const fields = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
    return NextResponse.json({ error: "invalid", fields }, { status: 400 });
  }
  const { name, whatsapp, city, service, propertyType, description, source } = parsed.data;
  const now = new Date().toISOString();
  let lead: Lead = { id: newId(), createdAt: now, name, whatsapp, city, service, propertyType, description, source, consentAt: now, status: "novo" };
  await createLead(lead);

  const crm = await sendToCrm(lead);
  if (crm) lead = (await updateLead(lead.id, { crm })) ?? lead;

  await notifyOwner(
    `Novo orçamento ${lead.id}: ${serviceName(lead.service)} em ${lead.city}`,
    `${lead.name} · ${formatPhone(lead.whatsapp)}\n${serviceName(lead.service)} · ${lead.city} · ${lead.propertyType}\n\n${lead.description || "(sem descrição)"}\n\nResponder no WhatsApp: ${platformToLeadUrl(lead)}`,
  );
  return NextResponse.json({ id: lead.id, whatsappUrl: leadToPlatformUrl(lead) });
}
