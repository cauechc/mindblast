import { useEffect, useRef, useState, type ReactNode } from "react";
import type { NeedId } from "@/config/site";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

export const buttonStyles = {
  primary: `${base} bg-blast text-white shadow-glow hover:bg-blast-400`,
  secondary: `${base} border border-soft/25 text-ice hover:border-blast hover:bg-blast/10`,
  whatsapp: `${base} bg-wa text-navy-950 hover:bg-[#3ee07c]`,
};

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, subtitle, center = false }: { eyebrow: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blast-400">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-[1.05] text-white sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-soft sm:text-lg">{subtitle}</p>}
    </div>
  );
}

/** Anima a entrada do conteúdo quando ele aparece na tela. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/**
 * Leva o visitante até o formulário de orçamento, já com o serviço marcado.
 * O formulário (QuoteForm) escuta este evento.
 */
export type QuotePreset = { needs?: NeedId[]; note?: string };
export function goToQuote(preset: QuotePreset = {}) {
  window.dispatchEvent(new CustomEvent<QuotePreset>("mb:quote", { detail: preset }));
  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
