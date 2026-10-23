import { serviceName } from "@/config/site";
import { isAdmin } from "@/lib/admin-auth";
import { listLeads } from "@/lib/store";

export const dynamic = "force-dynamic";

const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;

/** Exporta os leads em CSV (abre no Excel e importa em qualquer CRM). */
export async function GET() {
  if (!(await isAdmin())) return new Response("Não autorizado", { status: 401 });
  const leads = await listLeads(10_000);
  const header = ["id", "data", "nome", "whatsapp", "cidade", "tipo_imovel", "servico", "descricao", "status", "origem"];
  const rows = leads.map((l) =>
    [l.id, l.createdAt, l.name, l.whatsapp, l.city, l.propertyType ?? "", serviceName(l.service), l.description, l.status, l.source ? new URLSearchParams(l.source).toString() : ""].map(cell).join(";"),
  );
  return new Response(`﻿${[header.join(";"), ...rows].join("\r\n")}`, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="leads-casa-nova.csv"` },
  });
}
