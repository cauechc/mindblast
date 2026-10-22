import Image from "next/image";
import { Camera } from "lucide-react";

/**
 * Foto real ou espaço marcado para o dono substituir.
 * Passe `src` (arquivo em /public) quando tiver a foto; sem `src`, mostra o espaço reservado.
 */
export function PhotoSlot({
  src,
  alt,
  label,
  credit,
  className = "",
  priority = false,
}: {
  src?: string;
  alt: string;
  label: string;
  credit?: string;
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <figure className={`group relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
        {credit && <figcaption className="absolute right-2 bottom-2 rounded bg-black/50 px-2 py-0.5 text-[10px] text-white/80">{credit}</figcaption>}
      </figure>
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden bg-[radial-gradient(120%_80%_at_20%_10%,#22306b_0%,#0E1638_45%,#070B1F_100%)] ${className}`}
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-3 rounded-[inherit] border border-dashed border-soft/20" />
      <div className="absolute bottom-4 left-4 right-4 flex items-start gap-2 text-xs text-soft/80">
        <Camera className="mt-0.5 h-4 w-4 shrink-0 text-blast-400" aria-hidden />
        <span>
          <span className="font-semibold uppercase tracking-wider text-soft">{label}</span>
          <span className="block text-soft/70">{alt}</span>
        </span>
      </div>
    </div>
  );
}
