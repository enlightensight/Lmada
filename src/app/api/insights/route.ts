import { NextResponse } from 'next/server';
import { getAllStoredInsights, getStoredInsightsByCategory } from '@/lib/insightsStorage';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (category) {
      const items = getStoredInsightsByCategory(category);
      return NextResponse.json({ success: true, items });
    }

    const allData = getAllStoredInsights();
    return NextResponse.json({ success: true, data: allData });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}
