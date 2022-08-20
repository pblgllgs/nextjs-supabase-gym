import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/create")) {
    const cookie = request.cookies.get("aud");
    if (cookie !== "authenticated") {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const aud = request.cookies.get("aud");
    const id = request.cookies.get("id");
    if (
      aud === "authenticated" &&
      id === "44436d98-900e-49f3-9b3b-577d8c23aaf4"
    ) {
      return NextResponse.next();
    } else {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
}

export const config = {
  matcher: ["/create/:path*", "/admin/:path*"],
};
