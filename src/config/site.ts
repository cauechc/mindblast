/**
 * Dados da plataforma, cidades e serviços. Edite aqui.
 */
export const site = {
  name: "Casa Nova Interior",
  tagline: "Orçamentos gratuitos para sua casa",
  description:
    "Receba orçamentos gratuitos de energia solar, móveis planejados e ar-condicionado em Salto, Itu, Indaiatuba e Cabreúva/SP.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "production" ? "https://mindblast.com.br" : "http://localhost:3000"),
  /** Empresa por trás do projeto. */
  parent: { name: "MindBlast", url: "https://mindblast.com.br" },
  whatsapp: {
    /** Somente dígitos, com DDI + DDD. */
    number: "5511993626555",
    display: "+55 (11) 99362-6555",
  },
  email: "mindblastsites@gmail.com",
  /** Cidade-base usada no schema LocalBusiness. */
  city: "Salto",
  state: "SP",
  /** Responsável pelo tratamento dos dados (LGPD). */
  controller: "MindBlast",
  /** CNPJ (opcional). Quando houver, aparece no rodapé e na Política de Privacidade. */
  taxId: "",
} as const;

export const cities = ["Salto", "Itu", "Indaiatuba", "Cabreúva"] as const;
export type City = (typeof cities)[number];

/** Slug de URL de cada cidade: /energia-solar/cabreuva. */
export const citySlug = (c: City) => c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
export const cityBySlug = (slug: string) => cities.find((c) => citySlug(c) === slug);

export const propertyTypes = ["Casa", "Casa em condomínio", "Apartamento", "Chácara ou sítio", "Comercial"] as const;
export type PropertyType = (typeof propertyTypes)[number];

/** Promessa principal da plataforma. */
export const promise = "Receba até 3 orçamentos gratuitos";

export const services = [
  {
    id: "energia-solar",
    name: "Energia Solar",
    short: "Reduza até 95% da conta de luz com um sistema fotovoltaico dimensionado para o seu consumo.",
    bullets: ["Projeto e homologação", "Instalação certificada", "Opções de financiamento"],
  },
  {
    id: "moveis-planejados",
    name: "Móveis Planejados",
    short: "Cozinha, dormitórios, closet e home office sob medida, com projeto 3D antes de fechar.",
    bullets: ["Projeto 3D", "Medição no local", "Montagem inclusa"],
  },
  {
    id: "ar-condicionado",
    name: "Ar-Condicionado",
    short: "Instalação de split e multi-split, infraestrutura para obra nova e manutenção preventiva.",
    bullets: ["Infra para obra nova", "Instalação e PMOC", "Limpeza e manutenção"],
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];
export const serviceIds = services.map((s) => s.id) as [ServiceId, ...ServiceId[]];
export const serviceName = (id: string) => services.find((s) => s.id === id)?.name ?? id;
export const serviceById = (id: string) => services.find((s) => s.id === id);

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
