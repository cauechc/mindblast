import type { Metadata } from "next";
import { site } from "@/config/site";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Casa Nova Interior coleta, usa e protege seus dados pessoais, conforme a LGPD.",
  alternates: { canonical: "/privacidade" },
};

/* Modelo inicial. O CNPJ, quando houver, entra sozinho a partir de src/config/site.ts. */
const sections: { id?: string; h: string; p: string[] }[] = [
  {
    h: "1. Quem somos",
    p: [
      `A ${site.name} é um projeto da ${site.controller}${site.taxId ? ` (CNPJ ${site.taxId})` : ""}, que, com atuação em Salto, Itu, Indaiatuba e Cabreúva/SP, é a controladora dos dados pessoais tratados neste site. Contato do encarregado (DPO): ${site.email}.`,
    ],
  },
  {
    h: "2. Dados que coletamos",
    p: [
      "No formulário de orçamento: nome completo, número de WhatsApp, cidade, serviço desejado e a descrição que você escrever.",
      "Dados técnicos mínimos para segurança e funcionamento do site, como endereço IP e a origem da visita (por exemplo, o anúncio que trouxe você até aqui).",
      "Não pedimos CPF, endereço completo nem dados de pagamento.",
    ],
  },
  {
    h: "3. Para que usamos",
    p: [
      "Para responder ao seu pedido de orçamento, entrar em contato com você pelo WhatsApp e encaminhar sua necessidade a profissionais parceiros que atendem a sua cidade.",
      "Para melhorar o atendimento e medir quais canais trazem pedidos, sempre de forma agregada.",
    ],
  },
  {
    h: "4. Bases legais (art. 7º da LGPD)",
    p: ["Consentimento, dado ao marcar a caixa no formulário, e procedimentos preliminares a um contrato solicitados por você (o orçamento)."],
  },
  {
    h: "5. Compartilhamento",
    p: [
      "Seus dados são compartilhados somente com os profissionais ou empresas parceiras do serviço que você escolheu, e apenas para que eles possam fazer o orçamento.",
      "Também usamos fornecedores de tecnologia (hospedagem, banco de dados, e-mail e CRM) que tratam os dados em nosso nome e sob contrato. Não vendemos seus dados.",
    ],
  },
  {
    h: "6. Por quanto tempo guardamos",
    p: ["Pelo tempo necessário para o atendimento e por até 2 anos após o último contato, ou até você pedir a exclusão. Depois disso, os dados são excluídos ou anonimizados."],
  },
  {
    id: "direitos",
    h: "7. Seus direitos",
    p: [
      `Você pode pedir a qualquer momento confirmação do tratamento, acesso, correção, anonimização, portabilidade, exclusão dos dados e revogação do consentimento. Basta escrever para ${site.email} ou mandar mensagem no WhatsApp ${site.whatsapp.display}. Respondemos em até 15 dias.`,
      "Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).",
    ],
  },
  {
    h: "8. Cookies",
    p: ["Este site não usa cookies de publicidade nem de rastreamento. Se isso mudar, você será avisado e poderá escolher."],
  },
  {
    h: "9. Segurança",
    p: ["Usamos conexão criptografada (HTTPS), acesso restrito ao painel de pedidos e fornecedores com práticas de segurança reconhecidas."],
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">Política de Privacidade</h1>
        <p className="mt-3 text-sm text-muted">Última atualização: 22 de outubro de 2026</p>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          A {site.name} respeita a sua privacidade e segue a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018). Aqui explicamos, de forma simples, o que fazemos com os seus dados.
        </p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.h} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl font-extrabold text-navy-900">{s.h}</h2>
              {s.p.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-muted">{p}</p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
