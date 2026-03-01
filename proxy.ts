import { NextRequest, NextResponse } from 'next/server';
import { PROTECTED_ROUTES, PUBLIC_ROUTES, STORAGE_KEYS } from './lib/constants';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const publicPaths = Object.values(PUBLIC_ROUTES.AUTH);

  const isPublicRoute = publicPaths.some((route) => pathname.startsWith(route));
  const token = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;

  if (!isPublicRoute && !token) {
    const signinUrl = new URL(PUBLIC_ROUTES.AUTH.SIGNIN, request.url);
    return NextResponse.redirect(signinUrl);
  }

  if (isPublicRoute && token) {
    const dashboardUrl = new URL(PROTECTED_ROUTES.DASHBOARD.HOME, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)'],
};
