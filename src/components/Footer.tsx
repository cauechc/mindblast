import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { serviceContent } from "@/config/content";
import { cities, services, site, whatsappUrl } from "@/config/site";
import { cityPath, pricePath, serviceCityPath, servicePath } from "@/lib/paths";
import { Logo, WhatsAppIcon } from "./icons";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-navy-100/75">
            Plataforma regional que conecta moradores a profissionais de serviços residenciais. O orçamento é gratuito e sem compromisso. Um projeto da MindBlast.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Cidades atendidas</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {cities.map((c) => (
              <li key={c}>
                <Link href={cityPath(c)} className="flex items-center gap-2 hover:text-white">
                  <MapPin className="h-4 w-4 text-leaf-400" aria-hidden />
                  {c}/SP
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Serviços</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={servicePath(s.id)} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
            {services.map((s) => (
              <li key={`preco-${s.id}`}>
                <Link href={pricePath(s.id)} className="text-navy-100/70 hover:text-white">
                  {serviceContent[s.id].howMuch}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={whatsappUrl("Olá! Vim pelo site Casa Nova Interior.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
                <WhatsAppIcon className="h-4 w-4 text-wa" />
                WhatsApp {site.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-leaf-400" aria-hidden />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="pb-10">
        <h2 className="text-xs font-bold uppercase tracking-wider text-white/80">Orçamentos por cidade</h2>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-navy-100/70">
          {services.flatMap((s) =>
            cities.map((c) => (
              <li key={`${s.id}-${c}`}>
                <Link href={serviceCityPath(s.id, c)} className="hover:text-white">
                  {s.name} em {c}
                </Link>
              </li>
            )),
          )}
        </ul>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-navy-100/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Seus dados são tratados conforme a Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018) e usados só para responder ao seu pedido de orçamento.
          </p>
          <nav className="flex shrink-0 gap-5">
            <Link href="/privacidade" className="underline-offset-2 hover:text-white hover:underline">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="underline-offset-2 hover:text-white hover:underline">
              Termos de Uso
            </Link>
            <Link href="/privacidade#direitos" className="underline-offset-2 hover:text-white hover:underline">
              Seus direitos (LGPD)
            </Link>
          </nav>
        </Container>
        <Container className="pb-8 text-xs text-navy-100/50">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}, um projeto da {site.parent.name}{site.taxId ? ` · CNPJ ${site.taxId}` : ""}. Salto, Itu, Indaiatuba e Cabreúva/SP.
            </p>
            <p className="text-navy-100/70">
              Powered by <span className="font-bold text-white">{site.parent.name}</span>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
