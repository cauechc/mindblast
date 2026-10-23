import { Download, LogOut } from "lucide-react";
import { Logo, WhatsAppIcon } from "@/components/icons";
import { cities, serviceName, services } from "@/config/site";
import { requireAdmin } from "@/lib/admin-auth";
import { leadStatuses, listLeads, type LeadStatus } from "@/lib/store";
import { formatPhone, platformToLeadUrl } from "@/lib/whatsapp";
import { logout, setLeadStatus } from "./actions";

export const dynamic = "force-dynamic";

const statusLabel: Record<LeadStatus, string> = {
  novo: "Novo",
  em_contato: "Em contato",
  encaminhado: "Encaminhado ao parceiro",
  fechado: "Fechado",
  perdido: "Perdido",
};

const dateTime = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(new Date(iso));

export default async function AdminPage() {
  await requireAdmin();
  const leads = await listLeads();

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const thisMonth = leads.filter((l) => new Date(l.createdAt) >= monthStart);

  const stats = [
    { label: "Leads no mês", value: thisMonth.length },
    { label: "Novos (sem contato)", value: leads.filter((l) => l.status === "novo").length },
    ...services.map((s) => ({ label: s.name, value: leads.filter((l) => l.service === s.id).length })),
  ];
  const byCity = cities.map((c) => ({ city: c, n: leads.filter((l) => l.city === c).length }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-5 text-sm font-semibold">
          <a href="/admin/leads.csv" className="inline-flex items-center gap-1.5 text-navy-900 hover:text-leaf">
            <Download className="h-4 w-4" aria-hidden /> Exportar CSV
          </a>
          <form action={logout}>
            <button className="inline-flex items-center gap-1.5 text-muted hover:text-navy-900">
              <LogOut className="h-4 w-4" aria-hidden /> Sair
            </button>
          </form>
        </div>
      </header>

      <h1 className="mt-10 text-3xl font-extrabold text-navy-900">Leads</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-5 shadow-card">
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-navy-900">{s.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">
        Por cidade: {byCity.map((c) => `${c.city} ${c.n}`).join(" · ")}
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-card">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead className="bg-navy-900 text-xs uppercase tracking-wider text-white">
            <tr>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Serviço · Cidade</th>
              <th className="px-4 py-3">Necessidade</th>
              <th className="px-4 py-3">Status e notas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted">Nenhum pedido de orçamento ainda.</td>
              </tr>
            )}
            {leads.map((l) => (
              <tr key={l.id} className="align-top">
                <td className="px-4 py-4 text-muted">
                  <p className="font-mono text-navy-900">{l.id}</p>
                  {dateTime(l.createdAt)}
                  {l.source && <p className="mt-1 text-xs">{Object.values(l.source).join(" · ")}</p>}
                </td>
                <td className="px-4 py-4">
                  <p className="font-bold text-navy-900">{l.name}</p>
                  <a href={platformToLeadUrl(l)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1.5 font-semibold text-leaf-600 hover:underline">
                    <WhatsAppIcon className="h-4 w-4" />
                    {formatPhone(l.whatsapp)}
                  </a>
                </td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-navy-900">{serviceName(l.service)}</p>
                  <p className="text-muted">{l.city}</p>
                </td>
                <td className="max-w-sm whitespace-pre-line px-4 py-4 text-muted">{l.description || "—"}</td>
                <td className="px-4 py-4">
                  <form action={setLeadStatus.bind(null, l.id)} className="flex flex-col gap-2">
                    <select name="status" defaultValue={l.status} className="rounded-lg border border-navy-100 px-2 py-1.5">
                      {leadStatuses.map((s) => (
                        <option key={s} value={s}>
                          {statusLabel[s]}
                        </option>
                      ))}
                    </select>
                    <textarea name="notes" defaultValue={l.notes} rows={2} placeholder="Notas internas" className="rounded-lg border border-navy-100 px-2 py-1.5" />
                    <button className="self-start rounded-lg bg-navy-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-navy-700">Salvar</button>
                  </form>
                  {l.crm && !l.crm.ok && <p className="mt-2 text-xs text-red-600">CRM falhou: {l.crm.error}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
