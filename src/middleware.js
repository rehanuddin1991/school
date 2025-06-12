import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// JWT_SECRET Base64 format-এ encode করা উচিত (Edge এর জন্য)
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return null;
  }
}

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    // No token → redirect to login
    if (url.pathname.startsWith('/dashboard')) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const user = await verifyToken(token);

  if (!user) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Role-based redirects
  if (url.pathname === '/dashboard/admin' && user.role !== 'ADMIN') {
    url.pathname = '/dashboard/user';
    return NextResponse.redirect(url);
  }

  if (url.pathname === '/dashboard/user' && user.role !== 'USER') {
    url.pathname = '/dashboard/admin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
