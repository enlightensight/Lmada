import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_SESSION_COOKIE, verifySessionValue } from '@/lib/adminSession';

/**
 * Draft previews (`?preview=true`, `?previewId=...`) show unpublished CMS content, so only a signed-in
 * admin may open them. Anyone else is sent to the same address without those parameters, i.e. the
 * published page. (The admin API checks sign-in itself, in every route handler.)
 */
const PREVIEW_PARAMS = ['preview', 'previewId'];

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  if (!PREVIEW_PARAMS.some((p) => url.searchParams.has(p))) return NextResponse.next();
  if (verifySessionValue(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) return NextResponse.next();

  // Next.js needs an absolute URL here; behind Apache/Nginx it is built from the forwarded Host and protocol
  // (the server's proxy config must pass them: ProxyPreserveHost On + X-Forwarded-Proto).
  const published = url.clone();
  PREVIEW_PARAMS.forEach((p) => published.searchParams.delete(p));
  return NextResponse.redirect(published, 307);
}

export const config = {
  // Pages only: not the API, Next.js assets or files with an extension (images, fonts, videos...)
  matcher: ['/((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).*)'],
};
