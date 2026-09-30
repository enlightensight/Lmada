import { NextResponse } from 'next/server';
import { getStoredInsightBySlug, getStoredInsightsByCategory } from '@/lib/insightsStorage';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  try {
    const { category, slug } = await params;
    const item = getStoredInsightBySlug(category, slug);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Insight not found' },
        { status: 404 }
      );
    }

    // Related items in the same category
    const catItems = getStoredInsightsByCategory(item.category);
    const related = catItems
      .filter((i) => i.id !== item.id && i.slug !== item.slug)
      .slice(0, 3);

    return NextResponse.json({ success: true, item, related });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch insight' },
      { status: 500 }
    );
  }
}
