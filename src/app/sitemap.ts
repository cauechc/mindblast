import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { localPaths } from "@/lib/paths";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    ...localPaths().map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site.url}/privacidade`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/termos`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
