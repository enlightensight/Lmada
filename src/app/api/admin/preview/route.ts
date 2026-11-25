import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminSession';
import { savePreviewPage } from '@/lib/previewStore';
import type { CDMOPage } from '@/data/cdmoData';

export const dynamic = 'force-dynamic';

/**
 * Stores the editor's current, unsaved page for the live preview pane.
 * Body: { page, id? } -> { success, id }. Open the page with ?preview=true&previewId=<id>.
 */
export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = await request.json();
    const page = body?.page as CDMOPage | undefined;
    if (!page || typeof page !== 'object' || !page.category || !page.slug) {
      return NextResponse.json({ success: false, error: 'A page with category and slug is required.' }, { status: 400 });
    }
    const id = savePreviewPage(page, typeof body.id === 'string' ? body.id : undefined);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Could not store the preview.' },
      { status: 500 }
    );
  }
}
