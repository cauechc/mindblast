"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { fill, type Dictionary, type Locale } from "@/i18n";
import { Input } from "./order/fields";
import { toast } from "./Toaster";
import { buttonStyles } from "./ui";

export function PreviewForm({ locale, t, hours }: { locale: Locale; t: Dictionary; hours: number }) {
  const [form, setForm] = useState({ name: "", whatsapp: "", industry: "", city: "", link: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (res.ok) {
        setState("done");
        return;
      }
      const data = await res.json().catch(() => ({}));
      const map: Record<string, string> = {};
      for (const k of Object.keys(data.fields ?? {})) map[k] = k === "whatsapp" ? t.order.form.invalidPhone : t.order.form.required;
      setErrors(map);
      toast(t.order.sent.error, "error");
    } catch {
      toast(t.order.sent.error, "error");
    }
    setState("idle");
  }

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-white/8 bg-navy-800/60 p-10 text-center" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-wa/15 text-wa">
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>
        <p className="mt-6 text-lg text-ice">{fill(t.preview.success, { hours })}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl border border-white/8 bg-navy-800/60 p-6 sm:p-8">
      <Input label={t.order.form.name} required autoComplete="name" value={form.name} onChange={set("name")} error={errors.name} />
      <Input label={t.order.form.whatsapp} required type="tel" autoComplete="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={set("whatsapp")} error={errors.whatsapp} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label={t.order.form.industry} required value={form.industry} onChange={set("industry")} error={errors.industry} />
        <Input label={t.order.form.city} required value={form.city} onChange={set("city")} error={errors.city} />
      </div>
      <Input label={t.preview.link} required placeholder="instagram.com/… ou maps.app.goo.gl/…" value={form.link} onChange={set("link")} error={errors.link} />
      <button type="submit" disabled={state === "sending"} className={`${buttonStyles.primary} w-full !py-4 text-base`}>
        {state === "sending" && <Loader2 className="h-5 w-5 animate-spin" />}
        {t.preview.submit}
      </button>
    </form>
  );
}
