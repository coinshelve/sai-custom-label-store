import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "admin";

  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login?next=/admin", req.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/account", req.url));
    }
  }

  if (pathname.startsWith("/account") && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/login?next=${pathname}`, req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
