/**
 * FOTOS DO SITE. Use apenas fotos reais (suas ou de bancos como Unsplash/Pexels, com crédito).
 * Coloque o arquivo em /public/fotos e preencha `src` (ex.: "/fotos/hero.jpg") e `credit`.
 * Sem `src`, o site mostra um espaço marcado para a foto.
 */
type Photo = { src?: string; credit?: string };

export const images: Record<"hero" | "landing" | "institucional" | "app" | "contact", Photo> = {
  hero: {},
  landing: {},
  institucional: {},
  app: {},
  contact: {},
};

/** Descrição do que cada foto deve mostrar (também usada como texto alternativo). */
export const photoBriefs = {
  pt: {
    hero: "Dono de pequeno negócio olhando o próprio site no celular, luz natural",
    landing: "Mãos segurando um celular com um site aberto",
    institucional: "Notebook em mesa de madeira com café, caderno e luz do dia",
    app: "Designer e cliente de pequeno negócio em reunião, olhando o notebook",
    contact: "Web designer trabalhando no notebook em um home office real",
  },
  en: {
    hero: "Small business owner looking at their website on a phone, natural light",
    landing: "Hands holding a smartphone showing a website",
    institucional: "Laptop on a wooden desk with coffee, a notebook and daylight",
    app: "Designer meeting with a small business client, looking at a laptop",
    contact: "Web designer working on a laptop in a real home office",
  },
};
