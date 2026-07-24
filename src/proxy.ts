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

  return NextResponse.next();
}

export const config = {
  // Apply middleware only to protected routes
  matcher: ['/account/:path*', '/checkout/:path*'],
};
