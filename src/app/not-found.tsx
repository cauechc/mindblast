import Link from "next/link";
import { buttonStyles } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-navy-50 px-4 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Erro 404</p>
        <h1 className="mt-3 text-3xl font-extrabold text-navy-900">Página não encontrada</h1>
        <p className="mt-3 text-muted">O endereço pode ter mudado. Volte ao início e peça seus orçamentos.</p>
        <Link href="/" className={`${buttonStyles.primary} mt-8`}>
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
