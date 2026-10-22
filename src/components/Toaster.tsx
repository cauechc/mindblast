"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

type Toast = { id: number; message: string; kind: "success" | "error" };

/** Dispara um aviso a partir de qualquer componente do cliente. */
export function toast(message: string, kind: Toast["kind"] = "success") {
  window.dispatchEvent(new CustomEvent("mb-toast", { detail: { message, kind } }));
}

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);
  useEffect(() => {
    const onToast = (e: Event) => {
      const { message, kind } = (e as CustomEvent<Omit<Toast, "id">>).detail;
      const id = Date.now() + Math.random();
      setItems((list) => [...list, { id, message, kind }]);
      setTimeout(() => setItems((list) => list.filter((t) => t.id !== id)), 5000);
    };
    window.addEventListener("mb-toast", onToast);
    return () => window.removeEventListener("mb-toast", onToast);
  }, []);
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-3 top-20 z-[60] flex flex-col items-center gap-2 sm:left-auto sm:right-5 sm:items-end">
      {items.map((t) => (
        <div key={t.id} className="pointer-events-auto flex max-w-sm animate-fade-up items-start gap-3 rounded-xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-ice shadow-card">
          {t.kind === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0 text-wa" /> : <XCircle className="h-5 w-5 shrink-0 text-red-400" />}
          {t.message}
        </div>
      ))}
    </div>
  );
}
