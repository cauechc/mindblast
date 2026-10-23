/**
 * Google Analytics 4. Só carrega com NEXT_PUBLIC_GA_ID definido e depois que a pessoa aceita os cookies.
 */
export const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const CONSENT_KEY = "cn-cookie-consent";

type Gtag = (...args: unknown[]) => void;

/** Envia um evento (ex.: generate_lead). Não faz nada sem GA carregado. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const gtag = (globalThis as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}
