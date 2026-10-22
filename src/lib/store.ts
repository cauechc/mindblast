import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { OrderQuote, OrderSelection } from "./pricing";

/**
 * Armazenamento provisório para desenvolvimento: memória + arquivo em .data/.
 * Trocar por PostgreSQL (Supabase/Neon) antes de ir para produção.
 */

export type Customer = {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  industry: string;
  city: string;
  instagram?: string;
  hasLogo: boolean;
  hasDomain: boolean;
  notes?: string;
  needs?: string;
};

export type OrderStatus = "received" | "in_progress" | "preview_sent" | "adjustments" | "published";
export type PaymentStatus = "quote_requested" | "awaiting_payment" | "deposit_paid" | "paid";

export type Order = {
  id: string;
  createdAt: string;
  locale: "pt" | "en";
  selection: OrderSelection;
  /** Valores calculados no servidor. É isto que será cobrado. */
  quote: OrderQuote;
  customer: Customer;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  /** Pagamentos confirmados pelo provedor (webhook). */
  payments?: { provider: "mercadopago" | "stripe" | "manual"; id: string; amount: number; at: string }[];
};

export type Lead = {
  id: string;
  createdAt: string;
  locale: "pt" | "en";
  name: string;
  whatsapp: string;
  industry: string;
  city: string;
  link: string;
};

type DB = { orders: Order[]; leads: Lead[] };

const file = path.join(process.cwd(), ".data", "db.json");
const g = globalThis as unknown as { __mbdb?: DB };

async function load(): Promise<DB> {
  if (g.__mbdb) return g.__mbdb;
  try {
    g.__mbdb = JSON.parse(await readFile(file, "utf8")) as DB;
  } catch {
    g.__mbdb = { orders: [], leads: [] };
  }
  return g.__mbdb;
}

async function save(db: DB) {
  try {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, JSON.stringify(db, null, 2));
  } catch {
    // Sistema de arquivos somente leitura (ex.: serverless): fica só em memória.
  }
}

/** Número de pedido curto e legível, ex.: MB-7K2Q9X. */
export function newId(prefix: string) {
  const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  const bytes = randomBytes(6);
  return `${prefix}-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}

export async function createOrder(order: Order) {
  const db = await load();
  db.orders.push(order);
  await save(db);
  return order;
}

export async function getOrder(id: string) {
  const db = await load();
  return db.orders.find((o) => o.id === id) ?? null;
}

export async function createLead(lead: Lead) {
  const db = await load();
  db.leads.push(lead);
  await save(db);
  return lead;
}

export async function updateOrder(id: string, patch: Partial<Order>) {
  const db = await load();
  const order = db.orders.find((o) => o.id === id);
  if (!order) return null;
  Object.assign(order, patch);
  await save(db);
  return order;
}
