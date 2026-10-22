"use client";

import { useState } from "react";
import { CreditCard, Loader2, QrCode } from "lucide-react";
import type { Currency } from "@/lib/pricing";
import { toast } from "../Toaster";
import { buttonStyles } from "../ui";

export function PayButtons({
  orderId,
  currency,
  labels,
}: {
  orderId: string;
  currency: Currency;
  labels: { pix: string; stripe: string; notConfigured: string; error: string };
}) {
  const [loading, setLoading] = useState(false);
  const method = currency === "BRL" ? "pix" : "stripe";

  async function pay() {
    setLoading(true);
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
      toast(res.status === 503 ? labels.notConfigured : labels.error, "error");
    } catch {
      toast(labels.error, "error");
    }
    setLoading(false);
  }

  return (
    <button type="button" onClick={pay} disabled={loading} className={`${buttonStyles.primary} w-full !py-4 text-base`}>
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : method === "pix" ? <QrCode className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
      {method === "pix" ? labels.pix : labels.stripe}
    </button>
  );
}
