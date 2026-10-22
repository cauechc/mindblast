import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/pt/checkout/", "/en/checkout/", "/pt/meu-projeto", "/en/meu-projeto", "/admin"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
