import type { Metadata } from "next";
import { Container, WhatsAppButton } from "@/components/ui";
import { whatsappUrl } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n";

export const metadata: Metadata = { title: "Meu Projeto", robots: { index: false } };

const stages = {
  pt: ["Pedido recebido", "Em criação", "Prévia enviada", "Ajustes", "Publicado"],
  en: ["Order received", "In progress", "Preview sent", "Revisions", "Published"],
};

const copy = {
  pt: { title: "Meu Projeto", text: "Em breve você vai acompanhar seu projeto aqui: status, prévia, envio de materiais, pedidos de ajuste e pagamentos. Por enquanto, fale com a gente pelo WhatsApp." },
  en: { title: "My Project", text: "Soon you'll follow your project here: status, preview, file uploads, revision requests and payments. For now, message us on WhatsApp." },
};

export default async function ClientArea({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <div className="pb-24 pt-28 sm:pt-36">
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl text-white sm:text-5xl">{copy[locale].title}</h1>
        <p className="mt-4 text-lg text-soft">{copy[locale].text}</p>
        <ol className="mt-10 grid gap-2 sm:grid-cols-5" aria-hidden>
          {stages[locale].map((s, i) => (
            <li key={s} className="rounded-xl border border-white/8 bg-navy-800/60 p-3 text-center text-xs text-soft">
              <span className="block font-display text-lg text-blast-400">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <WhatsAppButton href={whatsappUrl(t.wa.generic)} className="mt-10">
          {t.common.whatsapp}
        </WhatsAppButton>
      </Container>
    </div>
  );
}
