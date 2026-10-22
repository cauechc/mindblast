import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { Container, LinkButton, WhatsAppButton } from "@/components/ui";
import { whatsappUrl } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n";
import { formatMoney } from "@/lib/pricing";
import { getOrder } from "@/lib/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false } };

export default async function SuccessPage({ params }: { params: Promise<{ locale: Locale; id: string }> }) {
  const { locale, id } = await params;
  const t = getDictionary(locale);
  const order = await getOrder(id);
  if (!order) notFound();
  const c = order.quote.currency;
  // Só mostra "confirmado" depois que o webhook do provedor marcou o pedido como pago.
  const confirmed = order.paymentStatus === "paid" || order.paymentStatus === "deposit_paid";
  const paid = (order.payments ?? []).reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="pb-24 pt-28 sm:pt-36">
      {!confirmed && <meta httpEquiv="refresh" content="5" />}
      <Container className="max-w-xl text-center">
        <span className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${confirmed ? "bg-wa/15 text-wa" : "bg-blast/15 text-blast-400"}`}>
          {confirmed ? <Check className="h-8 w-8" strokeWidth={3} /> : <Loader2 className="h-8 w-8 animate-spin" />}
        </span>
        <h1 className="mt-6 font-display text-4xl text-white sm:text-5xl">{confirmed ? t.success.title : t.checkout.waiting}</h1>
        {!confirmed && <p className="mt-3 text-soft">{t.success.pending}</p>}
        <dl className="mx-auto mt-10 max-w-sm space-y-2.5 rounded-3xl border border-white/8 bg-navy-800 p-6 text-left text-sm">
          <div className="flex justify-between"><dt className="text-soft">{t.success.order}</dt><dd className="font-mono text-white">{order.id}</dd></div>
          <div className="flex justify-between"><dt className="text-soft">{t.success.service}</dt><dd className="text-white">{t.services.items[order.selection.service].title}</dd></div>
          {confirmed && <div className="flex justify-between"><dt className="text-soft">{t.success.paid}</dt><dd className="text-white">{formatMoney(paid, c)}</dd></div>}
          {confirmed && order.quote.dueLater > 0 && (
            <div className="flex justify-between"><dt className="text-soft">{t.success.remaining}</dt><dd className="text-soft">{formatMoney(order.quote.dueLater, c)}</dd></div>
          )}
        </dl>
        {confirmed && (
          <>
            <h2 className="mt-10 font-semibold text-white">{t.success.next}</h2>
            <ol className="mx-auto mt-4 max-w-sm space-y-2 text-left text-sm text-soft">
              {t.success.steps.map((s, i) => (
                <li key={s} className="flex gap-3"><span className="font-display text-blast-400">{i + 1}</span>{s}</li>
              ))}
            </ol>
          </>
        )}
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          {confirmed && <LinkButton href={`/${locale}/meu-projeto`}>{t.success.upload}</LinkButton>}
          <WhatsAppButton href={whatsappUrl(`${t.wa.generic} (${t.success.order} ${order.id})`)}>{t.common.whatsapp}</WhatsAppButton>
        </div>
      </Container>
    </div>
  );
}
