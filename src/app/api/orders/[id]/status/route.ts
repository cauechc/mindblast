import { NextResponse } from "next/server";
import { getOrder } from "@/lib/store";

/** Usado pelo checkout para saber quando o webhook confirmou o pagamento. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ paymentStatus: order.paymentStatus }, { headers: { "Cache-Control": "no-store" } });
}
