/**
 * Modelos de Política de Privacidade e Termos de Uso (LGPD).
 * Campos entre colchetes devem ser preenchidos. Revise com um profissional antes de publicar.
 */
type Doc = { title: string; updated: string; sections: { h: string; p: string[] }[] };

export const privacy: Record<"pt" | "en", Doc> = {
  pt: {
    title: "Política de Privacidade",
    updated: "Última atualização: [DATA]",
    sections: [
      { h: "1. Quem somos", p: ["Mind Blast ([RAZÃO SOCIAL], CNPJ/CPF [PLACEHOLDER]), com sede em Salto/SP, é a controladora dos dados pessoais tratados neste site. Contato do encarregado (DPO): mindblastsites@gmail.com."] },
      { h: "2. Dados que coletamos", p: ["Dados que você informa nos formulários: nome, nome da empresa, WhatsApp, e-mail, ramo de atividade, cidade, perfil do Instagram e informações sobre o seu projeto.", "Dados de pagamento são tratados diretamente pelos provedores (Stripe e [PROVEDOR PIX]); não armazenamos dados de cartão.", "Dados de navegação (cookies essenciais e, com seu consentimento, cookies de análise)."] },
      { h: "3. Para que usamos", p: ["Responder pedidos de orçamento e prévias, executar o contrato de criação do site, processar pagamentos, enviar comunicações sobre o seu projeto e cumprir obrigações legais e fiscais."] },
      { h: "4. Bases legais (art. 7º da LGPD)", p: ["Execução de contrato e procedimentos preliminares, cumprimento de obrigação legal, legítimo interesse e consentimento, quando aplicável."] },
      { h: "5. Compartilhamento", p: ["Compartilhamos dados apenas com operadores necessários ao serviço: provedores de pagamento, hospedagem, e-mail transacional e armazenamento em nuvem, todos sob contrato."] },
      { h: "6. Retenção", p: ["Mantemos os dados pelo tempo necessário ao serviço e pelos prazos legais (ex.: fiscais). Depois, eles são excluídos ou anonimizados."] },
      { h: "7. Seus direitos", p: ["Você pode pedir confirmação, acesso, correção, anonimização, portabilidade, exclusão e revogação do consentimento pelo e-mail mindblastsites@gmail.com ou WhatsApp +55 (11) 99362-6555."] },
      { h: "8. Cookies", p: ["Usamos cookies essenciais para o funcionamento do site. Cookies de análise só são usados se você aceitar no aviso de cookies."] },
      { h: "9. Segurança", p: ["Adotamos medidas técnicas e administrativas para proteger os dados, como conexão criptografada (HTTPS) e acesso restrito."] },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: [DATE]",
    sections: [
      { h: "1. Who we are", p: ["Mind Blast ([LEGAL NAME], tax ID [PLACEHOLDER]), based in Salto/SP, Brazil, is the controller of the personal data processed on this site. Data protection contact: mindblastsites@gmail.com."] },
      { h: "2. Data we collect", p: ["Data you provide in our forms: name, company name, WhatsApp, e-mail, type of business, city, Instagram profile and details about your project.", "Payment data is handled directly by our providers (Stripe and [PIX PROVIDER]); we do not store card data.", "Browsing data (essential cookies and, with your consent, analytics cookies)."] },
      { h: "3. How we use it", p: ["To answer quote and preview requests, deliver the website contract, process payments, contact you about your project and meet legal and tax obligations."] },
      { h: "4. Legal bases (Brazil's LGPD, art. 7)", p: ["Performance of a contract and pre-contractual steps, legal obligation, legitimate interest and consent, where applicable."] },
      { h: "5. Sharing", p: ["We share data only with processors needed to provide the service: payment providers, hosting, transactional e-mail and cloud storage, all under contract."] },
      { h: "6. Retention", p: ["We keep data as long as needed for the service and for legal periods (e.g. tax). After that it is deleted or anonymized."] },
      { h: "7. Your rights", p: ["You can request confirmation, access, correction, anonymization, portability, deletion and withdrawal of consent at mindblastsites@gmail.com or WhatsApp +55 (11) 99362-6555."] },
      { h: "8. Cookies", p: ["We use essential cookies to run the site. Analytics cookies are only used if you accept them in the cookie banner."] },
      { h: "9. Security", p: ["We apply technical and organizational measures to protect data, such as encrypted connections (HTTPS) and restricted access."] },
    ],
  },
};

export const terms: Record<"pt" | "en", Doc> = {
  pt: {
    title: "Termos de Uso",
    updated: "Última atualização: [DATA]",
    sections: [
      { h: "1. Serviços", p: ["A Mind Blast ([RAZÃO SOCIAL], CNPJ/CPF [PLACEHOLDER]) cria sites, landing pages e aplicativos conforme o plano contratado e descrito no pedido."] },
      { h: "2. Preços e pagamento", p: ["Os preços são os exibidos no momento do pedido. O pagamento pode ser 50% de entrada e 50% na entrega, ou 100% antecipado com desconto. Itens \"Sob consulta\" são cobrados conforme orçamento enviado."] },
      { h: "3. Prazos e materiais", p: ["O prazo de entrega começa após a confirmação do pagamento da entrada e o envio dos materiais (logo, fotos, textos). Atrasos no envio de materiais podem alterar o prazo."] },
      { h: "4. Ajustes", p: ["Estão incluídas rodadas de ajustes sobre a prévia até a aprovação, dentro do escopo contratado. Novas funcionalidades fora do escopo são orçadas à parte."] },
      { h: "5. Cancelamento e reembolso", p: ["[DEFINIR POLÍTICA DE CANCELAMENTO E REEMBOLSO, observando o Código de Defesa do Consumidor e o direito de arrependimento de 7 dias para compras online.]"] },
      { h: "6. Propriedade", p: ["Após a quitação, o cliente recebe os direitos de uso do site entregue. Domínio e hospedagem ficam em nome do cliente quando contratados por ele."] },
      { h: "7. Foro", p: ["Fica eleito o foro da comarca de Salto/SP, salvo disposição legal em contrário."] },
    ],
  },
  en: {
    title: "Terms of Service",
    updated: "Last updated: [DATE]",
    sections: [
      { h: "1. Services", p: ["Mind Blast ([LEGAL NAME], tax ID [PLACEHOLDER]) builds websites, landing pages and apps according to the plan described in your order."] },
      { h: "2. Prices and payment", p: ["Prices are those shown when you place the order. You can pay 50% upfront and 50% on delivery, or 100% upfront with a discount. \"To be determined\" items are charged according to the quote we send."] },
      { h: "3. Timelines and materials", p: ["The delivery timeline starts once the deposit is confirmed and your materials (logo, photos, texts) are received. Late materials may change the timeline."] },
      { h: "4. Revisions", p: ["Rounds of revisions on the preview until approval are included, within the contracted scope. New features outside the scope are quoted separately."] },
      { h: "5. Cancellation and refunds", p: ["[DEFINE CANCELLATION AND REFUND POLICY.]"] },
      { h: "6. Ownership", p: ["Once fully paid, the client receives the rights to use the delivered website. Domain and hosting stay in the client's name when they contract them."] },
      { h: "7. Jurisdiction", p: ["These terms are governed by Brazilian law, with jurisdiction in Salto/SP, Brazil."] },
    ],
  },
};
