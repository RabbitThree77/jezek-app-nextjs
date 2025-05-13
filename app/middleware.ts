import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const password = request.cookies.get('password')?.value;
  const sharedSecret = process.env.SHARED_SECRET;

  // Allow access to /login regardless of password
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Allow access if the password matches the shared secret
  if (password === sharedSecret) {
    return NextResponse.next();
  }

  // Redirect to /login if not authenticated
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/login';
  return NextResponse.redirect(loginUrl);
}