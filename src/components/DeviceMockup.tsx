import { MapPin, Star } from "lucide-react";
import { WhatsAppIcon } from "./icons";

export type MockSite = { accent: string; type: string; headline: string; city: string };

/** Uma maquete de site feita em código (texto real, nada de texto falso borrado). */
function MiniSite({ site, mobile = false }: { site: MockSite; mobile?: boolean }) {
  const { accent } = site;
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#0b0f1c] text-left text-white">
      <div className="flex items-center justify-between border-b border-white/5 px-[6%] py-[3%]">
        <span className="truncate text-[0.6em] font-bold tracking-wide" style={{ color: accent }}>
          {site.type.split(/[ /]/)[0].toUpperCase()}
        </span>
        {!mobile && (
          <span className="flex gap-[1.2em] text-[0.45em] text-white/60">
            <span>Serviços</span>
            <span>Galeria</span>
            <span>Contato</span>
          </span>
        )}
      </div>
      <div
        className="relative flex flex-1 flex-col justify-end px-[6%] pb-[6%]"
        style={{ background: `linear-gradient(160deg, ${accent}33 0%, transparent 55%), linear-gradient(0deg, #0b0f1c 0%, transparent 70%), #141a2e` }}
      >
        <p className="text-[0.45em] text-white/60 flex items-center gap-1">
          <MapPin className="h-[1.1em] w-[1.1em]" aria-hidden />
          {site.city}
        </p>
        <p className={`mt-[0.4em] font-display leading-[1.05] ${mobile ? "text-[0.95em]" : "text-[1.1em]"}`}>{site.headline}</p>
        <span className="mt-[0.8em] inline-flex w-fit items-center gap-[0.4em] rounded-full bg-wa px-[0.9em] py-[0.45em] text-[0.45em] font-bold text-[#062b14]">
          <WhatsAppIcon className="h-[1.2em] w-[1.2em]" />
          WhatsApp
        </span>
      </div>
      <div className={`grid gap-[3%] px-[6%] py-[4%] ${mobile ? "grid-cols-2" : "grid-cols-3"}`}>
        {[0, 1, 2].slice(0, mobile ? 2 : 3).map((i) => (
          <div key={i} className="rounded-[0.3em] bg-white/5 p-[6%]">
            <div className="aspect-[4/3] rounded-[0.25em]" style={{ background: `linear-gradient(135deg, ${accent}55, ${accent}11)` }} />
            <div className="mt-[0.4em] flex gap-[0.1em]" style={{ color: accent }}>
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} className="h-[0.45em] w-[0.45em] fill-current" aria-hidden />
              ))}
            </div>
            <div className="mt-[0.3em] h-[0.3em] w-3/4 rounded bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Laptop({ site, className = "" }: { site: MockSite; className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <div className="rounded-t-[0.9em] border border-white/10 bg-[#1b2030] p-[2.2%] shadow-card">
        <div className="@container aspect-[16/10] overflow-hidden rounded-[0.35em]">
          <div className="h-full text-[2.6cqw]">
            <MiniSite site={site} />
          </div>
        </div>
      </div>
      <div className="relative mx-[-6%] h-[0.9em] rounded-b-[1em] bg-gradient-to-b from-[#2a3042] to-[#151926]">
        <div className="absolute left-1/2 top-0 h-[0.35em] w-[14%] -translate-x-1/2 rounded-b-[0.4em] bg-[#0d101a]" />
      </div>
    </div>
  );
}

export function Phone({ site, className = "" }: { site: MockSite; className?: string }) {
  return (
    <div className={`rounded-[1.6em] border border-white/15 bg-[#10131d] p-[5%] shadow-card ${className}`} aria-hidden>
      <div className="@container relative aspect-[9/19] overflow-hidden rounded-[1.15em]">
        <div className="absolute left-1/2 top-[1.5%] z-10 h-[2.4%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        <div className="h-full bg-[#0b0f1c] pt-[8%] text-[7cqw]">
          <MiniSite site={site} mobile />
        </div>
      </div>
    </div>
  );
}

export function DevicePair({ site, className = "" }: { site: MockSite; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Laptop site={site} className="w-[88%]" />
      <div className="absolute -bottom-[8%] right-0 w-[24%]">
        <Phone site={site} className="rounded-[1.1em]" />
      </div>
    </div>
  );
}
