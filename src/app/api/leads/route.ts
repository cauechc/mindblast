import { NextResponse } from "next/server";
import { notifyOwner } from "@/lib/notify";
import { leadSchema, localeSchema } from "@/lib/schemas";
import { createLead, newId } from "@/lib/store";

const bodySchema = leadSchema.extend({ locale: localeSchema });

/** Pedido de prévia grátis. */
export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const lead = await createLead({ id: newId("PV"), createdAt: new Date().toISOString(), ...parsed.data });
  await notifyOwner(
    `Prévia grátis ${lead.id}`,
    `${lead.name} · ${lead.whatsapp}\nRamo: ${lead.industry} · Cidade: ${lead.city}\nLink: ${lead.link}`,
  );
  return NextResponse.json({ id: lead.id });
}
