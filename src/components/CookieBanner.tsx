"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/i18n";
import { buttonStyles } from "./ui";

const KEY = "mb-cookie-consent";

/** Aviso de cookies (LGPD). Guarda a escolha no navegador. */
export function CookieBanner({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(!localStorage.getItem(KEY));
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (value: "all" | "essential") => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ value, at: new Date().toISOString() }));
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div role="region" aria-label="Cookies" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl animate-fade-up rounded-2xl border border-white/10 bg-navy-800/95 p-5 shadow-card backdrop-blur sm:bottom-5 sm:right-24">
      <p className="text-sm text-soft">
        {t.cookies.text}{" "}
        <Link href={`/${locale}/privacidade`} className="text-ice underline underline-offset-2 hover:text-white">
          {t.cookies.policy}
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("all")} className={`${buttonStyles.primary} !py-2`}>
          {t.cookies.accept}
        </button>
        <button type="button" onClick={() => choose("essential")} className={`${buttonStyles.secondary} !py-2`}>
          {t.cookies.reject}
        </button>
      </div>
    </div>
  );
}
