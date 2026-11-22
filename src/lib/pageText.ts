import type { CDMOPage } from '@/data/cdmoData';

/**
 * A piece of page copy or media that used to be hardcoded in a layout and is now
 * editable from the admin panel ("Additional page content" card).
 *
 * Values are stored on the page record as `page.customText[key]`. When a value is
 * empty the registered `default` is rendered, so the live site never shows a blank.
 */
export interface PageTextSlot {
  /** Unique within a page, e.g. "pillarsHeading". */
  key: string;
  /** Pages this slot belongs to, as "category/slug" using the stored slug (e.g. "overview/quality"). */
  pages: string[];
  /** Label shown to the editor in the admin panel. */
  label: string;
  /** What the live site shows when the editor has not entered a value. */
  default: string;
  /** How the admin panel edits it. Defaults to "text". */
  kind?: 'text' | 'longtext' | 'image' | 'video' | 'link';
  /** Optional heading to group related slots in the admin panel, e.g. "Pillars section". */
  group?: string;
}

export const pageKey = (page: Pick<CDMOPage, 'category' | 'slug'>) => `${page.category}/${page.slug}`;

export function slotsForPage(page: Pick<CDMOPage, 'category' | 'slug'>, slots: PageTextSlot[]): PageTextSlot[] {
  const key = pageKey(page).toLowerCase();
  return slots.filter((s) => s.pages.some((p) => p.toLowerCase() === key));
}

/**
 * Returns a lookup for one page: `const t = makePageText(page, OVERVIEW_TEXT_SLOTS); t('pillarsHeading')`.
 * Unknown keys return '' (and warn in development) so a typo is easy to spot.
 */
export function makePageText(page: CDMOPage, slots: PageTextSlot[]) {
  const mine = slotsForPage(page, slots);
  return (key: string): string => {
    const custom = page.customText?.[key];
    if (typeof custom === 'string' && custom.trim()) return custom;
    const slot = mine.find((s) => s.key === key);
    if (!slot && process.env.NODE_ENV !== 'production') {
      console.warn(`[pageText] no slot "${key}" registered for ${pageKey(page)}`);
    }
    return slot?.default ?? '';
  };
}
