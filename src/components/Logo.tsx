type Props = { className?: string; subtitle?: boolean };

/** MIND (branco) + BLAST (azul elétrico) com cursor clicando e arcos elétricos. */
export function Logo({ className = "", subtitle = true }: Props) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="relative inline-flex items-baseline font-display text-[1.35em] tracking-tight">
        <span className="text-white">MIND</span>
        <span className="text-blast">BLAST</span>
        <svg
          viewBox="0 0 32 32"
          aria-hidden
          className="absolute -right-[0.85em] -bottom-[0.35em] h-[0.95em] w-[0.95em]"
        >
          <g stroke="#2F8CFF" strokeWidth="2" strokeLinecap="round" fill="none" className="animate-spark">
            <path d="M8 6 L6 2" />
            <path d="M4 10 L1 9" />
            <path d="M13 5 L14 1" />
            <path d="M3 4 l2 1 -1 1 2 1" />
          </g>
          <path
            d="M8 8 L8 28 L13 23 L17 31 L20.5 29.5 L16.5 21.5 L23 21.5 Z"
            fill="#E8F4FF"
            stroke="#070B1F"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {subtitle && (
        <span className="mt-1 text-[0.42em] font-semibold tracking-[0.42em] text-soft">CRIAÇÃO DE SITES</span>
      )}
    </span>
  );
}
