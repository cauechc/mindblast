import Link from "next/link";
import { Logo } from "./icons";
import { QuoteLink } from "./QuoteLink";
import { buttonStyles } from "./ui";

const nav = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#duvidas", label: "Dúvidas" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/8 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Casa Nova Interior, página inicial">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-muted md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-navy-900">
              {n.label}
            </Link>
          ))}
        </nav>
        <QuoteLink className={`${buttonStyles.primary} !px-4 !py-2.5 !text-sm`}>
          <span className="hidden sm:inline">Solicitar Orçamento</span>
          <span className="sm:hidden">Pedir orçamento</span>
        </QuoteLink>
      </div>
    </header>
  );
}
