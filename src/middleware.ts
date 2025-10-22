import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ['/dashboard'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const cookie = await cookies();
  const auth = cookie.get("token");

  if (isProtectedRoute && !auth) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  if (auth && ["/signin", '/signup'].includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}