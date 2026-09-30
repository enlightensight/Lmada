import { NextResponse } from 'next/server';
import { getAllStoredInsights, getAllStoredInsightList, saveStoredInsight } from '@/lib/insightsStorage';
import type { InsightItem } from '@/data/insightsData';

export const dynamic = 'force-dynamic';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase();

    let allItems = getAllStoredInsightList();

    if (category && category !== 'all') {
      allItems = allItems.filter((item) => item.category === category);
    }

    if (search) {
      allItems = allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.summary.toLowerCase().includes(search) ||
          item.tags?.some((t) => t.toLowerCase().includes(search)) ||
          item.badge?.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      success: true,
      count: allItems.length,
      items: allItems,
      allByCategory: getAllStoredInsights(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to list admin insights' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    const title = body.title.trim();
    const slug = body.slug ? slugify(body.slug) : slugify(title);
    const id = body.id || `insight-${slug}`;
    const category = body.category || 'blogs';
    const badge = body.badge || 'Scientific Insight';
    
    // Auto calculate read time if not supplied
    let totalText = `${title} ${body.summary || ''} ${body.detailedContent?.abstract || ''}`;
    if (body.detailedContent?.sections) {
      for (const sec of body.detailedContent.sections) {
        totalText += ` ${sec.heading || ''} ${(sec.body || []).join(' ')}`;
      }
    }
    const readTime = body.readTime || calculateReadTime(totalText);

    // Format current date if not supplied
    const dateFormatted = body.date || new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const item: InsightItem = {
      id,
      slug,
      category,
      title,
      badge,
      date: dateFormatted,
      readTime,
      author: {
        name: body.author?.name || 'Lambda CDMO Scientific Team',
        role: body.author?.role || 'Biologics Science & Technology',
        avatar: body.author?.avatar || '/images/lambda-symbol.svg',
      },
      image: body.image || '/images/cdn/unsplash-1532094349884-543bc11b234d.jpg',
      summary: body.summary || body.detailedContent?.abstract?.slice(0, 160) || title,
      keyTakeaways: Array.isArray(body.keyTakeaways) ? body.keyTakeaways.filter(Boolean) : [],
      tags: Array.isArray(body.tags) ? body.tags.filter(Boolean) : ['Biologics', 'Lambda CDMO'],
      detailedContent: {
        subtitle: body.detailedContent?.subtitle || body.summary || title,
        abstract: body.detailedContent?.abstract || body.summary || '',
        sections: Array.isArray(body.detailedContent?.sections)
          ? body.detailedContent.sections.map((s: any) => ({
              heading: s.heading || '',
              body: Array.isArray(s.body) ? s.body : [String(s.body || '')],
              callout: s.callout?.title || s.callout?.text ? s.callout : undefined,
              table: s.table?.headers && s.table?.rows ? s.table : undefined,
            }))
          : [],
        methodologyHighlights: Array.isArray(body.detailedContent?.methodologyHighlights)
          ? body.detailedContent.methodologyHighlights.filter(Boolean)
          : [],
        regulatoryImpact: body.detailedContent?.regulatoryImpact || 'Aligned with global cGMP requirements for US FDA, EMA, PMDA, and TGA clinical and commercial filings.',
        citations: Array.isArray(body.detailedContent?.citations) ? body.detailedContent.citations : undefined,
      },
    };

    const result = saveStoredInsight(item);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to write insight to storage' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Insight saved successfully',
      item: result.item,
      url: `/insights/${result.item.category}/${result.item.slug}`,
    });
  } catch (error: any) {
    console.error('Error in POST /api/admin/insights:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save insight' },
      { status: 500 }
    );
  }
}
