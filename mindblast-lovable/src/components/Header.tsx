import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./icons";
import { buttonStyles, goToQuote } from "./ui";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#precos", label: "Preços" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const cta = () => {
    setOpen(false);
    goToQuote();
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b border-white/5 bg-navy-950/90 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#topo" aria-label="Mind Blast" className="text-xl" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-soft transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <button type="button" onClick={cta} className={`${buttonStyles.primary} hidden !px-5 !py-2.5 lg:inline-flex`}>
          Peça seu orçamento
        </button>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="rounded-full p-2 text-ice hover:bg-white/5 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Menu" className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/5 bg-navy-950 px-4 pb-24 pt-4 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-white/5 py-4 font-display text-2xl text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" onClick={cta} className={`${buttonStyles.primary} mt-8 w-full`}>
            Peça seu orçamento
          </button>
        </nav>
      )}
    </header>
  );
}
