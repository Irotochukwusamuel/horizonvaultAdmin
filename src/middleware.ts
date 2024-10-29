import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export async function middleware(request: NextRequest) {
    let cookie = request.cookies.has('sessionId');


    if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "") {
        request.cookies.has('sessionId') && request.cookies.delete('sessionId')
    }

    if (!cookie) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin.toString()));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/users/:path*',
        '/admins/:path*',
        '/transactions/:path*',
    ],
};
