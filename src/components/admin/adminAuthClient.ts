'use client';

/**
 * Browser side of the admin sign-in. The session itself is an httpOnly cookie set by
 * /api/admin/auth; these helpers only ask the server about it.
 */
export interface AdminUser {
  username: string;
  role?: string;
  name?: string;
}

// Keys an older version of the admin kept in localStorage (it trusted them without asking the server)
const LEGACY_KEYS = ['lambda_admin_auth', 'lambda_admin_token', 'lambda_admin_user'];

function clearLegacyKeys() {
  try {
    LEGACY_KEYS.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    /* storage unavailable */
  }
}

/** The signed-in admin, or null. */
export async function fetchAdminSession(): Promise<AdminUser | null> {
  clearLegacyKeys();
  try {
    const res = await fetch('/api/admin/auth', { cache: 'no-store' });
    const data = await res.json();
    return data?.authenticated ? (data.user as AdminUser) : null;
  } catch {
    return null;
  }
}

export async function signOutAdmin(): Promise<void> {
  clearLegacyKeys();
  try {
    await fetch('/api/admin/auth', { method: 'DELETE' });
  } catch {
    /* the cookie expires on its own */
  }
}
