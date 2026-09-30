import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ADMIN_USERNAME = 'adminlamda';
const ADMIN_PASSWORD = 'Insight2026@Lamda';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Generate secure session token
      const sessionToken = Buffer.from(
        `lambda_cdmo_admin_${username}_${Date.now()}`
      ).toString('base64');

      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        token: sessionToken,
        user: {
          username: ADMIN_USERNAME,
          role: 'CDMO Content Administrator',
          name: 'Lambda Administrator',
        },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password. Access denied.' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}
