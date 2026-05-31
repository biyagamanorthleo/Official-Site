import { NextResponse, type NextRequest } from 'next/server';

// Middleware intentionally minimal — auth is handled in app/admin/layout.tsx
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
