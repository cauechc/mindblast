# Casa Nova Interior

Plataforma regional de orçamentos residenciais (Energia Solar, Móveis Planejados, Ar-Condicionado)
para Salto, Itu, Indaiatuba e Cabreúva/SP. Next.js (App Router) + TypeScript + Tailwind.

```bash
npm install
cp .env.example .env.local
npm run dev                  # http://localhost:3000
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Nome, WhatsApp, e-mail, CNPJ, cidades e serviços | `src/config/site.ts` |
| Seções da página inicial | `src/components/home/` |
| Formulário de orçamento | `src/components/home/LeadForm.tsx` |
| Política de Privacidade (LGPD) | `src/app/(site)/privacidade/page.tsx` |
| Banco de leads (Postgres via `DATABASE_URL`) | `src/lib/store.ts` |
| Envio ao CRM (webhook) | `src/lib/crm.ts` |
| Mensagens de WhatsApp | `src/lib/whatsapp.ts` |

Painel de leads em `/admin` (senha em `ADMIN_PASSWORD`), com exportação CSV. Publicação: ver `DEPLOY.md`.
O site anterior (Mind Blast Criação de Sites) continua no histórico do Git.
