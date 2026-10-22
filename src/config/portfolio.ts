/**
 * PROJETOS EXEMPLO. Substitua por projetos reais e autorizados de clientes.
 * Enquanto `example: true`, o card mostra o selo "Projeto exemplo".
 * `image`: caminho em /public para um print real do site (ex.: "/portfolio/lava-jato.jpg").
 * Sem imagem, o card mostra uma maquete do site gerada em código.
 */
export type Project = {
  slug: string;
  example: boolean;
  city: string;
  /** Cor principal da maquete. */
  accent: string;
  image?: string;
  pt: { type: string; headline: string; features: string[] };
  en: { type: string; headline: string; features: string[] };
};

export const projects: Project[] = [
  {
    slug: "lava-jato",
    example: true,
    city: "Salto/SP",
    accent: "#2F8CFF",
    pt: {
      type: "Lava-jato e estética automotiva",
      headline: "Seu carro brilhando de novo",
      features: ["Tabela de serviços com preços", "Galeria antes/depois", "Agendamento pelo WhatsApp", "Mapa e horário de funcionamento"],
    },
    en: {
      type: "Car wash & detailing",
      headline: "Make your car shine again",
      features: ["Service menu with prices", "Before/after gallery", "Booking via WhatsApp", "Map and opening hours"],
    },
  },
  {
    slug: "corretor-de-imoveis",
    example: true,
    city: "Itu/SP",
    accent: "#C9A86A",
    pt: {
      type: "Corretor de imóveis de alto padrão",
      headline: "Imóveis exclusivos em Itu",
      features: ["Catálogo de imóveis com filtros", "Fotos em tela cheia", "Ficha técnica de cada imóvel", "Contato direto por imóvel"],
    },
    en: {
      type: "High-end real estate agent",
      headline: "Exclusive homes in Itu",
      features: ["Property catalog with filters", "Full-screen photos", "Spec sheet for each property", "Direct contact per listing"],
    },
  },
  {
    slug: "pet-shop",
    example: true,
    city: "Indaiatuba/SP",
    accent: "#3CC6A8",
    pt: {
      type: "Pet shop e clínica veterinária",
      headline: "Cuidado completo para o seu pet",
      features: ["Serviços de banho, tosa e consultas", "Agendamento online", "Equipe e estrutura", "Avaliações do Google"],
    },
    en: {
      type: "Pet shop & vet clinic",
      headline: "Complete care for your pet",
      features: ["Grooming and vet services", "Online booking", "Team and facilities", "Google reviews"],
    },
  },
  {
    slug: "pilates",
    example: true,
    city: "Sorocaba/SP",
    accent: "#E58FB0",
    pt: {
      type: "Estúdio de Pilates",
      headline: "Movimento, postura e bem-estar",
      features: ["Planos e horários das aulas", "Aula experimental pelo WhatsApp", "Fotos do estúdio", "Perfil das instrutoras"],
    },
    en: {
      type: "Pilates studio",
      headline: "Movement, posture and wellbeing",
      features: ["Class plans and schedule", "Trial class via WhatsApp", "Studio photos", "Instructor profiles"],
    },
  },
  {
    slug: "marmitaria",
    example: true,
    city: "Campinas/SP",
    accent: "#F2A33A",
    pt: {
      type: "Marmitaria / comida caseira",
      headline: "Comida caseira todo dia",
      features: ["Cardápio da semana", "Pedido pelo WhatsApp", "Área de entrega", "Fotos dos pratos"],
    },
    en: {
      type: "Home-style meal delivery",
      headline: "Home cooking every day",
      features: ["Weekly menu", "Orders via WhatsApp", "Delivery area", "Dish photos"],
    },
  },
  {
    slug: "serralheria",
    example: true,
    city: "Jundiaí/SP",
    accent: "#8FA3BF",
    pt: {
      type: "Serralheria e caldeiraria",
      headline: "Portões, estruturas e projetos em aço",
      features: ["Portfólio de obras", "Pedido de orçamento com fotos", "Serviços para empresas e residências", "Mapa de atendimento"],
    },
    en: {
      type: "Metalwork & fabrication",
      headline: "Gates, structures and steel projects",
      features: ["Project portfolio", "Quote request with photos", "Commercial and residential services", "Service area map"],
    },
  },
  {
    slug: "oficina-de-motos",
    example: true,
    city: "Salto/SP",
    accent: "#FF5A3C",
    pt: {
      type: "Oficina e peças de moto",
      headline: "Sua moto em boas mãos",
      features: ["Serviços de revisão e reparo", "Catálogo de peças", "Orçamento pelo WhatsApp", "Horário e localização"],
    },
    en: {
      type: "Motorcycle repair & parts",
      headline: "Your bike in good hands",
      features: ["Service and repair menu", "Parts catalog", "Quotes via WhatsApp", "Hours and location"],
    },
  },
  {
    slug: "eletrica",
    example: true,
    city: "Itu/SP",
    accent: "#F5D020",
    pt: {
      type: "Empresa de elétrica",
      headline: "Instalações elétricas com segurança",
      features: ["Serviços residenciais e comerciais", "Atendimento de emergência", "Pedido de orçamento", "Áreas atendidas"],
    },
    en: {
      type: "Electrical contractor",
      headline: "Safe electrical installations",
      features: ["Residential and commercial services", "Emergency calls", "Quote requests", "Service areas"],
    },
  },
];
