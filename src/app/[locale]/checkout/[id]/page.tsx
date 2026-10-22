import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PayButtons } from "@/components/order/PayButtons";
import { Container, WhatsAppButton } from "@/components/ui";
import { whatsappUrl } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n";
import { formatMoney } from "@/lib/pricing";
import { getOrder } from "@/lib/store";
import { orderMessage } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false } };

export default async function CheckoutPage({ params }: { params: Promise<{ locale: Locale; id: string }> }) {
  const { locale, id } = await params;
  const t = getDictionary(locale);
  const order = await getOrder(id);
  if (!order || order.quote.requiresQuote) notFound();
  if (order.paymentStatus !== "awaiting_payment") redirect(`/${locale}/sucesso/${order.id}`);
  const { quote } = order;
  const c = quote.currency;

  return (
    <div className="pb-24 pt-28 sm:pt-36">
      <Container className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blast-400">
          {t.checkout.order} {order.id}
        </p>
        <h1 className="mt-2 font-display text-4xl text-white">{t.checkout.title}</h1>
        <div className="mt-8 rounded-3xl border border-white/8 bg-navy-800 p-6 shadow-card sm:p-8">
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-soft">{t.order.summary.service}</dt>
              <dd className="text-white">{t.services.items[order.selection.service].title}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-soft">{t.order.summary.total}</dt>
              <dd className="text-white">{formatMoney(quote.total, c)}</dd>
            </div>
            {quote.dueLater > 0 && (
              <div className="flex justify-between">
                <dt className="text-soft">{t.order.summary.dueLater}</dt>
                <dd className="text-soft">{formatMoney(quote.dueLater, c)}</dd>
              </div>
            )}
          </dl>
          <div className="mt-6 flex items-end justify-between rounded-2xl bg-navy-950/60 p-5">
            <span className="text-soft">{t.order.summary.dueNow}</span>
            <span className="font-display text-4xl text-white">{formatMoney(quote.dueNow, c)}</span>
          </div>
          <div className="mt-6">
            <PayButtons
              orderId={order.id}
              locale={locale}
              currency={c}
              t={t}
              receiptUrl={whatsappUrl(`${t.checkout.sendReceipt}: ${t.checkout.order} ${order.id} (${formatMoney(quote.dueNow, c)})`)}
            />
          </div>
          <div className="mt-6 border-t border-white/8 pt-6 text-center">
            <p className="text-sm text-soft">{t.checkout.alternative}</p>
            <WhatsAppButton href={whatsappUrl(orderMessage(t, order.selection))} className="mt-3 w-full">
              {t.common.negotiate}
            </WhatsAppButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
