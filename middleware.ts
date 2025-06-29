import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    /** Redirect to dashboard if accessing root while authenticated */
    if (req.nextUrl.pathname === "/" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/transactions/:path*",
    /** Add other protected routes here if needed */
  ],
};
