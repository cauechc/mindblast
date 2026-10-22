"use client";

import { useActionState } from "react";
import { Logo } from "@/components/icons";
import { buttonStyles } from "@/components/ui";
import { login } from "../actions";

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <form action={action} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-card">
        <Logo />
        <h1 className="mt-8 text-2xl font-extrabold text-navy-900">Painel de leads</h1>
        <label className="mt-6 block text-sm font-bold text-navy-900">
          Senha
          <input
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="mt-1.5 w-full rounded-xl border-2 border-navy-100 px-4 py-3 outline-none focus:border-leaf"
          />
        </label>
        {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
        <button disabled={pending} className={`${buttonStyles.primary} mt-6 w-full`}>
          Entrar
        </button>
      </form>
    </main>
  );
}
