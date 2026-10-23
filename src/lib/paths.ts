import { cities, citySlug, services, type City, type ServiceId } from "@/config/site";

/** Endereços das páginas locais de SEO. */
export const servicePath = (s: ServiceId) => `/${s}`;
export const serviceCityPath = (s: ServiceId, c: City) => `/${s}/${citySlug(c)}`;
export const cityPath = (c: City) => `/cidade/${citySlug(c)}`;
export const pricePath = (s: ServiceId) => `/quanto-custa/${s}`;

/** Todas as páginas locais, para o sitemap. */
export const localPaths = () => [
  ...services.map((s) => servicePath(s.id)),
  ...services.flatMap((s) => cities.map((c) => serviceCityPath(s.id, c))),
  ...cities.map(cityPath),
  ...services.map((s) => pricePath(s.id)),
];
