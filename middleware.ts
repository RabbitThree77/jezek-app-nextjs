import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value;
    console.log(token);
    const isLoggedIn = token === process.env.SHARED_SECRET;
    console.log(process.env.SHARED_SECRET)

    const { pathname } = req.nextUrl;

    const isPublicPath = pathname.startsWith('/login') || pathname.startsWith('/api')

    if (isLoggedIn  || isPublicPath) {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/login', req.url))
}

export const config = {
  matcher: ['/', '/((?!_next|favicon.ico).*)'],
};