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

Provisório: pedidos e leads ficam em `.data/db.json` (trocar por PostgreSQL); e-mails só aparecem no log
sem `RESEND_API_KEY`; Pix aguarda a escolha do provedor; Stripe cria a sessão mas ainda falta webhook e página de sucesso.

Próximas etapas: webhooks Stripe/Pix com verificação de assinatura, página de sucesso + envio de materiais,
banco de dados, login (link mágico) e área do cliente, painel admin com orçamentos personalizados.
