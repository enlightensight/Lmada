import { NextResponse } from 'next/server';
import {
  getDraftPageForAdmin,
  saveDraftPage,
  publishStoredPage,
  revertDraftPage,
  unpublishStoredPage,
  deleteStoredPage
} from '@/lib/pagesStorage';
import type { CDMOPage } from '@/data/cdmoData';

interface RouteContext {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function GET(req: Request, context: RouteContext) {
  try {
    const { category, slug } = await context.params;
    const page = getDraftPageForAdmin(category, slug);

    if (!page) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, page });
  } catch (error: any) {
    console.error('Error getting single page:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch page' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: RouteContext) {
  try {
    const { category, slug } = await context.params;
    const body = await req.json();
    const incoming: CDMOPage = body.page;
    const action: 'save_draft' | 'publish' | 'revert' | 'unpublish' = body.action || 'save_draft';

    if (action === 'revert') {
      const reverted = revertDraftPage(category, slug);
      return NextResponse.json({
        success: true,
        page: reverted,
        message: 'Unpublished draft changes were discarded. Restored live version.',
        action: 'revert'
      });
    }

    if (action === 'unpublish') {
      const unpublished = unpublishStoredPage(category, slug);
      return NextResponse.json({
        success: true,
        page: unpublished,
        message: 'Page is now unpublished (offline from live website).',
        action: 'unpublish'
      });
    }

    if (!incoming) {
      return NextResponse.json(
        { success: false, error: 'Missing page data' },
        { status: 400 }
      );
    }

    // Force route consistency
    incoming.category = category;
    incoming.slug = slug;

    if (action === 'publish') {
      const published = publishStoredPage(category, slug, incoming);
      return NextResponse.json({
        success: true,
        page: published,
        message: `"${published.title}" is now PUBLISHED and live on the website!`,
        action: 'publish'
      });
    }

    // Default: Save Draft only (Live website remains untouched!)
    const savedDraft = saveDraftPage(incoming);
    return NextResponse.json({
      success: true,
      page: savedDraft,
      message: 'Draft saved successfully. Live website remains UNCHANGED until you click Publish.',
      action: 'save_draft'
    });
  } catch (error: any) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update page' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: RouteContext) {
  try {
    const { category, slug } = await context.params;
    const result = deleteStoredPage(category, slug);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Page not found or cannot be deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.isReset
        ? 'Default page reset to original published factory content'
        : 'Custom page deleted successfully',
      isReset: result.isReset,
    });
  } catch (error: any) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete page' },
      { status: 500 }
    );
  }
}
