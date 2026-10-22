import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import postgres, { type Sql } from "postgres";
import type { OrderQuote, OrderSelection } from "./pricing";

/**
 * Armazenamento de pedidos e leads.
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

/*
 * Com DATABASE_URL (PostgreSQL: Supabase, Neon…): tabelas orders e leads, cada linha guarda o registro em jsonb.
 * Sem DATABASE_URL: memória + arquivo .data/db.json, só para desenvolvimento.
 */

const g = globalThis as unknown as { __mbdb?: DB; __mbsql?: Sql; __mbschema?: Promise<unknown> };

function sql() {
  if (!process.env.DATABASE_URL) return null;
  g.__mbsql ??= postgres(process.env.DATABASE_URL, { max: 5, idle_timeout: 20, prepare: false });
  g.__mbschema ??= g.__mbsql`
    create table if not exists orders (id text primary key, created_at timestamptz not null default now(), data jsonb not null);
    create table if not exists leads (id text primary key, created_at timestamptz not null default now(), data jsonb not null);
  `.simple();
  return g.__mbsql;
}

async function db() {
  const q = sql();
  if (q) await g.__mbschema;
  return q;
}

const file = path.join(process.cwd(), ".data", "db.json");

async function load(): Promise<DB> {
  if (g.__mbdb) return g.__mbdb;
  try {
    g.__mbdb = JSON.parse(await readFile(file, "utf8")) as DB;
  } catch {
    g.__mbdb = { orders: [], leads: [] };
  }
  return g.__mbdb;
}

async function save(data: DB) {
  try {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, JSON.stringify(data, null, 2));
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
  const q = await db();
  if (q) {
    await q`insert into orders (id, created_at, data) values (${order.id}, ${order.createdAt}, ${q.json(order)})`;
    return order;
  }
  const data = await load();
  data.orders.push(order);
  await save(data);
  return order;
}

export async function getOrder(id: string) {
  const q = await db();
  if (q) {
    const [row] = await q<{ data: Order }[]>`select data from orders where id = ${id}`;
    return row?.data ?? null;
  }
  const data = await load();
  return data.orders.find((o) => o.id === id) ?? null;
}

/**
 * Atualiza um pedido. Com `onlyIf`, só altera se o status de pagamento ainda for esse
 * (evita registrar duas vezes o mesmo pagamento quando dois webhooks chegam juntos).
 */
export async function updateOrder(id: string, patch: Partial<Order>, onlyIf?: PaymentStatus) {
  const q = await db();
  if (q) {
    const rows = onlyIf
      ? await q<{ data: Order }[]>`update orders set data = data || ${q.json(patch)} where id = ${id} and data->>'paymentStatus' = ${onlyIf} returning data`
      : await q<{ data: Order }[]>`update orders set data = data || ${q.json(patch)} where id = ${id} returning data`;
    return rows[0]?.data ?? null;
  }
  const data = await load();
  const order = data.orders.find((o) => o.id === id);
  if (!order || (onlyIf && order.paymentStatus !== onlyIf)) return null;
  Object.assign(order, patch);
  await save(data);
  return order;
}

export async function createLead(lead: Lead) {
  const q = await db();
  if (q) {
    await q`insert into leads (id, created_at, data) values (${lead.id}, ${lead.createdAt}, ${q.json(lead)})`;
    return lead;
  }
  const data = await load();
  data.leads.push(lead);
  await save(data);
  return lead;
}
