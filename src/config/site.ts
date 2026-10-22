/**
 * Dados de contato e da empresa. Edite aqui.
 * Business/contact settings. Edit here.
 */
export const site = {
  name: "Mind Blast",
  tagline: "Criação de Sites",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsapp: {
    /** Somente dígitos, com DDI + DDD. Digits only, with country + area code. */
    number: "5511993626555",
    display: "+55 (11) 99362-6555",
    shortLink: "w.app/mindblast",
  },
  instagram: "mindblastsites",
  email: "[EMAIL]",
  city: "Salto",
  state: "SP",
  /** CNPJ ou CPF exibido no rodapé. */
  taxId: "[PLACEHOLDER]",
  /** Chave Pix usada no Pix estático (copia e cola). Pode ser trocada pela variável PIX_KEY. */
  pixKey: "mindblastsites@gmail.com",
  /** Prazo prometido para a prévia grátis, em horas. */
  previewHours: 48,
} as const;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
