import { NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  adminFromRequest,
  adminLoginConfigured,
  checkCredentials,
  clearFailedSignIns,
  clientAddress,
  createSessionValue,
  recordFailedSignIn,
  sessionCookieOptions,
  tooManyFailedSignIns,
} from '@/lib/adminSession';

export const dynamic = 'force-dynamic';

const userInfo = (username: string) => ({
  username,
  role: 'CDMO Content Administrator',
  name: 'Lambda Administrator',
});

/** Sign in: checks the credentials on the server and sets the session cookie. */
export async function POST(request: Request) {
  const address = clientAddress(request);
  try {
    if (!adminLoginConfigured()) {
      return NextResponse.json(
        { success: false, error: 'Admin sign-in is not set up on this server yet (ADMIN_USERNAME / ADMIN_PASSWORD).' },
        { status: 503 }
      );
    }
    if (tooManyFailedSignIns(address)) {
      return NextResponse.json(
        { success: false, error: 'Too many failed attempts. Please wait 15 minutes and try again.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const username = typeof body?.username === 'string' ? body.username : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Username and password are required' }, { status: 400 });
    }

    if (!checkCredentials(username, password)) {
      recordFailedSignIn(address);
      return NextResponse.json({ success: false, error: 'Invalid username or password. Access denied.' }, { status: 401 });
    }

    clearFailedSignIns(address);
    const signedIn = username.trim();
    const response = NextResponse.json({ success: true, message: 'Authentication successful', user: userInfo(signedIn) });
    response.cookies.set(ADMIN_SESSION_COOKIE, createSessionValue(signedIn), sessionCookieOptions(request));
    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 });
  }
}

/** Is this browser signed in? Used by the admin screens when they open. */
export async function GET(request: Request) {
  const username = adminFromRequest(request);
  return NextResponse.json(
    username ? { success: true, authenticated: true, user: userInfo(username) } : { success: true, authenticated: false },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

/** Sign out: removes the session cookie. */
export async function DELETE(request: Request) {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, '', sessionCookieOptions(request, 0));
  return response;
}
