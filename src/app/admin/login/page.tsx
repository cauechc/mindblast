"use client";

import { useActionState } from "react";
import { Logo } from "@/components/Logo";
import { buttonStyles } from "@/components/ui";
import { login } from "../actions";

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <form action={action} className="w-full max-w-sm rounded-3xl border border-white/8 bg-navy-800 p-8 shadow-card">
        <Logo className="text-lg" />
        <h1 className="mt-8 font-display text-2xl text-white">Painel</h1>
        <label className="mt-6 block text-sm text-soft">
          Senha
          <input
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3 text-ice outline-none focus:border-blast"
          />
        </label>
        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
        <button disabled={pending} className={`${buttonStyles.primary} mt-6 w-full`}>
          Entrar
        </button>
      </form>
    </main>
  );
}
