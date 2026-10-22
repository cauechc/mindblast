import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { buttonStyles, WhatsAppButton } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { requireAdmin } from "@/lib/admin-auth";
import { clientWhatsapp, dateTime, orderStatusLabel, paymentLink, paymentStatusLabel } from "@/lib/admin-format";
import { formatMoney } from "@/lib/pricing";
import { getOrder, type OrderStatus } from "@/lib/store";
import { orderMessage } from "@/lib/whatsapp";
import { markPaid, requestBalance, setCustomQuote, updateProject } from "../../actions";

export const dynamic = "force-dynamic";

const input = "mt-1.5 w-full rounded-xl border border-white/10 bg-navy-950/60 px-4 py-2.5 text-ice outline-none focus:border-blast";
const card = "rounded-2xl border border-white/8 bg-navy-800/60 p-6";

export default async function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();
  const t = getDictionary(order.locale);
  const c = order.quote.currency;
  const pay = paymentStatusLabel[order.paymentStatus];
  const link = paymentLink(order);
  const pt = order.locale === "pt";
  const c2 = order.customer;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-soft hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Pedidos
      </Link>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="font-mono text-2xl text-white">{order.id}</h1>
        <span className={`rounded-full px-2.5 py-1 text-xs ${pay.tone}`}>{pay.label}</span>
        <span className="text-sm text-soft">{dateTime(order.createdAt)} · {order.locale.toUpperCase()} · {c}</span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className={card}>
          <h2 className="font-semibold text-white">Cliente</h2>
          <dl className="mt-4 space-y-1.5 text-sm">
            {[
              ["Nome", c2.name],
              ["Empresa", c2.company],
              ["WhatsApp", c2.whatsapp],
              ["E-mail", c2.email],
              ["Ramo", c2.industry],
              ["Cidade", c2.city],
              ["Instagram", c2.instagram || "-"],
              ["Tem logo", c2.hasLogo ? "Sim" : "Não"],
              ["Tem domínio", c2.hasDomain ? "Sim" : "Não"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-soft">{k}</dt>
                <dd className="text-right text-ice">{v}</dd>
              </div>
            ))}
          </dl>
          {c2.needs && <p className="mt-4 whitespace-pre-wrap rounded-xl bg-navy-950/60 p-3 text-sm text-ice"><span className="text-soft">Necessidade: </span>{c2.needs}</p>}
          {c2.notes && <p className="mt-3 whitespace-pre-wrap rounded-xl bg-navy-950/60 p-3 text-sm text-ice"><span className="text-soft">Observações: </span>{c2.notes}</p>}
          <WhatsAppButton href={clientWhatsapp(c2.whatsapp, pt ? `Olá, ${c2.name}! Aqui é da Mind Blast, sobre o pedido ${order.id}.` : `Hi ${c2.name}! This is Mind Blast about order ${order.id}.`)} className="mt-5 w-full">
            Chamar cliente no WhatsApp
          </WhatsAppButton>
        </section>

        <section className={card}>
          <h2 className="font-semibold text-white">Pedido</h2>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-sm text-ice">{orderMessage(t, order.selection).split("\n").filter((l) => l.startsWith("•")).join("\n")}</pre>
          {order.customQuote && (
            <p className="mt-3 rounded-xl bg-blast/10 p-3 text-sm text-ice">
              Orçamento: <strong>{formatMoney(order.customQuote.amount, c)}</strong>
              {order.customQuote.description && <span className="mt-1 block whitespace-pre-wrap text-soft">{order.customQuote.description}</span>}
            </p>
          )}
          {!order.quote.requiresQuote && (
            <dl className="mt-4 space-y-1.5 border-t border-white/8 pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-soft">Total</dt><dd className="text-white">{formatMoney(order.quote.total, c)}</dd></div>
              <div className="flex justify-between"><dt className="text-soft">Cobrança atual</dt><dd className="text-white">{formatMoney(order.quote.dueNow, c)}</dd></div>
              {order.quote.dueLater > 0 && <div className="flex justify-between"><dt className="text-soft">Restante na entrega</dt><dd className="text-soft">{formatMoney(order.quote.dueLater, c)}</dd></div>}
            </dl>
          )}
          <h3 className="mt-5 text-sm font-semibold text-white">Pagamentos</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {(order.payments ?? []).length === 0 && <li className="text-soft">Nenhum ainda.</li>}
            {(order.payments ?? []).map((p) => (
              <li key={p.id} className="flex justify-between text-ice">
                <span>{dateTime(p.at)} · {p.provider === "manual" ? "manual" : p.provider === "mercadopago" ? "Pix (Mercado Pago)" : "Stripe"}</span>
                <span>{formatMoney(p.amount, c)}</span>
              </li>
            ))}
          </ul>

          {order.paymentStatus === "awaiting_payment" && (
            <div className="mt-5 space-y-3 rounded-xl border border-white/10 p-4 text-sm">
              <p className="text-soft">Link de pagamento ({formatMoney(order.quote.dueNow, c)}):</p>
              <input readOnly value={link} className={`${input} font-mono text-xs`} />
              <WhatsAppButton href={clientWhatsapp(c2.whatsapp, pt ? `Olá, ${c2.name}! Segue o link para pagamento do pedido ${order.id} (${formatMoney(order.quote.dueNow, c)}): ${link}` : `Hi ${c2.name}! Here's the payment link for order ${order.id} (${formatMoney(order.quote.dueNow, c)}): ${link}`)} className="w-full">
                Enviar link no WhatsApp
              </WhatsAppButton>
              <form action={markPaid.bind(null, order.id)}>
                <button className={`${buttonStyles.secondary} w-full`}>Confirmar pagamento recebido (manual)</button>
              </form>
              <p className="text-xs text-soft/80">Use a confirmação manual só depois de ver o dinheiro no extrato (ex.: Pix pela chave).</p>
            </div>
          )}
          {order.paymentStatus === "deposit_paid" && order.quote.dueLater > 0 && (
            <form action={requestBalance.bind(null, order.id)} className="mt-5">
              <button className={`${buttonStyles.primary} w-full`}>Cobrar restante ({formatMoney(order.quote.dueLater, c)})</button>
            </form>
          )}
        </section>

        {(order.paymentStatus === "quote_requested" || (order.paymentStatus === "awaiting_payment" && order.customQuote)) && (
          <section className={`${card} lg:col-span-2`}>
            <h2 className="font-semibold text-white">Enviar orçamento</h2>
            <p className="mt-1 text-sm text-soft">O cliente recebe o valor por e-mail com o link de pagamento ({c === "BRL" ? "Pix" : "Stripe"}).</p>
            <form action={setCustomQuote.bind(null, order.id)} className="mt-4 grid gap-4 sm:grid-cols-[200px_1fr_auto] sm:items-end">
              <label className="text-sm text-soft">
                Valor ({c === "BRL" ? "R$" : "US$"})
                <input name="amount" required inputMode="decimal" placeholder="1.500,00" defaultValue={order.customQuote ? (order.customQuote.amount / 100).toFixed(2).replace(".", ",") : ""} className={input} />
              </label>
              <label className="text-sm text-soft">
                Descrição
                <input name="description" placeholder="Ex.: app de agendamento com área do cliente" defaultValue={order.customQuote?.description} className={input} />
              </label>
              <button className={buttonStyles.primary}>{order.customQuote ? "Atualizar" : "Gerar link de pagamento"}</button>
            </form>
          </section>
        )}

        <section className={`${card} lg:col-span-2`}>
          <h2 className="font-semibold text-white">Projeto</h2>
          <form action={updateProject.bind(null, order.id)} className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-soft">
              Status
              <select name="status" defaultValue={order.status} className={input}>
                {(Object.keys(orderStatusLabel) as OrderStatus[]).map((s) => (
                  <option key={s} value={s}>{orderStatusLabel[s]}</option>
                ))}
              </select>
            </label>
            <label className="text-sm text-soft">
              Link da prévia (o cliente recebe por e-mail)
              <input name="previewUrl" type="url" placeholder="https://" defaultValue={order.previewUrl} className={input} />
            </label>
            <label className="text-sm text-soft sm:col-span-2">
              Anotações internas
              <textarea name="adminNotes" rows={3} defaultValue={order.adminNotes} className={input} />
            </label>
            <div className="sm:col-span-2">
              <button className={buttonStyles.primary}>Salvar</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
