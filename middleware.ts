import {NextRequest, NextResponse} from 'next/server';
import {getSession} from '@auth0/nextjs-auth0/edge';

export async function middleware(req: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });

  const user = await getSession(req, response);
  const token = user?.accessToken;

  response.headers.set('Authorization', `Bearer ${token}`);
  return response;
}

export const config = {
  matcher: ['/private/:path*', '/api/:path*', '/profile/:path*'],
};
