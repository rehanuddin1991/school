import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/auth';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;  
  const url = req.nextUrl.clone();

  const user = verifyToken(token);
 
  if (!user) {
    if (url.pathname.startsWith('/dashboard')) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

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
