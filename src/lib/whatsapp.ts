import { serviceName, site, whatsappUrl } from "@/config/site";
import type { Lead } from "./store";

/**
 * Mensagens de WhatsApp. Hoje abrem o wa.me; quando houver a API oficial (WhatsApp Cloud API),
 * basta trocar o envio aqui sem mexer no formulário.
 */

/** Mensagem que o próprio morador manda para a plataforma depois de enviar o formulário. */
export const leadToPlatformUrl = (lead: Pick<Lead, "id" | "name" | "service" | "city">) =>
  whatsappUrl(
    `Olá! Sou ${lead.name}, de ${lead.city}. Acabei de pedir um orçamento de ${serviceName(lead.service)} no site ${site.name} (pedido ${lead.id}).`,
  );

/** Link para o dono falar com o morador a partir do painel. */
export const platformToLeadUrl = (lead: Pick<Lead, "whatsapp" | "name" | "service">) =>
  `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(
    `Olá, ${lead.name.split(" ")[0]}! Aqui é da ${site.name}. Recebemos seu pedido de orçamento de ${serviceName(lead.service)}. Podemos conversar?`,
  )}`;

/** Exibe 5511999999999 como (11) 99999-9999. */
export function formatPhone(digits: string) {
  const d = digits.replace(/^55/, "");
  return d.length === 11 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : d.length === 10 ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}` : digits;
}
