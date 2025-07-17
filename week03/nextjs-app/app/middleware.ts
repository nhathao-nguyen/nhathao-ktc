import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value

  if (!token && request.nextUrl.pathname.startsWith('/lesson14/dashboard')) {
    return NextResponse.redirect(new URL('/lesson14/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/lesson14/dashboard'],
}
