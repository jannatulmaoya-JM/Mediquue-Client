import { NextResponse } from "next/server";

export async function middleware(request) {
  // BetterAuth সেশন কুকি চেক (প্রজেক্ট ভেদে কুকির নাম সামান্য ভিন্ন হতে পারে)
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;
  const { pathname } = request.nextUrl;

  const privateRoutes = ["/add-tutor", "/my-tutors", "/my-bookings"];
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (isPrivateRoute && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname); // আগের লোকেশন ট্র্যাক রাখা
    return NextResponse.redirect(loginUrl);
  }

  if (sessionToken && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-tutor/:path*", "/my-tutors/:path*", "/my-bookings/:path*", "/login", "/register"],
};