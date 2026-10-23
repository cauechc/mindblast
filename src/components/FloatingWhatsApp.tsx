import { whatsappUrl } from "@/config/site";
import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl("Olá! Quero um orçamento para minha casa.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-[0_10px_30px_-5px_rgb(37_211_102/0.55)] transition hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
