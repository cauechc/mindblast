# Publicar na Hostinger

O site usa Next.js com rotas de servidor (formulário de leads e painel), então precisa de um plano que rode **Node.js**:
Business, Cloud ou "Unlimited" com app Node.js importado do GitHub, ou VPS.

## Business / Cloud (hPanel)

1. hPanel → **Sites** → **Adicionar site** → **Node.js** → **Importar repositório do GitHub** e escolha este repositório.
   A pasta raiz é a raiz do repositório (não `src`).
2. Configuração de build:
   - Versão do Node: **20** ou mais nova
   - Comando de build: `npm run build`
   - Comando de início: `npm start`
3. **Variáveis de ambiente**: copie os nomes de `.env.example` e preencha os valores.
   `NEXT_PUBLIC_SITE_URL` deve ser o domínio final, ex.: `https://mindblast.com.br` (padrão em produção se ficar vazio).
4. Publique e aponte o domínio.

## Banco de dados (obrigatório antes de anunciar)

Crie um banco PostgreSQL grátis no Supabase ou Neon e coloque a connection string em `DATABASE_URL`.
A tabela `casanova_leads` é criada sozinha no primeiro acesso. Sem `DATABASE_URL`, os leads ficam no arquivo
`.data/leads.json`, que pode ser apagado a cada nova publicação.

## Depois de publicar

- Acesse `/admin` com a senha de `ADMIN_PASSWORD` para ver os leads, mudar o status e exportar CSV.
- Envie o site ao Google Search Console (o sitemap fica em `/sitemap.xml`) e crie o Perfil da Empresa no Google.
- Google Analytics: crie uma propriedade GA4, copie o ID (G-...) para `NEXT_PUBLIC_GA_ID` e reimplante. O evento `generate_lead` marca cada pedido enviado.
- Para mandar leads a um CRM, preencha `LEAD_WEBHOOK_URL` (ver `src/lib/crm.ts`).
- Links de anúncio podem levar `?utm_source=...&utm_campaign=...`; a origem aparece no painel.
