"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, CreditCard, Loader2, QrCode } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";
import { formatMoney, type Currency } from "@/lib/pricing";
import { toast } from "../Toaster";
import { buttonStyles, WhatsAppButton } from "../ui";

type PixResult = { mode: "dynamic" | "static"; payload: string; qr: string; amount: number; expiresAt?: string };

function Countdown({ until, label, onExpire }: { until: string; label: string; onExpire: () => void }) {
  const [left, setLeft] = useState(() => new Date(until).getTime() - Date.now());
  useEffect(() => {
    const t = setInterval(() => {
      const ms = new Date(until).getTime() - Date.now();
      setLeft(ms);
      if (ms <= 0) {
        clearInterval(t);
        onExpire();
      }
    }, 1000);
    return () => clearInterval(t);
  }, [until, onExpire]);
  const s = Math.max(0, Math.floor(left / 1000));
  return (
    <p className="text-sm text-soft">
      {label} <span className="font-mono text-ice">{String(Math.floor(s / 60)).padStart(2, "0")}:{String(s % 60).padStart(2, "0")}</span>
    </p>
  );
}

export function PayButtons({
  orderId,
  locale,
  currency,
  t,
  receiptUrl,
}: {
  orderId: string;
  locale: Locale;
  currency: Currency;
  t: Dictionary;
  receiptUrl: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState<PixResult | null>(null);
  const [expired, setExpired] = useState(false);
  const method = currency === "BRL" ? "pix" : "stripe";

  // Pix dinâmico: consulta o status até o webhook confirmar.
  useEffect(() => {
    if (pix?.mode !== "dynamic" || expired) return;
    const timer = setInterval(async () => {
      const res = await fetch(`/api/orders/${orderId}/status`, { cache: "no-store" }).catch(() => null);
      const data = res?.ok ? await res.json() : null;
      if (data && data.paymentStatus !== "awaiting_payment") {
        clearInterval(timer);
        router.push(`/${locale}/sucesso/${orderId}`);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [pix, expired, orderId, locale, router]);

  async function pay() {
    setLoading(true);
    setExpired(false);
    try {
      const res = await fetch(`/api/checkout/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      if (res.ok && data.payload) setPix(data);
      else toast(res.status === 503 ? t.checkout.notConfigured : t.order.sent.error, "error");
    } catch {
      toast(t.order.sent.error, "error");
    }
    setLoading(false);
  }

  async function copy() {
    if (!pix) return;
    try {
      await navigator.clipboard.writeText(pix.payload);
      toast(t.checkout.copied);
    } catch {
      toast(t.order.sent.error, "error");
    }
  }

  if (pix && !expired) {
    return (
      <div className="animate-fade-up space-y-5 text-center">
        <p className="text-sm text-soft">{t.checkout.scan}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pix.qr} alt="QR code Pix" width={240} height={240} className="mx-auto rounded-2xl bg-white p-3" />
        <p className="font-display text-3xl text-white">{formatMoney(pix.amount, "BRL")}</p>
        {pix.expiresAt && <Countdown until={pix.expiresAt} label={t.checkout.expiresIn} onExpire={() => setExpired(true)} />}
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-soft/80">{t.checkout.copyPaste}</p>
          <div className="mt-2 flex gap-2">
            <input readOnly value={pix.payload} onFocus={(e) => e.target.select()} aria-label={t.checkout.copyPaste} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-navy-950/60 px-3 py-2.5 font-mono text-xs text-soft" />
            <button type="button" onClick={copy} className={`${buttonStyles.primary} !px-4 !py-2.5`}>
              <Copy className="h-4 w-4" />
              {t.checkout.copy}
            </button>
          </div>
        </div>
        {pix.mode === "dynamic" ? (
          <p className="flex items-center justify-center gap-2 text-sm text-soft">
            <Loader2 className="h-4 w-4 animate-spin text-blast-400" /> {t.checkout.waiting}
          </p>
        ) : (
          <div className="rounded-2xl border border-white/10 p-4 text-sm text-soft">
            {t.checkout.staticNote}
            <WhatsAppButton href={receiptUrl} className="mt-3 w-full">{t.checkout.sendReceipt}</WhatsAppButton>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expired && <p className="text-center text-sm text-amber-200">{t.checkout.expired}</p>}
      <button type="button" onClick={pay} disabled={loading} className={`${buttonStyles.primary} w-full !py-4 text-base`}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : method === "pix" ? <QrCode className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
        {expired ? t.checkout.regenerate : method === "pix" ? t.checkout.pix : t.checkout.stripe}
      </button>
    </div>
  );
}
