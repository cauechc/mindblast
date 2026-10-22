# Mind Blast — site do estúdio

Next.js (App Router) + TypeScript + Tailwind. pt-BR em `/pt` (BRL, Pix) e inglês em `/en` (USD, Stripe).

```bash
npm install
cp .env.example .env.local   # preencha as chaves quando tiver
npm run dev                  # http://localhost:3000
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Preços, planos, adicionais, desconto à vista, entrada | `src/config/pricing.ts` |
| WhatsApp, Instagram, e-mail, CNPJ/CPF, prazo da prévia | `src/config/site.ts` |
| Fotos (deixe em `public/fotos/`) | `src/config/images.ts` |
| Projetos do portfólio (hoje são exemplos marcados) | `src/config/portfolio.ts` |
| Depoimentos reais | `src/config/testimonials.ts` |
| Textos do site | `src/i18n/pt.ts`, `src/i18n/en.ts` |
| Política de privacidade e termos (modelos) | `src/config/legal.ts` |

Preço `null` = "Sob consulta": vira pedido de orçamento e não vai para o checkout.

## Segurança de preço

`POST /api/orders` ignora qualquer valor vindo do navegador e recalcula o pedido com `src/lib/pricing.ts`
a partir de `config/pricing.ts`. A moeda segue o idioma (PT → BRL, EN → USD).

## Estado atual

Pronto: home, serviços, explicação de landing page, portfólio + página de projeto, como funciona, preços,
depoimentos (espaços vazios), contato, "Monte seu pedido", prévia grátis, checkout, LGPD (cookies + páginas),
SEO (metadata, sitemap, robots, JSON-LD LocalBusiness).

Pagamentos: Pix pelo Mercado Pago (cobrança dinâmica + webhook assinado) com reserva de Pix estático pela chave
em `config/site.ts`; Stripe Checkout + webhook assinado; página "Pagamento confirmado!". Pedido só vira pago pelo webhook.
Banco: PostgreSQL via `DATABASE_URL` (sem ela, `.data/db.json`). E-mails só aparecem no log sem `RESEND_API_KEY`.

Publicação: ver `DEPLOY.md` (Hostinger).

Próximas etapas: envio de materiais, login (link mágico) e área do cliente, painel admin com orçamentos personalizados.
