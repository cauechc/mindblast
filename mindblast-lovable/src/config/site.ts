/**
 * DADOS DO SITE — edite aqui.
 * Número do WhatsApp, e-mail, Instagram, serviços, preços e projetos de exemplo.
 */

export const site = {
  name: "Mind Blast",
  fullName: "Mind Blast Soluções Digitais",
  tagline: "Soluções Digitais",
  whatsapp: {
    /** Somente dígitos, com DDI + DDD. */
    number: "5511993626555",
    /** Como o número aparece escrito no site. */
    display: "+55 (11) 99362-6555",
  },
  instagram: "mindblastsites",
  email: "mindblastsites@gmail.com",
  city: "Salto",
  state: "SP",
  region: "Salto e região · Atendemos todo o Brasil e o exterior",
};

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const genericWhatsappText = "Olá, Mind Blast! Vim pelo site e quero saber mais.";

/** Opções do formulário de orçamento ("O que você precisa?"). */
export const needs = [
  { id: "landing", label: "Landing page" },
  { id: "institucional", label: "Site institucional" },
  { id: "app", label: "Aplicativo" },
  { id: "sistema", label: "Sistema sob medida" },
  { id: "ia", label: "Automação com IA" },
  { id: "naosei", label: "Ainda não sei" },
] as const;

export type NeedId = (typeof needs)[number]["id"];

export type Service = {
  id: NeedId;
  title: string;
  description: string;
  includes: string[];
  /** Preço "a partir de" em reais. null = Sob consulta. */
  from: number | null;
  /** Foto em /public/fotos. Sem foto, o card mostra a maquete de automação. */
  image?: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    id: "landing",
    title: "Landing Page",
    description: "Um site de uma página focado em trazer clientes pelo WhatsApp.",
    includes: ["1 página com até 5 seções", "Botão direto para o WhatsApp", "Perfeito no celular", "Pronto para o Google"],
    from: 250,
    image: "/fotos/servico-landing.jpg",
    imageAlt: "Mãos segurando um celular com um site aberto",
  },
  {
    id: "institucional",
    title: "Site Institucional",
    description: "Várias páginas: serviços, galeria, avaliações, mapa e contato.",
    includes: ["Início, serviços, galeria, sobre e contato", "Mapa e formulário de contato", "Botão WhatsApp em todas as páginas", "SEO básico"],
    from: 500,
    image: "/fotos/servico-institucional.jpg",
    imageAlt: "Notebook em mesa de madeira com café e caderno",
  },
  {
    id: "app",
    title: "Aplicativos e Sistemas",
    description: "Apps web e mobile e sistemas sob medida: agendamento, pedidos, estoque, área do cliente.",
    includes: ["Agendamento online", "Pedidos e catálogo", "Área do cliente com login", "Painel para você gerenciar"],
    from: null,
    image: "/fotos/servico-app.jpg",
    imageAlt: "Designer e cliente em reunião, olhando o notebook",
  },
  {
    id: "ia",
    title: "Automação com IA",
    description: "Um assistente que responde seus clientes, agenda horários e organiza pedidos, 24 horas por dia.",
    includes: ["Atendimento automático no WhatsApp", "Agendamentos e lembretes", "Respostas sobre preços e horários", "Integração com planilhas e sistemas"],
    from: null,
    imageAlt: "Conversa de WhatsApp respondida por um assistente de IA",
  },
];

export const plans = [
  {
    id: "essencial",
    name: "Essencial",
    service: "Landing Page",
    price: 250 as number | null,
    needs: ["landing"] as NeedId[],
    features: ["1 página, até 5 seções", "Botão WhatsApp", "Responsivo", "Pronto para o Google"],
  },
  {
    id: "profissional",
    name: "Profissional",
    service: "Site Institucional",
    price: 500 as number | null,
    needs: ["institucional"] as NeedId[],
    features: ["Várias páginas (início, serviços, galeria, sobre, contato)", "Mapa e formulário", "Botão WhatsApp", "SEO básico"],
  },
  {
    id: "sob-medida",
    name: "Sob medida",
    service: "Apps, sistemas e IA",
    price: null as number | null,
    needs: ["app", "sistema", "ia"] as NeedId[],
    features: ["Aplicativos e sistemas sob medida", "Automações com IA", "Design exclusivo", "Recursos avançados"],
  },
];

export type Project = { slug: string; type: string; headline: string; city: string; accent: string; image: string };

/** Projetos ilustrativos (não são clientes reais). Troque por projetos reais quando tiver autorização. */
export const projects: Project[] = [
  { slug: "lava-jato", type: "Lava-jato e estética automotiva", headline: "Seu carro brilhando de novo", city: "Salto/SP", accent: "#2F8CFF", image: "/fotos/lava-jato.jpg" },
  { slug: "corretor-de-imoveis", type: "Corretor de imóveis de alto padrão", headline: "Imóveis exclusivos em Itu", city: "Itu/SP", accent: "#C9A86A", image: "/fotos/corretor-de-imoveis.jpg" },
  { slug: "pet-shop", type: "Pet shop e clínica veterinária", headline: "Cuidado completo para o seu pet", city: "Indaiatuba/SP", accent: "#3CC6A8", image: "/fotos/pet-shop.jpg" },
  { slug: "pilates", type: "Estúdio de Pilates", headline: "Movimento, postura e bem-estar", city: "Sorocaba/SP", accent: "#E58FB0", image: "/fotos/pilates.jpg" },
  { slug: "marmitaria", type: "Marmitaria / comida caseira", headline: "Comida caseira todo dia", city: "Campinas/SP", accent: "#F2A33A", image: "/fotos/marmitaria.jpg" },
  { slug: "serralheria", type: "Serralheria e caldeiraria", headline: "Portões, estruturas e projetos em aço", city: "Jundiaí/SP", accent: "#8FA3BF", image: "/fotos/serralheria.jpg" },
  { slug: "oficina-de-motos", type: "Oficina e peças de moto", headline: "Sua moto em boas mãos", city: "Salto/SP", accent: "#FF5A3C", image: "/fotos/oficina-de-motos.jpg" },
  { slug: "eletrica", type: "Empresa de elétrica", headline: "Instalações elétricas com segurança", city: "Itu/SP", accent: "#F5D020", image: "/fotos/eletrica.jpg" },
];

export const formatBRL = (v: number) => `R$ ${v.toLocaleString("pt-BR")}`;
