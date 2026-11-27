/**
 * The site can run under a sub-folder of another domain, e.g. https://www.lambda-cro.com/CDMOtest
 * (build with NEXT_BASE_PATH=/CDMOtest; see scripts/build_server_package.mjs). Next.js then prefixes its own
 * links (<Link>), redirects, router and /_next files, but not plain paths such as an <img src="/images/a.png">,
 * a fetch('/api/...') or an image path stored in the CMS. Every such path goes through withBase().
 *
 * With no sub-folder (Render, local development) BASE_PATH is '' and withBase returns its input unchanged.
 * CMS content always keeps plain '/images/...' paths; the prefix is only added when rendering.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/+$/, '');

/** '/images/a.png' -> '/CDMOtest/images/a.png'. Leaves full URLs, '//host', '#id', data: and non-strings alone. */
export function withBase<T>(value: T): T {
  if (!BASE_PATH || typeof value !== 'string') return value;
  if (!value.startsWith('/') || value.startsWith('//')) return value;
  if (value === BASE_PATH || value.startsWith(`${BASE_PATH}/`) || value.startsWith(`${BASE_PATH}?`)) return value;
  return `${BASE_PATH}${value}` as T;
}

/** The reverse, for paths read back from the page (e.g. an uploaded file's address) before they are stored. */
export function withoutBase(value: string): string {
  if (!BASE_PATH) return value;
  if (value === BASE_PATH) return '/';
  return value.startsWith(`${BASE_PATH}/`) ? value.slice(BASE_PATH.length) : value;
}
