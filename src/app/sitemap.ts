import type { MetadataRoute } from "next";
import { projects } from "@/config/portfolio";
import { site } from "@/config/site";
import { locales } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/pedido", "/previa", "/privacidade", "/termos", ...projects.map((p) => `/projetos/${p.slug}`)];
  return locales.flatMap((locale) =>
    paths.map((p) => ({ url: `${site.url}/${locale}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.6 })),
  );
}
