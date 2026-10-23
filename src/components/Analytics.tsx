"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_KEY, gaId } from "@/lib/analytics";
import { buttonStyles } from "./ui";

type Consent = "all" | "essential" | null;

/**
 * Aviso de cookies (LGPD) + Google Analytics. O GA só é carregado depois do "Aceitar".
 * Sem NEXT_PUBLIC_GA_ID, nada aparece, porque o site não usa outros cookies.
 */
export function Analytics() {
  const [consent, setConsent] = useState<Consent | undefined>(undefined);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null") as { value: Consent } | null;
      setConsent(saved?.value ?? null);
    } catch {
      setConsent(null);
    }
  }, []);

  if (!gaId || consent === undefined) return null;

  const choose = (value: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, at: new Date().toISOString() }));
    } catch {}
    setConsent(value);
  };

  if (consent === "all") {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
        </Script>
      </>
    );
  }
  if (consent === "essential") return null;

  return (
    <div role="region" aria-label="Cookies" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-navy-100 sm:bottom-5 sm:right-24">
      <p className="text-sm text-muted">
        Usamos cookies de análise (Google Analytics) para entender como o site é usado e melhorar o atendimento. Você escolhe. Saiba mais na{" "}
        <Link href="/privacidade#cookies" className="font-semibold text-navy-900 underline underline-offset-2">
          Política de Privacidade
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("all")} className={`${buttonStyles.primary} !py-2 !text-sm`}>
          Aceitar
        </button>
        <button type="button" onClick={() => choose("essential")} className={`${buttonStyles.outline} !py-2 !text-sm`}>
          Só os necessários
        </button>
      </div>
    </div>
  );
}
