import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Get the token from cookies

  // List of protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  // Check if the user is trying to access a protected route without a token
  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login
  }

  return NextResponse.next(); // Allow the request if token exists
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/dashboards", "/settings"], // Protect these routes
};

