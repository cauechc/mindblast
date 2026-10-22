import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import postgres, { type Sql } from "postgres";
import type { City, ServiceId } from "@/config/site";

/**
 * Armazenamento dos leads (pedidos de orçamento).
 */

export const leadStatuses = ["novo", "em_contato", "encaminhado", "fechado", "perdido"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  /** Só dígitos, com DDI 55. */
  whatsapp: string;
  city: City;
  service: ServiceId;
  description: string;
  /** Momento em que a pessoa aceitou a Política de Privacidade (LGPD). */
  consentAt: string;
  /** Origem da visita (utm_source, utm_campaign…), para medir campanhas. */
  source?: Record<string, string>;
  status: LeadStatus;
  /** Anotações internas. */
  notes?: string;
  /** Resultado do envio para o CRM (webhook). */
  crm?: { ok: boolean; at: string; error?: string };
};

type DB = { leads: Lead[] };

/*
 * Com DATABASE_URL (PostgreSQL: Supabase, Neon…): tabela casanova_leads, cada linha guarda o lead em jsonb.
 * Sem DATABASE_URL: memória + arquivo .data/leads.json, só para desenvolvimento.
 */

const g = globalThis as unknown as { __cndb?: DB; __cnsql?: Sql; __cnschema?: Promise<unknown> };

function sql() {
  if (!process.env.DATABASE_URL) return null;
  g.__cnsql ??= postgres(process.env.DATABASE_URL, { max: 5, idle_timeout: 20, prepare: false });
  g.__cnschema ??= g.__cnsql`
    create table if not exists casanova_leads (id text primary key, created_at timestamptz not null default now(), data jsonb not null);
    create index if not exists casanova_leads_created_at on casanova_leads (created_at desc);
  `.simple();
  return g.__cnsql;
}

async function db() {
  const q = sql();
  if (q) await g.__cnschema;
  return q;
}

const file = path.join(process.cwd(), ".data", "leads.json");

async function load(): Promise<DB> {
  if (g.__cndb) return g.__cndb;
  try {
    g.__cndb = JSON.parse(await readFile(file, "utf8")) as DB;
  } catch {
    g.__cndb = { leads: [] };
  }
  return g.__cndb;
}

async function save(data: DB) {
  try {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, JSON.stringify(data, null, 2));
  } catch {
    // Sistema de arquivos somente leitura (ex.: serverless): fica só em memória.
  }
}

/** Código curto e legível, ex.: CN-7K2Q9X. */
export function newId(prefix = "CN") {
  const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  const bytes = randomBytes(6);
  return `${prefix}-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}

export async function createLead(lead: Lead) {
  const q = await db();
  if (q) {
    await q`insert into casanova_leads (id, created_at, data) values (${lead.id}, ${lead.createdAt}, ${q.json(lead)})`;
    return lead;
  }
  const data = await load();
  data.leads.push(lead);
  await save(data);
  return lead;
}

export async function updateLead(id: string, patch: Partial<Lead>) {
  const q = await db();
  if (q) {
    const rows = await q<{ data: Lead }[]>`update casanova_leads set data = data || ${q.json(patch)} where id = ${id} returning data`;
    return rows[0]?.data ?? null;
  }
  const data = await load();
  const lead = data.leads.find((l) => l.id === id);
  if (!lead) return null;
  Object.assign(lead, patch);
  await save(data);
  return lead;
}

export async function listLeads(limit = 500) {
  const q = await db();
  if (q) {
    const rows = await q<{ data: Lead }[]>`select data from casanova_leads order by created_at desc limit ${limit}`;
    return rows.map((r) => r.data);
  }
  const data = await load();
  return [...data.leads].reverse().slice(0, limit);
}
