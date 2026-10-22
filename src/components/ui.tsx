import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { WhatsAppIcon } from "./icons";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

export const buttonStyles = {
  primary: `${base} bg-blast text-white shadow-glow hover:bg-blast-400`,
  secondary: `${base} border border-soft/25 text-ice hover:border-blast hover:bg-blast/10`,
  whatsapp: `${base} bg-wa text-navy-950 hover:bg-[#3ee07c]`,
};

type LinkButtonProps = ComponentProps<typeof Link> & { variant?: keyof typeof buttonStyles };

export function LinkButton({ variant = "primary", className = "", ...props }: LinkButtonProps) {
  return <Link {...props} className={`${buttonStyles[variant]} ${className}`} />;
}

export function WhatsAppButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${buttonStyles.whatsapp} ${className}`}>
      <WhatsAppIcon className="h-4.5 w-4.5" />
      {children}
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blast-400">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-[1.05] text-white sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-soft sm:text-lg">{subtitle}</p>}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
