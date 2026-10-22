import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

const control =
  "mt-1.5 w-full rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3 text-ice placeholder:text-soft/40 outline-none transition focus:border-blast focus:ring-2 focus:ring-blast/30 aria-[invalid=true]:border-red-400";

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-medium text-soft">
      {label}
      {children}
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}

export function Input({ label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <Field label={label} error={error}>
      <input {...props} aria-invalid={!!error} className={control} />
    </Field>
  );
}

export function Textarea({ label, error, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }) {
  return (
    <Field label={label} error={error}>
      <textarea rows={4} {...props} aria-invalid={!!error} className={`${control} resize-y`} />
    </Field>
  );
}

export function YesNo({
  name,
  label,
  value,
  onChange,
  yes,
  no,
}: {
  name: string;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  yes: string;
  no: string;
}) {
  return (
    <fieldset className="text-sm font-medium text-soft">
      <legend>{label}</legend>
      <div className="mt-1.5 grid grid-cols-2 gap-2">
        {[true, false].map((v) => (
          <label
            key={String(v)}
            className={`cursor-pointer rounded-xl border px-4 py-3 text-center transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blast ${value === v ? "border-blast bg-blast/15 text-white" : "border-white/10 text-soft hover:border-white/25"}`}
          >
            <input type="radio" name={name} className="sr-only" checked={value === v} onChange={() => onChange(v)} />
            {v ? yes : no}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function StepCard({ n, title, label, children }: { n: number; title: string; label: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`step-${n}`} className="rounded-3xl border border-white/8 bg-navy-800/60 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blast-400">
        {label} {n}
      </p>
      <h2 id={`step-${n}`} className="mt-1 font-display text-xl text-white sm:text-2xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
