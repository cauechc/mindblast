import { en } from "./en";
import { pt, type Dictionary } from "./pt";
import type { Currency } from "@/lib/pricing";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export function getDictionary(locale: Locale): Dictionary {
  return locale === "en" ? en : pt;
}

/** PT cobra em BRL (Pix); EN cobra em USD (Stripe). */
export const currencyFor = (locale: Locale): Currency => (locale === "en" ? "USD" : "BRL");

export const fill = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));

export type { Dictionary };
