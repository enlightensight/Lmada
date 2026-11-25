/**
 * Signs the CMS test scripts in to the admin, like a browser would.
 *
 *   import { signInAdmin } from './admin_session.mjs';
 *   await signInAdmin(BASE);
 *
 * After that, every fetch() to BASE carries the admin session cookie (admin API calls and
 * ?preview=true page loads). Credentials: ADMIN_USERNAME / ADMIN_PASSWORD from the environment,
 * else from .env.local, else the development defaults the dev server uses when none are set.
 */
import fs from 'fs';
import path from 'path';

function readEnvLocal() {
  const out = {};
  try {
    const text = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf-8');
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
    }
  } catch {
    /* no .env.local */
  }
  return out;
}

export async function signInAdmin(base) {
  const local = readEnvLocal();
  const username = process.env.ADMIN_USERNAME || local.ADMIN_USERNAME || 'adminlamda';
  const password = process.env.ADMIN_PASSWORD || local.ADMIN_PASSWORD || 'dev-only-admin';

  const realFetch = globalThis.fetch;
  const res = await realFetch(`${base}/api/admin/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const setCookie = res.headers.get('set-cookie') || '';
  const cookie = setCookie.split(';')[0];
  if (!res.ok || !cookie.startsWith('lambda_admin_session=')) {
    const body = await res.text().catch(() => '');
    throw new Error(`Admin sign-in failed (${res.status}): ${body.slice(0, 200)}`);
  }

  const origin = new URL(base).origin;
  globalThis.fetch = (input, init = {}) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    let sameOrigin = false;
    try {
      sameOrigin = new URL(url, base).origin === origin;
    } catch {
      /* relative or odd URL: leave it alone */
    }
    if (!sameOrigin) return realFetch(input, init);
    const headers = new Headers(init.headers || (typeof input === 'object' && 'headers' in input ? input.headers : undefined));
    headers.set('cookie', cookie);
    return realFetch(input, { ...init, headers });
  };
  return cookie;
}
