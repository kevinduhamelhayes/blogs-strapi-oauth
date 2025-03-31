import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/ssr';

// Paths that don't require authentication
const publicPaths = ['/login', '/terminos'];

export async function middleware(request: NextRequest) {
  // Initialize Supabase client using cookies from the request
  const cookieStore = request.cookies;
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          // This is a read-only context, so we don't set cookies here
        },
        remove(name: string, options: any) {
          // This is a read-only context, so we don't remove cookies here
        },
      },
    }
  );

  // Check if the user is authenticated
  const { data: { session } } = await supabase.auth.getSession();

  // Get pathname
  const path = request.nextUrl.pathname;
  
  // Check if the path is public or private
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith(`${publicPath}/`)
  );

  // If the path is public and the user is logged in, redirect to home
  // (except for /terminos which is accessible to logged-in users)
  if (isPublicPath && session && path !== '/terminos') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the path is private and the user is not logged in, redirect to login
  if (!isPublicPath && !session) {
    // Remember the page they tried to visit for after login
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirectTo', path);
    
    return NextResponse.redirect(redirectUrl);
  }

  // Otherwise, continue
  return NextResponse.next();
}

// Specify which routes this middleware will run on
export const config = {
  matcher: [
    // Exclude static files, api routes, and _next
    '/((?!_next/static|_next/image|images|favicon.ico|api/).*)',
  ],
}; 