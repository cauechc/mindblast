import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 text-center sm:whitespace-nowrap rounded-xl px-6 py-3.5 text-base font-bold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]";

export const buttonStyles = {
  primary: `${base} bg-leaf text-white shadow-cta hover:bg-leaf-600`,
  outline: `${base} border-2 border-navy-900/15 text-navy-900 hover:border-leaf hover:text-leaf-600`,
  light: `${base} border border-white/25 text-white hover:bg-white/10`,
};

type LinkButtonProps = ComponentProps<typeof Link> & { variant?: keyof typeof buttonStyles };

export function LinkButton({ variant = "primary", className = "", ...props }: LinkButtonProps) {
  return <Link {...props} className={`${buttonStyles[variant]} ${className}`} />;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, subtitle, light = false }: { eyebrow: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? "text-white" : "text-navy-900"}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-lg ${light ? "text-navy-100" : "text-muted"}`}>{subtitle}</p>}
    </div>
  );
}
