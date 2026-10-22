# Publicar na Hostinger

O site usa Next.js com rotas de servidor (pedidos, Pix, webhooks), então precisa de um plano que rode **Node.js**:
Business ou Cloud (app Node.js importado do GitHub) ou VPS. A hospedagem Premium simples não serve.

## Business / Cloud (hPanel)

1. hPanel → **Sites** → **Adicionar site** → **Node.js** → **Importar repositório do GitHub** e escolha este repositório.
2. Configuração de build:
   - Versão do Node: **20** ou mais nova
   - Comando de build: `npm run build`
   - Comando de início: `npm start`
3. **Variáveis de ambiente**: copie os nomes de `.env.example` e preencha os valores.
   `NEXT_PUBLIC_SITE_URL` deve ser o domínio final, ex.: `https://mindblast.com.br`.
4. Publique e aponte o domínio.

## Depois de publicar

- **Mercado Pago**: Suas integrações → Webhooks → URL `https://SEU-DOMINIO/api/webhooks/mercadopago`, evento **Pagamentos**.
  Copie a assinatura secreta para `MERCADOPAGO_WEBHOOK_SECRET`.
- **Stripe**: Developers → Webhooks → endpoint `https://SEU-DOMINIO/api/webhooks/stripe`, eventos
  `checkout.session.completed` e `checkout.session.async_payment_succeeded`. Copie o signing secret para `STRIPE_WEBHOOK_SECRET`.

## Banco de dados (obrigatório antes de receber pedidos de verdade)

Crie um banco PostgreSQL grátis no Supabase ou Neon e coloque a connection string em `DATABASE_URL`.
As tabelas são criadas sozinhas no primeiro acesso. Sem `DATABASE_URL`, os pedidos ficam no arquivo
`.data/db.json`, que pode ser apagado a cada nova publicação.
