import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/database.types'
import { revalidatePath } from 'next/cache';


export async function middleware(req: NextRequest) {
  
  
  const url = new URL(req.url);
  const origin = url.origin;
  const pathname = url.pathname;
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', req.url);
  requestHeaders.set('x-origin', origin);
  requestHeaders.set('x-pathname', pathname);

  const res =  NextResponse.next({
    request: {
        headers: requestHeaders,
    }
  });

  //revalidatePath(req.url)

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res })
  // Refresh session if expired - required for Server Components
  const session=await supabase.auth.getSession()

  return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}