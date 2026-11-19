type P = { className?: string };

export function WhatsAppIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

/** Arco elétrico fino, detalhe da marca. */
export function Arc({ className = "" }: P) {
  return (
    <svg viewBox="0 0 120 24" fill="none" aria-hidden className={className}>
      <path d="M0 12 L22 12 L30 4 L40 20 L50 6 L58 16 L66 12 L120 12" stroke="url(#arc)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <defs>
        <linearGradient id="arc" x1="0" x2="120" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2F8CFF" stopOpacity="0" />
          <stop offset="0.45" stopColor="#5AA4FF" />
          <stop offset="1" stopColor="#2F8CFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Ícone oficial: cursor clicando com 3 faíscas azuis. `boxed` põe o fundo quadrado escuro (favicon, foto de perfil). */
export function BrandIcon({ className = "h-8 w-8", boxed = false }: { className?: string; boxed?: boolean }) {
  return (
    <svg viewBox="0 0 300 300" aria-hidden className={className}>
      {boxed && <rect width="300" height="300" rx="70" fill="#070B1F" />}
      <g stroke="#2F8CFF" strokeWidth="18" strokeLinecap="round">
        <path d="M49 106 L84 116" className="animate-spark" />
        <path d="M93 56 L109 89" className="animate-spark [animation-delay:300ms]" />
        <path d="M151 46 L144 80" className="animate-spark [animation-delay:600ms]" />
      </g>
      <path d="M110 107 L110 238 L144 210 L170 260 L198 246 L176 198 L218 195 Z" fill="#E8F4FF" stroke="#E8F4FF" strokeWidth="6" strokeLinejoin="round" />
    </svg>
  );
}

/** Logo oficial: ícone + MIND (branco) BLAST (azul) + SOLUÇÕES DIGITAIS. */
export function Logo({ className = "", subtitle = true }: { className?: string; subtitle?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-[0.45em] leading-none ${className}`}>
      <BrandIcon className="h-[2.1em] w-[2.1em] shrink-0" />
      <span className="inline-flex flex-col">
        <span className="font-display text-[1.35em] tracking-[-0.04em]">
          <span className="text-white">MIND</span>
          <span className="text-blast">BLAST</span>
        </span>
        {subtitle && <span className="mt-[0.35em] text-[0.42em] font-semibold tracking-[0.42em] text-soft">SOLUÇÕES DIGITAIS</span>}
      </span>
    </span>
  );
}
