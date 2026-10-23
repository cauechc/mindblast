"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, checkPassword, requireAdmin, sessionToken } from "@/lib/admin-auth";
import { leadStatuses, updateLead, type LeadStatus } from "@/lib/store";

export async function login(_: string | null, form: FormData) {
  if (!checkPassword(String(form.get("password") ?? ""))) return "Senha incorreta.";
  const token = sessionToken();
  (await cookies()).set(ADMIN_COOKIE, token.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: token.maxAge,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin/login");
}

export async function setLeadStatus(id: string, form: FormData) {
  await requireAdmin();
  const status = String(form.get("status")) as LeadStatus;
  if (!leadStatuses.includes(status)) return;
  await updateLead(id, { status, notes: String(form.get("notes") ?? "").trim().slice(0, 2000) || undefined });
  revalidatePath("/admin");
}
