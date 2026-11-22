import type { PageTextSlot } from '@/lib/pageText';

const INSIGHTS_PAGES = ['insights/blogs', 'insights/case-studies', 'insights/brochures', 'insights/news', 'insights/events'];

export const MISC_TEXT_SLOTS: PageTextSlot[] = [
  // Insights category pages (InsightsLayout)
  { key: 'heroTagLabel', pages: INSIGHTS_PAGES, label: 'Hero tag label', default: 'Category', group: 'Hero' },
  { key: 'heroTagValue', pages: INSIGHTS_PAGES, label: 'Hero tag text', default: 'Peer-Reviewed Dossiers', group: 'Hero' },
  { key: 'moreListSubtitle', pages: INSIGHTS_PAGES, label: 'Subtitle under the "More in ..." heading', default: 'Peer-reviewed methodologies and validated technical reports', group: 'Article list' },
  { key: 'moreListTag', pages: INSIGHTS_PAGES, label: 'Tag beside the "More in ..." heading', default: 'Technical Reports', group: 'Article list' },
];
