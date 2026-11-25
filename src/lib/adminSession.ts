/**
 * Admin sign-in for the CMS: credentials, a signed session cookie, and the check every admin API runs.
 *
 * Credentials come from the server's environment, never from the code:
 *   ADMIN_USERNAME        the admin user name
 *   ADMIN_PASSWORD        the admin password (required in production; without it nobody can sign in)
 *   ADMIN_SESSION_SECRET  optional key that signs session cookies; when unset it is derived from the
 *                         password, so changing the password also signs everyone out
 *
 * In `npm run dev` (not production) a local development login is used when they are unset, so the CMS
 * and its test scripts keep working on a developer machine.
 *
 * The session is an httpOnly cookie holding "<user>.<expires>.<signature>". Pages and admin API routes
 * call `isAdminRequest` / `requireAdmin`; `src/proxy.ts` uses `hasAdminSessionCookie` to hide draft
 * previews from visitors.
 */
import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

export const ADMIN_SESSION_COOKIE = 'lambda_admin_session';
const SESSION_HOURS = 12;

// Local development only (`npm run dev`, scripts). Never used when NODE_ENV is "production".
const DEV_USERNAME = 'adminlamda';
const DEV_PASSWORD = 'dev-only-admin';

const isProduction = () => process.env.NODE_ENV === 'production';

function credentials(): { username: string; password: string } | null {
  const username = (process.env.ADMIN_USERNAME || '').trim();
  const password = process.env.ADMIN_PASSWORD || '';
  if (username && password) return { username, password };
  if (!isProduction()) return { username: username || DEV_USERNAME, password: password || DEV_PASSWORD };
  return null;
}

/** False on a production server that has no ADMIN_USERNAME / ADMIN_PASSWORD set. */
export const adminLoginConfigured = () => credentials() !== null;

function secret(): string | null {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit && explicit.length >= 16) return explicit;
  const creds = credentials();
  return creds ? createHash('sha256').update(`lambda-cms-session|${creds.username}|${creds.password}`).digest('hex') : null;
}

const sign = (payload: string, key: string) => createHmac('sha256', key).update(payload).digest('base64url');

function sameText(a: string, b: string): boolean {
  // Compare hashes so the comparison takes the same time whatever the lengths are
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkCredentials(username: string, password: string): boolean {
  const creds = credentials();
  if (!creds) return false;
  // Evaluate both so a wrong user name and a wrong password take the same time
  const userOk = sameText(username.trim(), creds.username);
  const passOk = sameText(password, creds.password);
  return userOk && passOk;
}

export function adminUsername(): string {
  return credentials()?.username || '';
}

export function createSessionValue(username: string): string {
  const key = secret();
  if (!key) throw new Error('Admin sign-in is not configured on this server.');
  const expires = Date.now() + SESSION_HOURS * 3600 * 1000;
  const payload = `${Buffer.from(username).toString('base64url')}.${expires}`;
  return `${payload}.${sign(payload, key)}`;
}

/** The signed-in user name, or null when the cookie value is missing, tampered with or expired. */
export function verifySessionValue(value: string | undefined | null): string | null {
  if (!value) return null;
  const key = secret();
  if (!key) return null;
  const parts = value.split('.');
  if (parts.length !== 3) return null;
  const [userPart, expiresPart, signature] = parts;
  const expected = sign(`${userPart}.${expiresPart}`, key);
  const given = Buffer.from(signature);
  const want = Buffer.from(expected);
  if (given.length !== want.length || !timingSafeEqual(given, want)) return null;
  const expires = Number(expiresPart);
  if (!Number.isFinite(expires) || Date.now() > expires) return null;
  const username = Buffer.from(userPart, 'base64url').toString();
  return username === adminUsername() ? username : null;
}

function cookieValue(request: Request, name: string): string | null {
  const header = request.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq > 0 && part.slice(0, eq).trim() === name) return decodeURIComponent(part.slice(eq + 1).trim());
  }
  return null;
}

/** The signed-in admin's user name for this request, or null. */
export function adminFromRequest(request: Request): string | null {
  return verifySessionValue(cookieValue(request, ADMIN_SESSION_COOKIE));
}

export const isAdminRequest = (request: Request) => adminFromRequest(request) !== null;

/**
 * Call first in every admin API handler:
 *   const denied = requireAdmin(request); if (denied) return denied;
 */
export function requireAdmin(request: Request): NextResponse | null {
  if (isAdminRequest(request)) return null;
  return NextResponse.json(
    { success: false, error: 'Your admin session has ended. Please sign in again.', code: 'ADMIN_SIGN_IN_REQUIRED' },
    { status: 401 }
  );
}

/** Cookie settings: secure whenever the site is reached over HTTPS (directly or behind a proxy). */
export function sessionCookieOptions(request: Request, maxAgeSeconds = SESSION_HOURS * 3600) {
  const forwarded = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
  const https = forwarded ? forwarded === 'https' : new URL(request.url).protocol === 'https:';
  return {
    httpOnly: true,
    secure: https,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

/* ── Failed sign-in limit: 8 wrong attempts per address in 15 minutes ── */
const FAIL_WINDOW_MS = 15 * 60 * 1000;
const FAIL_LIMIT = 8;
const g = globalThis as unknown as { __lambdaAdminFails?: Map<string, number[]> };
const fails = (g.__lambdaAdminFails ??= new Map<string, number[]>());

export function clientAddress(request: Request): string {
  // The last X-Forwarded-For entry is the one our own web proxy added; earlier entries come from the
  // client and can be made up.
  const forwarded = (request.headers.get('x-forwarded-for') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return request.headers.get('x-real-ip')?.trim() || forwarded[forwarded.length - 1] || 'local';
}

function recentFails(address: string): number[] {
  const now = Date.now();
  const list = (fails.get(address) || []).filter((t) => now - t < FAIL_WINDOW_MS);
  if (list.length) fails.set(address, list);
  else fails.delete(address);
  return list;
}

export const tooManyFailedSignIns = (address: string) => recentFails(address).length >= FAIL_LIMIT;

export function recordFailedSignIn(address: string) {
  fails.set(address, [...recentFails(address), Date.now()]);
  if (fails.size > 5000) fails.clear(); // keep memory bounded
}

export const clearFailedSignIns = (address: string) => fails.delete(address);
