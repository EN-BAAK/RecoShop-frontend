import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { accessGuid } from "./constants/global";
import { AccessItem } from "./types/global";
import { validateAuthenticationWithCaching } from "./api-client";
import { ROLE } from "./types/variables";

function findMatchedRoute(
  pathname: string,
  items: AccessItem[],
  parent?: AccessItem
): Omit<AccessItem, "children" | "path"> | undefined {
  for (const item of items) {
    if (pathname.startsWith(item.path)) {
      const merged: AccessItem = {
        ...item,
        roles: item.roles.length > 0 ? item.roles : parent?.roles ?? [],
      };
      if (item.children) {
        const childMatch = findMatchedRoute(pathname, item.children, merged);
        return childMatch || merged;
      }
      return { authorized: merged.authorized, roles: merged.roles };
    }
  }
}

export async function middleware(req: NextRequest) {
  const cookieName = process.env.COOKIE_NAME!;
  const token = req.cookies.get(cookieName)?.value;
  const { pathname } = req.nextUrl;

  const matched = findMatchedRoute(pathname, accessGuid);

  if (!matched) return NextResponse.next();
  if (!matched.authorized) {
    if (token) return NextResponse.redirect(new URL("/dashboard", req.url));
    return NextResponse.next();
  }
  if (matched.authorized) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    const reqAuth = await validateAuthenticationWithCaching(token)

    if (matched.roles.length > 0 && !matched.roles.includes(reqAuth?.data.role as ROLE))
      return NextResponse.redirect(new URL("/dashboard", req.url));

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/verify/:path*",
    "/forgot-password",
  ],
};