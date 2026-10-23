import { z } from "zod";
import { cities, propertyTypes, serviceIds } from "@/config/site";

/** Aceita (11) 99999-9999, 11999999999 ou +55 11 99999-9999 e devolve 5511999999999. */
const whatsapp = z
  .string()
  .trim()
  .transform((v) => v.replace(/\D/g, "").replace(/^0+/, ""))
  .transform((d) => (d.length === 10 || d.length === 11 ? `55${d}` : d))
  .refine((d) => /^55\d{10,11}$/.test(d), "Informe um WhatsApp com DDD.");

export const leadSchema = z.object({
  name: z.string().trim().min(3, "Informe seu nome completo.").max(120),
  whatsapp,
  city: z.enum(cities, "Escolha sua cidade."),
  service: z.enum(serviceIds, "Escolha um serviço."),
  propertyType: z.enum(propertyTypes, "Escolha o tipo de imóvel."),
  description: z.string().trim().max(2000).default(""),
  consent: z.literal(true, "É preciso aceitar a Política de Privacidade."),
  source: z.record(z.string().max(40), z.string().max(200)).optional(),
  /** Campo escondido: se vier preenchido, é robô. */
  website: z.string().max(0).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
