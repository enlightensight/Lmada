import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  insightsData,
  getAllInsightItems,
  getInsightBySlug,
  getRelatedInsights,
  INSIGHT_TABS,
} from '@/data/insightsData';
import InsightDetailLayout from '@/components/page-layouts/InsightDetailLayout';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allItems = getAllInsightItems();
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
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const item = getInsightBySlug(category, slug);

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
  const item = getInsightBySlug(category, slug);

  if (!item) {
    notFound();
  }

  const relatedItems = getRelatedInsights(item.category, item.slug, 3);

  return <InsightDetailLayout item={item} relatedItems={relatedItems} />;
}
