import type { Metadata } from "next";
import { site } from "@/config/site";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Regras de uso da plataforma Casa Nova Interior. A contratação dos serviços é feita diretamente entre cliente e fornecedor.",
  alternates: { canonical: "/termos" },
};

/* Modelo inicial. Revise com um profissional quando houver contrato com fornecedores. */
const sections: { h: string; p: string[] }[] = [
  {
    h: "1. O que é a Casa Nova Interior",
    p: [
      `A ${site.name} é uma plataforma gratuita, mantida pela ${site.parent.name}, que conecta moradores de Salto e Itu/SP a profissionais e empresas de serviços residenciais. Ao enviar um pedido, você recebe orçamentos para comparar.`,
    ],
  },
  {
    h: "2. Uso gratuito para o cliente",
    p: ["Pedir orçamentos pela plataforma não tem custo e não obriga você a contratar nenhum serviço."],
  },
  {
    h: "3. A contratação é entre cliente e fornecedor",
    p: [
      `A ${site.name} apenas aproxima as partes. Qualquer contratação é feita diretamente entre você e o fornecedor escolhido, que é o único responsável pelo preço, pelo prazo, pela execução, pela garantia e pela emissão de nota fiscal do serviço.`,
      `A ${site.name} não é parte do contrato, não recebe pagamentos pelo serviço contratado e não responde por danos, atrasos ou defeitos causados pelo fornecedor.`,
    ],
  },
  {
    h: "4. Cuidados antes de contratar",
    p: [
      "Recomendamos comparar propostas, pedir tudo por escrito (escopo, materiais, prazo e garantia), conferir CNPJ e referências do fornecedor e não fazer pagamentos integrais antecipados.",
    ],
  },
  {
    h: "5. Informações enviadas por você",
    p: [
      "Você se compromete a informar dados verdadeiros e a não usar o formulário para spam ou pedidos falsos. Pedidos abusivos podem ser descartados.",
      "O tratamento dos seus dados segue a nossa Política de Privacidade e a LGPD.",
    ],
  },
  {
    h: "6. Conteúdo do site",
    p: [
      "Os textos e as faixas de preço publicadas são informativos e servem como referência. O valor final depende sempre do orçamento de cada fornecedor.",
    ],
  },
  {
    h: "7. Contato",
    p: [`Dúvidas sobre estes termos: ${site.email} ou WhatsApp ${site.whatsapp.display}.`],
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">Termos de Uso</h1>
        <p className="mt-3 text-sm text-muted">Última atualização: 23 de outubro de 2026</p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.h}>
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
