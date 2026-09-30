import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { INSIGHT_TABS, type InsightItem } from '@/data/insightsData';
import {
  getAllStoredInsightList,
  getStoredInsightBySlug,
  getStoredInsightsByCategory,
} from '@/lib/insightsStorage';
import InsightDetailLayout from '@/components/page-layouts/InsightDetailLayout';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const allItems = getAllStoredInsightList();
    const params: { category: string; slug: string }[] = [];

    for (const item of allItems) {
      if (item.slug) {
        params.push({
          category: item.category,
          slug: item.slug,
        });
      }
      if (item.id && item.id !== item.slug) {
        params.push({
          category: item.category,
          slug: item.id,
        });
      }
    }

    return params;
  } catch (err) {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const item = getStoredInsightBySlug(category, slug);

  if (!item) {
    return {
      title: 'Article Not Found - Lambda CDMO Insights',
    };
  }

  const categoryConfig = INSIGHT_TABS.find((t) => t.slug === item.category);
  const categoryLabel = categoryConfig ? categoryConfig.label : 'Insights';

  return {
    title: `${item.title} | ${categoryLabel} | Lambda CDMO`,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      images: [
        {
          url: item.image,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { category, slug } = await params;
  const item = getStoredInsightBySlug(category, slug);

  if (!item) {
    notFound();
  }

  const categoryItems = getStoredInsightsByCategory(item.category);
  const relatedItems = categoryItems
    .filter((i) => i.slug !== item.slug && i.id !== item.id)
    .slice(0, 3);

  return <InsightDetailLayout item={item} relatedItems={relatedItems} />;
}
