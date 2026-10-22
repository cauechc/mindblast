import type { Metadata } from "next";
import { OrderBuilder } from "@/components/order/OrderBuilder";
import { Container } from "@/components/ui";
import type { PlanId, ServiceId } from "@/config/pricing";
import { getDictionary, type Locale } from "@/i18n";

const serviceIds: ServiceId[] = ["landing", "institucional", "app"];
const planIds: PlanId[] = ["essencial", "profissional", "premium"];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDictionary(locale).order.title, alternates: { canonical: `/${locale}/pedido` } };
}

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ servico?: string; plano?: string }>;
}) {
  const { locale } = await params;
  const { servico, plano } = await searchParams;
  const t = getDictionary(locale);
  const service = serviceIds.find((s) => s === servico) ?? "landing";
  const plan = planIds.find((p) => p === plano) ?? null;

  return (
    <div className="relative overflow-x-clip pb-32 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-blast/10 blur-[120px]" />
      <Container className="relative">
        <h1 className="font-display text-4xl text-white sm:text-6xl">{t.order.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-soft">{t.order.subtitle}</p>
        <div className="mt-12">
          <OrderBuilder key={`${service}-${plan}`} locale={locale} t={t} initialService={service} initialPlan={plan} />
        </div>
      </Container>
    </div>
  );
}
