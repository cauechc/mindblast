import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Login do painel com uma senha só (ADMIN_PASSWORD). A sessão é um cookie assinado com
 * ADMIN_SESSION_SECRET (ou a própria senha), válido por 7 dias.
 */
export const ADMIN_COOKIE = "cn_admin";
const MAX_AGE = 7 * 24 * 3600;

const secret = () => process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";

const sign = (value: string) => createHmac("sha256", secret()).update(value).digest("hex");

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && safeEqual(sign(password), sign(expected!));
}

export function sessionToken() {
  const expires = String(Math.floor(Date.now() / 1000) + MAX_AGE);
  return { value: `${expires}.${sign(`admin.${expires}`)}`, maxAge: MAX_AGE };
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) < Date.now() / 1000) return false;
  return safeEqual(sig, sign(`admin.${expires}`));
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
