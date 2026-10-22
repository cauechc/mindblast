import Link from "next/link";
import { Logo } from "@/components/Logo";
import { requireAdmin } from "@/lib/admin-auth";
import { dateTime, orderStatusLabel, paymentStatusLabel } from "@/lib/admin-format";
import { formatMoney } from "@/lib/pricing";
import { listLeads, listOrders } from "@/lib/store";
import { getDictionary } from "@/i18n";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

const t = getDictionary("pt");

export default async function AdminPage() {
  await requireAdmin();
  const [orders, leads] = await Promise.all([listOrders(), listLeads()]);

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const thisMonth = (iso: string) => new Date(iso) >= monthStart;
  const revenueBRL = orders
    .flatMap((o) => (o.quote.currency === "BRL" ? (o.payments ?? []) : []))
    .filter((p) => thisMonth(p.at))
    .reduce((s, p) => s + p.amount, 0);

  // Números de exemplo só em desenvolvimento, enquanto não há pedidos.
  const sample = process.env.NODE_ENV === "development" && orders.length === 0;
  const stats = [
    { label: "Pedidos no mês", value: sample ? "12" : String(orders.filter((o) => thisMonth(o.createdAt)).length) },
    { label: "Faturamento do mês", value: sample ? "R$ 6.450" : formatMoney(revenueBRL, "BRL") },
    { label: "Prévias solicitadas", value: sample ? "27" : String(leads.filter((l) => thisMonth(l.createdAt)).length) },
    {
      label: "Projetos em andamento",
      value: sample ? "5" : String(orders.filter((o) => o.paymentStatus !== "quote_requested" && o.payments?.length && o.status !== "published").length),
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="flex items-center justify-between">
        <Logo className="text-base" />
        <form action={logout}>
          <button className="text-sm text-soft hover:text-white">Sair</button>
        </form>
      </header>

      <section className="mt-10">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-3xl text-white">Painel</h1>
          {sample && <span className="rounded-full bg-amber-300/15 px-2.5 py-0.5 text-xs text-amber-200">dados de exemplo</span>}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/8 bg-navy-800/60 p-5">
              <p className="text-sm text-soft">{s.label}</p>
              <p className="mt-2 font-display text-2xl text-white sm:text-3xl">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl text-white">Pedidos</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-navy-800 text-xs uppercase tracking-wider text-soft">
              <tr>
                <th className="px-4 py-3">Pedido</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Serviço</th>
                <th className="px-4 py-3">Valor</th>
                <th className="px-4 py-3">Projeto</th>
                <th className="px-4 py-3">Pagamento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-soft">Nenhum pedido ainda.</td>
                </tr>
              )}
              {orders.map((o) => {
                const pay = paymentStatusLabel[o.paymentStatus];
                return (
                  <tr key={o.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <Link href={`/admin/pedidos/${o.id}`} className="font-mono text-blast-400 hover:underline">{o.id}</Link>
                      <p className="text-xs text-soft">{dateTime(o.createdAt)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white">{o.customer.name}</p>
                      <p className="text-xs text-soft">{o.customer.company} · {o.customer.city}</p>
                    </td>
                    <td className="px-4 py-3 text-ice">
                      {t.services.items[o.selection.service].title}
                      {o.selection.plan && <span className="text-soft"> · {t.pricing.plans[o.selection.plan].name}</span>}
                    </td>
                    <td className="px-4 py-3 text-ice">{o.quote.requiresQuote ? "Sob consulta" : formatMoney(o.quote.total, o.quote.currency)}</td>
                    <td className="px-4 py-3 text-soft">{orderStatusLabel[o.status]}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs ${pay.tone}`}>{pay.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl text-white">Prévias grátis</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-navy-800 text-xs uppercase tracking-wider text-soft">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">Ramo · Cidade</th>
                <th className="px-4 py-3">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-soft">Nenhum pedido de prévia ainda.</td>
                </tr>
              )}
              {leads.map((l) => (
                <tr key={l.id}>
                  <td className="px-4 py-3 text-soft">{dateTime(l.createdAt)}</td>
                  <td className="px-4 py-3 text-white">{l.name}</td>
                  <td className="px-4 py-3 text-ice">{l.whatsapp}</td>
                  <td className="px-4 py-3 text-soft">{l.industry} · {l.city}</td>
                  <td className="max-w-56 truncate px-4 py-3">
                    <a href={/^https?:\/\//.test(l.link) ? l.link : `https://${l.link}`} target="_blank" rel="noopener noreferrer nofollow" className="text-blast-400 hover:underline">
                      {l.link}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
