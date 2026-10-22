import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n";

/** Redireciona "/" e rotas sem idioma para /pt ou /en. */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return;

  const saved = req.cookies.get("locale")?.value;
  const accept = req.headers.get("accept-language") ?? "";
  const locale =
    saved && isLocale(saved) ? saved : /^\s*pt/i.test(accept) || !/^\s*en/i.test(accept) ? defaultLocale : "en";

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
