import { z } from "zod";

const text = (max = 120) => z.string().trim().min(1).max(max);
const phone = z
  .string()
  .trim()
  .refine((v) => v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 15, "phone");

export const customerSchema = z.object({
  name: text(),
  company: text(),
  whatsapp: phone,
  email: z.string().trim().email().max(160),
  industry: text(),
  city: text(),
  instagram: z.string().trim().max(160).optional().default(""),
  hasLogo: z.boolean(),
  hasDomain: z.boolean(),
  notes: z.string().trim().max(2000).optional().default(""),
  needs: z.string().trim().max(4000).optional().default(""),
});

export const leadSchema = z.object({
  name: text(),
  whatsapp: phone,
  industry: text(),
  city: text(),
  link: z.string().trim().min(3).max(300),
});

export const localeSchema = z.enum(["pt", "en"]);
