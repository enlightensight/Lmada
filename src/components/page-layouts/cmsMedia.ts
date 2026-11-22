import { ALL_EQUIPMENT_ITEMS } from '@/data/equipmentData';
import type { EquipmentItem } from '@/data/equipmentData';
import type { CDMOPage, CDMOSection } from '@/data/cdmoData';

/**
 * Helpers shared by ServiceLayout, ManufacturingLayout and CharacterizationLayout so that
 * hero and section media, and the list of sections to draw, come from the CMS record only.
 */

export const isVideoUrl = (url?: string) => Boolean(url && /\.(mp4|webm|ogg|mov)$/i.test(url));

const cleanList = (list?: string[]) => (list || []).filter((item) => typeof item === 'string' && item.trim() !== '');

/**
 * Carousel slides for photos held on the page record. Known equipment photos keep the
 * descriptive alt text from equipmentData; anything else falls back to the carousel's label.
 */
export function toCarouselItems(images: string[]): EquipmentItem[] {
  return images.map((src) => ALL_EQUIPMENT_ITEMS.find((eq) => eq.src === src) || { src, title: '', subtitle: '' });
}

/**
 * Hero media of a page: `heroVideo` (or a video URL in `image`) plays as a video; otherwise the
 * `images` list is the carousel, and the single `image` is shown when there is no list.
 */
export function getHeroMedia(page: CDMOPage): { video: string; slides: string[] } {
  const video =
    page.heroVideo && (isVideoUrl(page.heroVideo) || page.heroMediaType === 'video')
      ? page.heroVideo
      : isVideoUrl(page.image)
        ? page.image || ''
        : '';
  const gallery = cleanList(page.images);
  const slides = gallery.length > 0 ? gallery : page.image && !isVideoUrl(page.image) ? [page.image] : [];
  return { video, slides };
}

/** Media of one section: a video, or photo slides (`images` carousel, else the single `image`). */
export function getSectionMedia(section: CDMOSection): { video: string; slides: string[] } {
  const isVideo = section.mediaType === 'video' || isVideoUrl(section.video || section.image || '');
  const video = isVideo ? section.video || section.image || '' : '';
  const image = !isVideo && section.image && section.image.trim() !== '' ? section.image : '';
  const gallery = cleanList(section.images);
  // The admin panel keeps `image` equal to the first carousel slide; if it differs, it leads the carousel.
  const slides = gallery.length > 0 ? (image && !gallery.includes(image) ? [image, ...gallery] : gallery) : image ? [image] : [];
  return { video, slides };
}

/** A section that only stands for the page-level FAQ block (which renders `page.faqs`). */
export const isFaqMarker = (section: CDMOSection) =>
  section.style === 'faq-accordion' || Boolean(section.id?.includes('faq')) || section.title === 'Frequently Asked Questions';

/** Default section style: the layouts draw these themselves. */
export const isSplitSection = (section: CDMOSection) => !section.style || section.style === 'feature-split';

/**
 * Sections of the record that a layout must draw, in record order. FAQ marker sections without
 * questions of their own are left to the page-level FAQ block.
 */
export function getRenderableSections(page: CDMOPage): CDMOSection[] {
  return (page.sections || []).filter((s) => !isFaqMarker(s) || Boolean(s.faqs && s.faqs.length > 0));
}

/**
 * Splits the renderable sections so every section renders exactly once:
 * `split` are feature-split sections (drawn by the layout's own block), `other` is every other
 * style (drawn with DynamicSectionRenderer).
 */
export function partitionSections(page: CDMOPage): { split: CDMOSection[]; other: CDMOSection[] } {
  const renderable = getRenderableSections(page);
  return {
    split: renderable.filter((s) => isSplitSection(s) && !isFaqMarker(s)),
    other: renderable.filter((s) => !isSplitSection(s) || isFaqMarker(s)),
  };
}
