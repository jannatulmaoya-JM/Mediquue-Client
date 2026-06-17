import { NextResponse } from "next/server";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  
  const normalToken = request.cookies.get("better-auth.session_token")?.value;
  const secureToken = request.cookies.get("__secure-better-auth.session_token")?.value;
  const sessionToken = normalToken || secureToken;

  const privateRoutes = ["/add-tutor", "/my-tutors", "/my-bookings"];
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));


  if (isPrivateRoute && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname); 
    return NextResponse.redirect(loginUrl);
  }

  
  if (sessionToken && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-tutor/:path*", 
    "/my-tutors/:path*", 
    "/my-bookings/:path*", 
    "/login", 
    "/register"
  ],
};