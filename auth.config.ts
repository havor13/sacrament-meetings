import type { NextAuthConfig } from 'next-auth';

function isAdminPath(path: string) {
  return path === '/meetings/new' || /^\/meetings\/[^/]+\/edit$/.test(path);
}

export const authConfig = {
  pages: { signIn: '/login' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isAdminPath(nextUrl.pathname)) return isLoggedIn;
      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/meetings', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;