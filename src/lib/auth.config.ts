import type { NextAuthConfig } from "next-auth";

// Edge-safe config: no Prisma/bcrypt here so this can run in middleware.
// The Credentials provider itself is added in auth.ts (Node runtime only).
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      const isAppRoute = pathname.startsWith("/dashboard") ||
        pathname.startsWith("/learn") ||
        pathname.startsWith("/roadmap") ||
        pathname.startsWith("/arena") ||
        pathname.startsWith("/projects") ||
        pathname.startsWith("/profile");
      const isAdminRoute = pathname.startsWith("/admin");

      if (isAdminRoute) {
        return isLoggedIn && auth?.user?.role === "ADMIN";
      }
      if (isAppRoute) {
        return isLoggedIn;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: string }).role ?? "STUDENT";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "STUDENT";
      }
      return session;
    },
  },
};
