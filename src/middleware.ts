import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


const isProtectedRoute = createRouteMatcher([  
 
]);

export default clerkMiddleware((auth, req) => {  
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers.get('host');
  const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  // if subdomain exists
  const customSubDomain = hostname
    ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0];

  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    );
  }

  if (url.pathname === '/sign-up' || url.pathname === '/sign-in'){
    return NextResponse.redirect(new URL(`/agency/sign-in`, req.url))
  }

  if (url.pathname === '/' || 
    (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)){
      return NextResponse.rewrite(new URL('/site', req.url))
    }
  
  if (url.pathname.startsWith('/ageny') || url.pathname.startsWith('/subaccount')){
    return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
  }
  
  // If the route is protected, apply the Clerk middleware
  if (isProtectedRoute(req)) {
    return;
  }

  

});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};