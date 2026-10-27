import type { City, ServiceId } from "./site";

/**
 * Textos das páginas locais (serviço, serviço × cidade, cidade e "quanto custa").
 * Os valores de "quanto custa" são faixas de referência; revise de tempos em tempos.
 */

type Faq = { q: string; a: string };

export type ServiceContent = {
  /** Frase curta para títulos: "instalação de energia solar". */
  noun: string;
  howTitle: string;
  /** "Quanto custa a energia solar", com a concordância certa. */
  howMuch: string;
  intro: string;
  /** Para quem acabou de comprar, construir ou reformar. */
  whyNow: string;
  includes: string[];
  tips: string[];
  faq: Faq[];
  pricing: {
    updated: string;
    intro: string;
    ranges: { item: string; range: string; note?: string }[];
    factors: string[];
    saveTips: string[];
  };
};

export const serviceContent: Record<ServiceId, ServiceContent> = {
  "energia-solar": {
    noun: "energia solar",
    howTitle: "Como funciona a energia solar",
    howMuch: "Quanto custa a energia solar",
    intro:
      "Um sistema de energia solar fotovoltaica transforma a luz do sol em eletricidade para a sua casa e pode reduzir a conta de luz em até 95%. O excedente vai para a rede da distribuidora e vira crédito para os meses seguintes.",
    whyNow:
      "Quem está construindo ou reformando economiza ao prever o sistema desde o início: o projeto já considera a orientação do telhado, o quadro elétrico e o espaço do inversor, sem retrabalho depois.",
    includes: [
      "Análise da sua conta de luz e dimensionamento do sistema",
      "Projeto elétrico e homologação na distribuidora",
      "Fornecimento de painéis, inversor e estrutura",
      "Instalação por equipe técnica e monitoramento pelo celular",
    ],
    tips: [
      "Tenha em mãos as últimas 12 contas de luz: o consumo médio define o tamanho do sistema.",
      "Peça a marca e a garantia dos painéis e do inversor por escrito.",
      "Confirme se a homologação na distribuidora está inclusa no preço.",
      "Compare o valor por kWp instalado, não só o preço total.",
    ],
    faq: [
      { q: "Em quanto tempo o sistema se paga?", a: "Na maioria das casas, entre 3 e 6 anos, dependendo do consumo, da tarifa e da forma de pagamento. Os painéis costumam durar mais de 25 anos." },
      { q: "Funciona em dia nublado?", a: "Sim, com produção menor. O sistema é dimensionado pela média anual, e os créditos de dias de sol compensam os dias nublados." },
      { q: "Dá para financiar?", a: "Sim. Há linhas de financiamento específicas para energia solar, muitas vezes com parcela parecida com a conta de luz que você deixa de pagar." },
    ],
    pricing: {
      updated: "outubro de 2026",
      intro:
        "O preço de um sistema de energia solar depende principalmente do seu consumo mensal. Abaixo estão faixas de referência para sistemas residenciais instalados, com projeto e homologação.",
      ranges: [
        { item: "Consumo de até 250 kWh/mês (sistema de ~2 kWp)", range: "R$ 8 mil a R$ 12 mil" },
        { item: "Consumo de 250 a 450 kWh/mês (~3 a 4 kWp)", range: "R$ 12 mil a R$ 18 mil" },
        { item: "Consumo de 450 a 700 kWh/mês (~5 a 6 kWp)", range: "R$ 18 mil a R$ 26 mil" },
        { item: "Consumo acima de 700 kWh/mês (7 kWp ou mais)", range: "a partir de R$ 26 mil" },
      ],
      factors: [
        "Consumo médio de energia (kWh por mês)",
        "Tipo e inclinação do telhado (cerâmico, metálico, laje)",
        "Marca e eficiência dos painéis e do inversor",
        "Necessidade de adequar o padrão de entrada ou o quadro elétrico",
        "Distância entre os painéis e o inversor",
      ],
      saveTips: [
        "Peça pelo menos 3 orçamentos e compare o preço por kWp.",
        "Se está construindo, preveja o sistema no projeto da obra.",
        "Avalie o financiamento: a parcela pode caber na economia da conta.",
      ],
    },
  },
  "moveis-planejados": {
    noun: "móveis planejados",
    howTitle: "Como funciona o projeto de móveis planejados",
    howMuch: "Quanto custam os móveis planejados",
    intro:
      "Móveis planejados são feitos sob medida para cada ambiente, aproveitando cantos, alturas e recortes que móveis prontos não aproveitam. Cozinhas, dormitórios, closets, banheiros, lavanderias e home office ganham espaço e organização.",
    whyNow:
      "Quem acabou de pegar as chaves ou está terminando a obra consegue planejar todos os ambientes de uma vez, com o mesmo padrão de acabamento e melhores condições de negociação.",
    includes: [
      "Visita técnica e medição dos ambientes",
      "Projeto 3D para aprovar antes da produção",
      "Fabricação em MDF com ferragens e acabamento escolhidos por você",
      "Entrega e montagem por equipe própria",
    ],
    tips: [
      "Pergunte a espessura e a marca do MDF e das ferragens (dobradiças e corrediças).",
      "Confirme se tomadas, pontos de água e iluminação já estão no lugar antes da medição final.",
      "Peça o prazo de entrega e a garantia por escrito.",
      "Compare projetos com o mesmo nível de acabamento para comparar preços de forma justa.",
    ],
    faq: [
      { q: "Quanto tempo leva da medição à montagem?", a: "Em geral de 30 a 60 dias, conforme a quantidade de ambientes e a agenda da fábrica." },
      { q: "Preciso esperar a obra terminar?", a: "A medição final deve ser feita com piso, revestimentos e pontos elétricos prontos. O projeto pode começar antes." },
      { q: "Planejado é muito mais caro que modulado?", a: "Costuma custar mais, mas aproveita melhor o espaço e dura mais. Em muitos casos, planejar só cozinha e dormitórios já resolve bem." },
    ],
    pricing: {
      updated: "outubro de 2026",
      intro:
        "O preço de móveis planejados costuma ser calculado por metro linear ou por ambiente. Abaixo estão faixas de referência com MDF de linha intermediária, projeto e montagem.",
      ranges: [
        { item: "Metro linear (armário inferior + superior)", range: "R$ 1.800 a R$ 3.500 por metro" },
        { item: "Cozinha completa (apartamento ou casa compacta)", range: "R$ 12 mil a R$ 30 mil" },
        { item: "Dormitório de casal (guarda-roupa + cabeceira)", range: "R$ 8 mil a R$ 20 mil" },
        { item: "Banheiro ou lavanderia", range: "R$ 3 mil a R$ 8 mil" },
      ],
      factors: [
        "Quantidade de ambientes e metragem",
        "Espessura e padrão do MDF (cores lisas, madeirados, laca)",
        "Ferragens com amortecimento, puxadores e iluminação embutida",
        "Portas de vidro, espelhos e nichos especiais",
        "Prazo de entrega desejado",
      ],
      saveTips: [
        "Planeje vários ambientes juntos para negociar desconto.",
        "Use cores lisas no corpo dos móveis e destaque só nas frentes.",
        "Compare orçamentos com o mesmo material e as mesmas ferragens.",
      ],
    },
  },
  "ar-condicionado": {
    noun: "ar-condicionado",
    howTitle: "Como funciona a instalação de ar-condicionado",
    howMuch: "Quanto custa instalar ar-condicionado",
    intro:
      "A instalação correta do ar-condicionado garante mais conforto, menos consumo de energia e maior vida útil do aparelho. Atendemos split hi-wall, multi-split, piso-teto e cassete, além de limpeza e manutenção preventiva.",
    whyNow:
      "Em obra nova ou reforma, a infraestrutura (tubulação de cobre, dreno e ponto elétrico) pode ficar embutida na parede antes do acabamento, o que deixa a instalação mais bonita e mais barata.",
    includes: [
      "Cálculo de BTUs para cada ambiente",
      "Infraestrutura embutida para obra nova",
      "Instalação de split, multi-split e outros modelos",
      "Limpeza, higienização e manutenção preventiva",
    ],
    tips: [
      "Informe o tamanho do cômodo e a incidência de sol: isso define os BTUs.",
      "Prefira aparelhos inverter, que gastam menos energia.",
      "Confirme se o orçamento inclui suporte, tubulação, dreno e ponto elétrico.",
      "A garantia do fabricante costuma exigir instalação por técnico qualificado.",
    ],
    faq: [
      { q: "Quantos BTUs eu preciso?", a: "Como regra geral, cerca de 600 a 800 BTUs por metro quadrado, mais um ajuste para sol forte, pessoas e aparelhos no ambiente. O técnico confirma na visita." },
      { q: "Posso deixar a infraestrutura pronta e instalar depois?", a: "Sim. É comum em obras: a tubulação fica embutida e o aparelho é instalado quando você quiser." },
      { q: "De quanto em quanto tempo devo fazer manutenção?", a: "A limpeza de filtros pode ser mensal, feita por você. A higienização completa é recomendada a cada 6 a 12 meses." },
    ],
    pricing: {
      updated: "outubro de 2026",
      intro:
        "O custo do ar-condicionado se divide em aparelho e instalação. Abaixo estão faixas de referência para split hi-wall residencial.",
      ranges: [
        { item: "Instalação de split 9.000 a 12.000 BTUs (até 3 m de tubulação)", range: "R$ 450 a R$ 900" },
        { item: "Instalação de split 18.000 a 24.000 BTUs", range: "R$ 700 a R$ 1.300" },
        { item: "Infraestrutura embutida em obra (por ponto)", range: "R$ 500 a R$ 1.200" },
        { item: "Higienização completa de split", range: "R$ 180 a R$ 350" },
        { item: "Aparelho split inverter 12.000 BTUs", range: "R$ 2.200 a R$ 3.800", note: "varia muito por marca" },
      ],
      factors: [
        "Capacidade do aparelho (BTUs) e modelo",
        "Metros de tubulação e altura da instalação",
        "Necessidade de ponto elétrico novo ou disjuntor dedicado",
        "Instalação embutida ou aparente",
        "Acesso à condensadora (fachada, telhado, andaime)",
      ],
      saveTips: [
        "Faça a infraestrutura durante a obra, antes do acabamento.",
        "Instale vários aparelhos de uma vez para negociar o preço por ponto.",
        "Prefira modelos inverter: o aparelho custa mais, a conta de luz cai.",
      ],
    },
  },
};

export type CityContent = { intro: string; neighborhoods: string };

export const cityContent: Record<City, CityContent> = {
  Salto: {
    intro:
      "Salto, a Estância Turística às margens do rio Tietê, vive uma fase de novos loteamentos e condomínios. Muitas famílias estão construindo, reformando ou se mudando para a cidade.",
    neighborhoods: "Atendemos todos os bairros de Salto, do centro aos condomínios e loteamentos novos.",
  },
  Itu: {
    intro:
      "Itu combina casas históricas no centro com grandes condomínios residenciais. Reformas e obras novas convivem lado a lado, e cada uma pede um tipo diferente de projeto.",
    neighborhoods: "Atendemos o centro, os bairros residenciais e os condomínios de Itu.",
  },
  Indaiatuba: {
    intro:
      "Indaiatuba é uma das cidades que mais crescem na região, com muitos apartamentos e condomínios entregues nos últimos anos. É o momento de equipar o imóvel novo.",
    neighborhoods: "Atendemos todas as regiões de Indaiatuba, incluindo os condomínios e os empreendimentos recém-entregues.",
  },
};
