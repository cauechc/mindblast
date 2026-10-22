import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";
import { Container } from "./ui";

type Doc = { title: string; updated: string; sections: { h: string; p: string[] }[] };

export function LegalPage({ doc, locale }: { doc: Doc; locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <div className="pb-24 pt-28 sm:pt-36">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl text-white sm:text-5xl">{doc.title}</h1>
        <p className="mt-3 text-sm text-soft">{doc.updated}</p>
        <p className="mt-6 rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">{t.legal.placeholderNotice}</p>
        <div className="mt-10 space-y-8">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-lg font-semibold text-white">{s.h}</h2>
              {s.p.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-soft">{p}</p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
