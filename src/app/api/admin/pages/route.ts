import { NextResponse } from 'next/server';
import { getAllStoredPages, saveDraftPage, publishStoredPage } from '@/lib/pagesStorage';
import type { CDMOPage } from '@/data/cdmoData';

export async function GET() {
  try {
    // Admin dashboard fetches all pages including draft metadata
    const pages = getAllStoredPages({ includeDrafts: true });
    return NextResponse.json({ success: true, pages });
  } catch (error: any) {
    console.error('Error fetching pages for admin:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const pageData: CDMOPage = body.page || body;
    const shouldPublish = Boolean(body.publish || body.action === 'publish');

    if (!pageData || !pageData.slug || !pageData.category || !pageData.title) {
      return NextResponse.json(
        { success: false, error: 'Slug, category, and title are required fields.' },
        { status: 400 }
      );
    }

    // Clean formatting
    pageData.slug = pageData.slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
    pageData.category = pageData.category.trim().toLowerCase();

    // Ensure sections array exists
    if (!Array.isArray(pageData.sections)) {
      pageData.sections = [];
    }

    let saved: CDMOPage;
    if (shouldPublish) {
      saved = publishStoredPage(pageData.category, pageData.slug, pageData);
    } else {
      saved = saveDraftPage(pageData);
    }

    return NextResponse.json({ success: true, page: saved });
  } catch (error: any) {
    console.error('Error saving new page:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save page' },
      { status: 500 }
    );
  }
}
