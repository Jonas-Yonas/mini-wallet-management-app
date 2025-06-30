import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    /** Redirect to dashboard if accessing root while authenticated */
    if (req.nextUrl.pathname === "/" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    /** Allow access to these specific routes without redirect */
    const publicRoutes = ["/login", "/register", "/"];
    if (publicRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        /** Skip auth check for public routes */
        const publicRoutes = ["/login", "/register", "/"];
        if (publicRoutes.includes(req.nextUrl.pathname)) {
          return true;
        }
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
