import { Mail, MapPin } from "lucide-react";
import { Contact } from "./components/Contact";
import { Header } from "./components/Header";
import { InstagramIcon, Logo, WhatsAppIcon } from "./components/icons";
import { Explainer, Hero, HowItWorks, Portfolio, Pricing, Services } from "./components/Sections";
import { Container } from "./components/ui";
import { genericWhatsappText, services, site, whatsappUrl } from "./config/site";

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950 pb-28 pt-16 lg:pb-12">
      <Container className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="text-xl" />
          <p className="mt-5 max-w-sm text-sm text-soft">{site.region}</p>
          <div className="mt-5 flex flex-col gap-2 text-sm text-soft">
            <a href={`tel:+${site.whatsapp.number}`} className="inline-flex items-center gap-2 hover:text-white">
              <WhatsAppIcon className="h-4 w-4" /> {site.whatsapp.display}
            </a>
            <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <InstagramIcon className="h-4 w-4" /> @{site.instagram}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-white">
              <Mail className="h-4 w-4" /> {site.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Salto e região
            </span>
          </div>
        </div>
        <nav aria-label="Links rápidos">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blast-400">Links rápidos</p>
          <ul className="mt-4 space-y-2.5 text-sm text-soft">
            <li><a className="hover:text-white" href="#servicos">Serviços</a></li>
            <li><a className="hover:text-white" href="#portfolio">Portfólio</a></li>
            <li><a className="hover:text-white" href="#como-funciona">Como funciona</a></li>
            <li><a className="hover:text-white" href="#precos">Preços</a></li>
            <li><a className="hover:text-white" href="#contato">Peça seu orçamento</a></li>
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blast-400">Serviços</p>
          <ul className="mt-4 space-y-2.5 text-sm text-soft">
            {services.map((s) => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="mt-14 border-t border-white/5 pt-6 text-xs text-soft/80">
        <p>© {new Date().getFullYear()} {site.fullName} · Todos os direitos reservados.</p>
      </Container>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(genericWhatsappText)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-wa text-navy-950 shadow-[0_10px_30px_-5px_rgb(37_211_102/0.55)] transition hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Explainer />
        <Portfolio />
        <HowItWorks />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
