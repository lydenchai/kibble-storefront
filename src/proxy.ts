import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Get the is_authenticated cookie
  const isAuthenticated = request.cookies.has('is_authenticated');

  // Define paths that require authentication
  const isProtectedPath = request.nextUrl.pathname.startsWith('/account') || request.nextUrl.pathname.startsWith('/checkout');

  // If it's a protected path and the user is NOT authenticated, redirect to login
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Define paths that are ONLY for unauthenticated users (e.g. login, signup)
  const isAuthPath = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup');

  // If it's an auth path and user IS authenticated, redirect to home or account
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware only to protected and auth routes to optimize performance
  matcher: ['/account/:path*', '/checkout/:path*', '/login', '/signup'],
};
