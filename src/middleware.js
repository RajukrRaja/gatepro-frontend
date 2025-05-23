import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  console.log('Middleware: Token retrieved from cookie:', token);
  console.log('Middleware: Requested path:', request.nextUrl.pathname);

  if (!token) {
    console.log('Middleware: No token found, redirecting to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const jwtSecret = process.env.JWT_SECRET;
  console.log('Middleware: Verifying token with JWT_SECRET:', jwtSecret);

  if (!jwtSecret) {
    console.error('Middleware: JWT_SECRET is not defined in environment variables');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });
    console.log('Middleware: Token decoded:', payload);
    console.log('Middleware: User role:', payload.role);

    const { pathname } = request.nextUrl;

    // Normalize role to lowercase to prevent case sensitivity issues
    const userRole = payload.role?.toLowerCase();

    // Allow access if role matches the route
    if (pathname.startsWith('/admin') && userRole === 'admin') {
      console.log('Middleware: Admin access granted for /admin');
      return NextResponse.next();
    }
    if (pathname.startsWith('/teacher') && userRole === 'teacher') {
      console.log('Middleware: Teacher access granted for /teacher');
      return NextResponse.next();
    }
    if (pathname.startsWith('/student') && userRole === 'student') {
      console.log('Middleware: Student access granted for /student');
      return NextResponse.next();
    }

    // Redirect to / if role doesn't match
    console.log(`Middleware: Role ${userRole} not authorized for ${pathname}, redirecting to /`);
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Middleware: Token verification failed:', error.message);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/teacher/:path*', '/student/:path*'],
};