"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import type { ServiceId } from "@/config/site";

/**
 * Link para o formulário de orçamento. Se a página tem o formulário, desce até ele
 * (e escolhe o serviço, se houver); se não tem, abre o formulário da página inicial.
 * Sem JavaScript, funciona como um link comum.
 */
export function QuoteLink({ service, className, children }: { service?: ServiceId; className?: string; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const query = service ? `?servico=${service}` : "";
  return (
    <a
      href={`${pathname}${query}#orcamento`}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        const form = document.getElementById("orcamento");
        if (!form) {
          router.push(`/${query}#orcamento`);
          return;
        }
        router.replace(`${pathname}${query || window.location.search}#orcamento`, { scroll: false });
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </a>
  );
}
